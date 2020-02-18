
// startTime is inclusive, endTime is Exclusive
// Exp.: {startTime: {year: 2017, quarter: 3}, endTime: {year: 2020, quarter:1}}
//        => 1.7.2017 until 31.12.2019
export interface TimeSpan {
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

export const ALL_DATE_POINTS: DatePoint[] = [
  {year: 2008, quarter: 1}, {year: 2008, quarter: 2}, {year: 2008, quarter: 3}, {year: 2008, quarter: 4},
  {year: 2009, quarter: 1}, {year: 2009, quarter: 2}, {year: 2009, quarter: 3}, {year: 2009, quarter: 4},
  {year: 2010, quarter: 1}, {year: 2010, quarter: 2}, {year: 2010, quarter: 3}, {year: 2010, quarter: 4},
  {year: 2011, quarter: 1}, {year: 2011, quarter: 2}, {year: 2011, quarter: 3}, {year: 2011, quarter: 4},
  {year: 2012, quarter: 1}, {year: 2012, quarter: 2}, {year: 2012, quarter: 3}, {year: 2012, quarter: 4},
  {year: 2013, quarter: 1}, {year: 2013, quarter: 2}, {year: 2013, quarter: 3}, {year: 2013, quarter: 4},
  {year: 2014, quarter: 1}, {year: 2014, quarter: 2}, {year: 2014, quarter: 3}, {year: 2014, quarter: 4},
  {year: 2015, quarter: 1}, {year: 2015, quarter: 2}, {year: 2015, quarter: 3}, {year: 2015, quarter: 4},
  {year: 2016, quarter: 1}, {year: 2016, quarter: 2}, {year: 2016, quarter: 3}, {year: 2016, quarter: 4},
  {year: 2017, quarter: 1}, {year: 2017, quarter: 2}, {year: 2017, quarter: 3}, {year: 2017, quarter: 4},
  {year: 2018, quarter: 1}, {year: 2018, quarter: 2}, {year: 2018, quarter: 3}, {year: 2018, quarter: 4},
  {year: 2019, quarter: 1}, {year: 2019, quarter: 2}, {year: 2019, quarter: 3}, {year: 2019, quarter: 4},
  {year: 2020, quarter: 1},
];

export const MAX_TIMESPAN: TimeSpan = {startTime: {year: 2008, quarter: 1}, endTime: {year: 2020, quarter: 1}};
