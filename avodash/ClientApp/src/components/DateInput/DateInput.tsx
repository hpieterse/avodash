import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";

const DateInput = ({
  className = "",
  value,
  onChange,
  label,
  min,
  max,
}: {
  value?: Date;
  onChange: (newValue: Date) => void;
  className?: string;
  label?: string;
  min?: Date;
  max?: Date;
}) => {
  const [localValue, setLocalValue] = useState("");
  const [focussed, setFocussed] = useState(false);

  const inputId = `${label}-${Math.random().toString(36).substring(2)}`;

  const getDateString = (dateTimeValue: Date | undefined) => {
    if (dateTimeValue == null) {
      return "";
    }

    const monthNumber = Number.isNaN(dateTimeValue.getMonth())
      ? new Date().getMonth()
      : dateTimeValue.getMonth();

    const dayNumber = Number.isNaN(dateTimeValue.getDate())
      ? new Date().getDate()
      : dateTimeValue.getDate();

    const year = Number.isNaN(dateTimeValue.getFullYear())
      ? new Date().getFullYear()
      : dateTimeValue.getFullYear();

    const month = `0${monthNumber + 1}`.slice(-2);
    const day = `0${dayNumber}`.slice(-2);
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    if (!focussed) {
      setLocalValue(getDateString(value));
    }
  }, [value, focussed, setLocalValue]);

  const onDateChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newDateString = e.target.value;
    newDateString = newDateString.replaceAll("/", "-");
    const newDateValue = new Date(newDateString);

    if (Number.isNaN(newDateValue.getTime())) {
      // invalid date. Don't call parent onchange
    } else {
      // valid date
      onChange(newDateValue);
    }

    setLocalValue(newDateString);
  };

  const minDateValue = min == null ? undefined : getDateString(min);
  const maxDateValue = max == null ? undefined : getDateString(max);

  return (
    <Form.Control 
      className={className}
      placeholder="yyyy-mm-dd"
      min={minDateValue}
      max={maxDateValue}
      type="date"
      name={`${inputId}-date`}
      id={`${inputId}-date`}
      value={localValue}
      onChange={onDateChangeHandler}
      onFocus={() => {
        setFocussed(true);
      }}
      onBlur={() => {
        setFocussed(false);
      }}
    />
  );
};

export default DateInput;
