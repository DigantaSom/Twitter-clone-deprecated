import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';

import type { RootState, AppDispatch } from '../redux/store';

import type { MonthType } from '../types';
import isLeapYear from './isLeapYear.util';

// Redux Toolkit: Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// Get the list of Years
export const useGetYears = (): number[] => {
  const years: number[] = [];

  const end = new Date().getFullYear();
  const start = end - 120;

  for (let year = end; year >= start; year--) {
    years.push(year);
  }
  return years;
};

// Get the list of Days
export const useGetDays = (month: MonthType, year: number): number[] => {
  const days: number[] = [];

  let dayLimit: number = 0;

  if (
    month === 'January' ||
    month === 'March' ||
    month === 'May' ||
    month === 'July' ||
    month === 'August' ||
    month === 'October' ||
    month === 'December'
  ) {
    dayLimit = 31;
  } else if (month === 'February') {
    dayLimit = isLeapYear(year) ? 29 : 28;
  } else {
    dayLimit = 30;
  }

  for (let day = 1; day <= dayLimit; day++) {
    days.push(day);
  }
  return days;
};
