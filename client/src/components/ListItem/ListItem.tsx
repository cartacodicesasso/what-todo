import { boolean, option, task, taskEither } from "fp-ts";
import { constNull, pipe } from "fp-ts/function";
import { Option } from "fp-ts/Option";
import { FC, useState } from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { formatDate } from "../../utils/formatDate";
import "./ListItem.css";
import { ReaderTaskEither } from "fp-ts/ReaderTaskEither";
import { Item } from "../../globalDomain";
import { Pencil, Trash } from "react-bootstrap-icons";
import { TaskEither } from "fp-ts/TaskEither";
import { ItemForm } from "../ItemForm";
import { PriorityBadge } from "../PriorityBadge";

interface Props {
  item: Item;
  onChange: ReaderTaskEither<Item, string, unknown>;
  onDelete: TaskEither<string, unknown>;
}

export const ListItem: FC<Props> = (props) => {
  const [isChangingDoneState, setIsChangingDoneState] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState<Option<string>>(option.none);

  if (isEditing) {
    return (
      <ItemForm
        item={option.some(props.item)}
        onCancel={() => setIsEditing(false)}
        onSubmit={(data) =>
          pipe(
            props.onChange({
              ...props.item,
              ...data,
            }),
            taskEither.chain(() => taskEither.fromIO(() => setIsEditing(false)))
          )
        }
      />
    );
  } else {
    const cardFooterClassName = pipe(
      props.item.dueDate,
      option.fold(
        () => "default",
        (dueDate) => (new Date() > dueDate ? "expired" : "default")
      )
    );

    const changeDoneState = () => {
      setIsChangingDoneState(true);
      setError(option.none);

      pipe(
        props.onChange({
          ...props.item,
          isDone: !props.item.isDone,
        }),
        taskEither.fold(
          (error) =>
            task.fromIO(() => {
              setIsChangingDoneState(false);
              setError(option.some(error));
            }),
          () =>
            task.fromIO(() => {
              setIsChangingDoneState(false);
            })
        )
      )();
    };

    const onDelete: TaskEither<void, unknown> = pipe(
      taskEither.rightIO(() => {
        setError(option.none);
        setIsDeleting(true);
      }),
      taskEither.chain(() => props.onDelete),
      taskEither.bimap(
        (error) => {
          setIsDeleting(false);
          setError(option.some(error));
        },
        () => {
          setIsDeleting(false);
        }
      )
    );

    return (
      <Card className="ListItem">
        <Card.Body>
          <Card.Title>
            {props.item.title} &nbsp;
            <PriorityBadge priority={props.item.priority} />
          </Card.Title>
          {pipe(
            props.item.description,
            option.fold(constNull, (description) => (
              <Card.Text>{description}</Card.Text>
            ))
          )}
          {pipe(
            error,
            option.fold(constNull, (error) => (
              <Alert
                variant="danger"
                dismissible
                onClose={() => setError(option.none)}
              >
                <p>{error}</p>
              </Alert>
            ))
          )}
        </Card.Body>
        <Card.Footer className={cardFooterClassName}>
          {pipe(
            props.item.dueDate,
            option.fold(
              () => <span />,
              (dueDate) => <small>Due {formatDate(dueDate)}</small>
            )
          )}
          <div className="Buttons">
            <Button onClick={changeDoneState} disabled={isChangingDoneState}>
              {pipe(
                props.item.isDone,
                boolean.fold(
                  () => "Done",
                  () => "Not done"
                )
              )}
            </Button>
            <Button variant="secondary" onClick={() => setIsEditing(true)}>
              <Pencil />
            </Button>
            <Button variant="danger" onClick={onDelete} disabled={isDeleting}>
              <Trash />
            </Button>
          </div>
        </Card.Footer>
      </Card>
    );
  }
};
