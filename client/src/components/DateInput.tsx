import { option } from "fp-ts";
import { pipe } from "fp-ts/function";
import { Reader } from "fp-ts/Reader";
import { Option } from "fp-ts/Option";
import { FC } from "react";
import DateRangePicker from "react-bootstrap-daterangepicker";
import { formatDate } from "../utils/formatDate";

interface Props {
  value: Option<Date>;
  onChange: Reader<Option<Date>, unknown>;
}

export const DateInput: FC<Props> = (props) => {
  const onApply = (_event: any, picker: any) => {
    const date = picker.startDate.toDate();

    picker.element.val(formatDate(date));
    props.onChange(option.some(date));
  };

  const onCancel = (_event: any, picker: any) => {
    picker.element.val("");
    props.onChange(option.none);
  };

  return (
    <DateRangePicker
      initialSettings={{
        singleDatePicker: true,
        startDate: pipe(props.value, option.toUndefined),
        autoUpdateInput: false,
        locale: {
          cancelLabel: "Clear",
        },
      }}
      onApply={onApply}
      onCancel={onCancel}
    >
      <input type="text" className="form-control" />
    </DateRangePicker>
  );
};
