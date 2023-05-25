import { Accessor, JSX, Setter } from "solid-js";

export interface DateObjectUnits {
  // a year, such as 1987
  year?: number;
  // a month, 1-12
  month?: number;
  // a day of the month, 1-31, depending on the month
  day?: number;
  // day of the year, 1-365 or 366
}

export type IMonthStatus = "prev" | "current" | "next";

export interface IMonthDaysObject {
  value: number;
  month: IMonthStatus;
}

export type IDatePickerType = "single" | "range" | "multiple";

export type IDatePickerOnChange =
  | {
      selectedDate?: DateObjectUnits;
      type: "single";
    }
  | {
      startDate?: DateObjectUnits;
      endDate?: DateObjectUnits;
      type: "range";
    }
  | {
      multipleDates?: DateObjectUnits[];
      type: "multiple";
    };

export interface IDatePickerInputDataValue {
  value: IDatePickerInputValueTypes;
  label: string;
}

export interface IDatePickerInputValueTypes {
  start?: string;
  startDateObject?: DateObjectUnits;
  end?: string;
  endDateObject?: DateObjectUnits;
  selected?: string;
  selectedDateObject?: DateObjectUnits;
  multiple?: string[];
  multipleDateObject?: DateObjectUnits[];
}

export interface IRenderInputJSXProps {
  value: Accessor<IDatePickerInputDataValue>;
  showDate: () => void;
}

export type IRenderInput =
  | JSX.Element
  | ((props: IRenderInputJSXProps) => JSX.Element);

export interface IRenderJSXProps {
  month: Accessor<number>;
  setMonth: Setter<number>;
  year: Accessor<number>;
  setYear: Setter<number>;
  selectedDate: Accessor<DateObjectUnits | undefined>;
  endDate: Accessor<DateObjectUnits | undefined>;
  multipleDates: Accessor<DateObjectUnits[] | undefined>;
  handleNextMonth: () => void;
  handlePrevMonth: () => void;
  handleDayClick: HandleDayClick;
  setRefToAllowOutsideClick: Setter<HTMLElement | undefined>;
}

export type HandleDayClick = (
  day: IMonthDaysObject,
  month: Accessor<number>,
  year: Accessor<number>,
  nextMonth: boolean
) => void;

export type IRenderJSX =
  | JSX.Element
  | ((props: IRenderJSXProps) => JSX.Element);

export type IMonthSelectorType = "short" | "long";

export type IMonthYearSelectorFlexDirection = "row" | "column";

export interface IYearRange {
  start: number;
  end: number;
}

export type Locale = string | string[];

export interface IColors {
  primaryColor?: string;
  primaryTextColor?: string;
  secondaryColor?: string;
  secondaryTextColor?: string;

  weekEndDayBgColor?: string;
  weekEndDayTextColor?: string;

  weekDaysNameColor?: string;

  backgroundColor?: string;
}

export type DisableDate =
  | MakeOptionalRequired<DateObjectUnits>
  | {
      start: MakeOptionalRequired<DateObjectUnits>;
      end: MakeOptionalRequired<DateObjectUnits>;
    };

export type MakeOptionalRequired<T> = {
  [K in keyof T]-?: T[K];
};

export interface ApplyDateRange {
  dayRangeEnd: boolean;
  dayRangeStartEnd: undefined | boolean;
  dayRangeStart: boolean;
  dayRangeBetween: boolean;
  daysCurrent: boolean;
  daysNotCurrentMonth: boolean;
  isWeekend: boolean;
  isSaturday: boolean;
  isSunday: boolean;
  customDayClass?: string;
  isMultipleSelected: boolean;
  hidden: boolean;
}

export interface CustomDaysClassName
  extends MakeOptionalRequired<DateObjectUnits> {
  className: string;
}

export type WeekDaysType = "short" | "single";