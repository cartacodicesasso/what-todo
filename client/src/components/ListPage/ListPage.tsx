import { ReaderTaskEither } from "fp-ts/ReaderTaskEither";
import { FC, useEffect, useRef, useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Item } from "../../globalDomain";
import { List } from "../List/List";
import "./ListPage.css";
import { ItemForm, FormData } from "../ItemForm";
import { pipe } from "fp-ts/function";
import { option, taskEither } from "fp-ts";

interface Props {
  items: Item[];
  onListItemChange: ReaderTaskEither<Item, string, unknown>;
  onListItemDelete: ReaderTaskEither<Item, string, unknown>;
  onListItemCreate: ReaderTaskEither<FormData, string, unknown>;
}

export const ListPage: FC<Props> = (props) => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const doneItems = props.items.filter((item) => item.isDone);
  const toDoItems = props.items.filter((item) => !item.isDone);
  const titleInputRef = useRef<HTMLInputElement>();

  const onSubmit = (data: FormData) =>
    pipe(
      props.onListItemCreate(data),
      taskEither.chain(() => taskEither.fromIO(() => setIsFormVisible(false)))
    );

  useEffect(() => {
    if (isFormVisible) {
      window.setTimeout(() => titleInputRef.current.focus(), 100);
    }
  }, [isFormVisible]);

  return (
    <div className="ListPage">
      <h2>To Do</h2>
      <Accordion activeKey={isFormVisible ? "0" : "none"}>
        <Card>
          <Card.Header>
            <Accordion.Toggle
              as={Button}
              variant="primary"
              eventKey="0"
              onClick={() => setIsFormVisible(!isFormVisible)}
            >
              Add new item
            </Accordion.Toggle>
          </Card.Header>
          <Accordion.Collapse eventKey="0">
            <Card.Body>
              <ItemForm
                ref={titleInputRef}
                item={option.none}
                onSubmit={onSubmit}
                onCancel={() => setIsFormVisible(false)}
              />
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
      <List
        items={toDoItems}
        onListItemChange={props.onListItemChange}
        onListItemDelete={props.onListItemDelete}
      />
      <h2>Done</h2>
      <List
        items={doneItems}
        onListItemChange={props.onListItemChange}
        onListItemDelete={props.onListItemDelete}
      />
    </div>
  );
};
