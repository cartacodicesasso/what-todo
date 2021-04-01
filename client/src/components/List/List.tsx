import { NonEmptyArray } from "fp-ts/NonEmptyArray";
import { ReaderTaskEither } from "fp-ts/ReaderTaskEither";
import { FC } from "react";
import { Item } from "../../globalDomain";
import { ListItem } from "../ListItem/ListItem";
import "./List.css";

interface Props {
  items: NonEmptyArray<Item>;
  onListItemChange: ReaderTaskEither<Item, string, unknown>;
  onListItemDelete: ReaderTaskEither<Item, string, unknown>;
}

export const List: FC<Props> = (props) => {
  return (
    <div className="List">
      {props.items.map((item) => (
        <ListItem
          key={item.id}
          item={item}
          onChange={props.onListItemChange}
          onDelete={props.onListItemDelete(item)}
        />
      ))}
    </div>
  );
};
