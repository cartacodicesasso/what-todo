import { pipe } from "fp-ts/function";
import { Reader } from "fp-ts/Reader";
import { FC } from "react";
import { Button } from "react-bootstrap";
import {
  Priority,
  PriorityName,
  foldPriority,
  getPriority,
} from "../globalDomain";

interface Props {
  priority: PriorityName;
  currentPriority: Priority;
  onClick: Reader<Priority, unknown>;
}

export const PriorityButton: FC<Props> = (props) => {
  const priority = getPriority(props.priority);

  const variant = pipe(
    priority,
    foldPriority(
      () => "success",
      () => "warning",
      () => "danger"
    )
  );

  const isCurrentPriority = priority === props.currentPriority;

  return (
    <Button
      variant={variant}
      size={isCurrentPriority ? "lg" : "sm"}
      active={!isCurrentPriority}
      onClick={() => props.onClick(priority)}
    >
      {props.priority}
    </Button>
  );
};
