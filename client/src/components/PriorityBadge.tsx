import { pipe } from "fp-ts/function";
import { FC } from "react";
import Badge from "react-bootstrap/Badge";
import { foldPriority, getPriorityName, Priority } from "../globalDomain";

interface Props {
  priority: Priority;
}

export const PriorityBadge: FC<Props> = (props) => {
  const variant = pipe(
    props.priority,
    foldPriority(
      () => "success",
      () => "warning",
      () => "danger"
    )
  );

  const contentString = getPriorityName(props.priority);

  return (
    <Badge pill variant={variant}>
      {contentString}
    </Badge>
  );
};
