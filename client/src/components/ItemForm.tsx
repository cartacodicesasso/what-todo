import { option, taskEither } from "fp-ts";
import { constNull, constVoid, pipe } from "fp-ts/function";
import { ReaderTaskEither } from "fp-ts/ReaderTaskEither";
import { Option } from "fp-ts/Option";
import { NonEmptyString } from "io-ts-types";
import { FormEvent, forwardRef, useState } from "react";
import { Alert, Button, Form, Jumbotron } from "react-bootstrap";
import { Item, Priority } from "../globalDomain";
import { PriorityButton } from "./PriorityButton";
import { IO } from "fp-ts/IO";
import { DateInput } from "./DateInput";

export interface FormData {
  title: NonEmptyString;
  description: Option<NonEmptyString>;
  dueDate: Option<Date>;
  priority: Priority;
}

interface Props {
  item: Option<Item>;
  onSubmit: ReaderTaskEither<FormData, string, unknown>;
  onCancel: IO<unknown>;
}

export const ItemForm = forwardRef<HTMLInputElement, Props>((props, ref) => {
  const [title, setTitle] = useState<Option<NonEmptyString>>(
    pipe(
      props.item,
      option.map((item) => item.title)
    )
  );

  const [description, setDescription] = useState<Option<NonEmptyString>>(
    pipe(
      props.item,
      option.chain((item) => item.description)
    )
  );

  const [dueDate, setDueDate] = useState<Option<Date>>(
    pipe(
      props.item,
      option.chain((item) => item.dueDate)
    )
  );

  const [priority, setPriority] = useState<Priority>(
    pipe(
      props.item,
      option.map((item) => item.priority),
      option.getOrElse(() => 1)
    )
  );

  const [error, setError] = useState<Option<string>>(option.none);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

    pipe(
      title,
      option.fold(constVoid, (title) => {
        setIsSubmitting(true);

        const submit = pipe(
          props.onSubmit({
            title,
            description,
            dueDate,
            priority,
          }),
          taskEither.bimap(
            (error) => {
              setError(option.some(error));
              setIsSubmitting(false);
            },
            () => {
              setIsSubmitting(false);
              setTitle(option.none);
              setDescription(option.none);
              setDueDate(option.none);
              setPriority(1);
            }
          )
        );

        submit();
      })
    );
  };

  return (
    <Jumbotron className="FormPanel">
      <Form onSubmit={onSubmit}>
        <Form.Group controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Title"
            value={pipe(
              title,
              option.getOrElse(() => "")
            )}
            onChange={(e) =>
              pipe(
                e.currentTarget.value,
                NonEmptyString.decode,
                option.fromEither,
                setTitle
              )
            }
            required
            ref={ref}
          />
        </Form.Group>

        <Form.Group controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Description"
            value={pipe(
              description,
              option.getOrElse(() => "")
            )}
            onChange={(e) =>
              pipe(
                e.currentTarget.value,
                NonEmptyString.decode,
                option.fromEither,
                setDescription
              )
            }
          />
        </Form.Group>

        <div className="form-group">
          <Form.Label>Priority</Form.Label>

          <div className="Buttons">
            <PriorityButton
              priority="Low"
              currentPriority={priority}
              onClick={setPriority}
            />
            <PriorityButton
              priority="Medium"
              currentPriority={priority}
              onClick={setPriority}
            />
            <PriorityButton
              priority="High"
              currentPriority={priority}
              onClick={setPriority}
            />
          </div>
        </div>

        <div className="form-group">
          <Form.Label>Due date</Form.Label>
          <DateInput value={dueDate} onChange={setDueDate} />
        </div>

        {pipe(
          error,
          option.fold(constNull, (error) => (
            <Alert variant="danger">{error}</Alert>
          ))
        )}

        <div className="Buttons">
          <Button variant="primary" type="submit" disabled={isSubmitting}>
            Submit
          </Button>
          <Button variant="secondary" onClick={props.onCancel}>
            Cancel
          </Button>
        </div>
      </Form>
    </Jumbotron>
  );
});
