
// startTime is inclusive, endTime is Exclusive
// Exp.: {startTime: {year: 2017, quarter: 3}, endTime: {year: 2020, quarter:1}}
//        => 1.7.2017 until 31.12.2019
export interface Timespan {
  startTime: DatePoint;
  endTime: DatePoint;
}

export interface DatePoint {
  year: number;
  quarter: 1 | 2 | 3 | 4;
}

export function getMonthFromDatePoint (dp: DatePoint): number {
  return (dp.quarter - 1) * 3 + 1
}

export const MAX_TIMESPAN: Timespan = {startTime: {year: 2008, quarter: 1}, endTime: {year: 2020, quarter: 1}};
