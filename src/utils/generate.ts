import {DateObjectUnits, IMonthDaysObject, IMonthStatus, Locale, MakeOptionalRequired} from "../interface/general";

// Gets the current month and year days array
export const getMonthDaysArray = (
    month: number,
    year: number,
    option?: {
        weekStartDay?: number;
    }
): IMonthDaysObject[] => {
    const firstDayOfMonth = new Date(
        year,
        month,
        1 - (option?.weekStartDay || 0)
    );
    const startDayOfWeekIndex = firstDayOfMonth.getDay();

    const numDaysInMonth = new Date(year, month + 1, 0).getDate();

    const daysOfMonth: IMonthDaysObject[] = [];

    const prevMonth = month === 0 ? 11 : month - 1;
    const prevMonthYear = prevMonth === 11 ? year - 1 : year;
    const numDaysInPrevMonth = new Date(
        prevMonthYear,
        prevMonth + 1,
        0
    ).getDate();

    let prevMonthStart = numDaysInPrevMonth - startDayOfWeekIndex + 1;

    if (prevMonthStart === numDaysInPrevMonth + 1) {
        prevMonthStart = 1;
    }

    // Previous month days
    for (let i = 0; i < startDayOfWeekIndex; i++) {
        daysOfMonth.push({value: prevMonthStart + i, month: "prev"});
    }

    // Current month days
    for (let i = 1; i <= numDaysInMonth; i++) {
        daysOfMonth.push({value: i, month: "current"});
    }

    const numDaysLeft = 42 - daysOfMonth.length;

    // Next month days
    for (let i = 1; i <= numDaysLeft; i++) {
        const value = i;
        const status = "next";
        daysOfMonth.push({value, month: status});
    }

    return daysOfMonth;
};
export const getToday = (): MakeOptionalRequired<DateObjectUnits> => {
    const today = new Date();
    return {
        day: today.getDate(),
        month: today.getMonth(),
        year: today.getFullYear(),
    };
};

export function generateYearsArray(startYear: number, endYear: number) {
    const years: number[] = [];
    for (let i = endYear; i >= startYear; i--) {
        years.push(i);
    }
    return years;
}

const now = new Date();
export const currentYear = now.getFullYear();
export const getDatePickerRefactoredMonth = (
    month: number,
    monthStatus: IMonthStatus
) => {
    if (monthStatus === "prev") {
        return month === 0 ? 11 : month - 1;
    } else if (monthStatus === "next") {
        return month === 11 ? 0 : month + 1;
    }
    return month;
};
export const getRefactoredPrevDate = (year: number, month: number) => {
    return {
        year: month === 0 ? year - 1 : year,
        month: month === 0 ? 11 : month - 1,
    };
};
export const getRefactoredNextDate = (year: number, month: number) => {
    return {
        year: month === 11 ? year + 1 : year,
        month: month === 11 ? 0 : month + 1,
    };
};
export const getMonthName = (
    month: number,
    format: "narrow" | "long" | "short" = "long",
    locale?: Locale
) => {
    const date = new Date(2000, month, 1);
    return date.toLocaleString(locale ?? "en", {month: format});
};
