import {getMonthFromDatePoint, Timespan} from "../models/time-span.model";
import {DatePipe} from "@angular/common";

function range(start: number, end: number): number [] {
  const list = [];
  for (let i = start; i <= end; i++) {
    list.push(i);
  }
  return list;
}

export function createLabels (timespan: Timespan): string[] {
  const startYear = timespan.startTime.year;
  const startMonth = getMonthFromDatePoint(timespan.startTime);
  const endYear = timespan.endTime.year;
  const endMonth = getMonthFromDatePoint(timespan.endTime);


  const labels: string[] = [];
  const months: number[] = range(1, 12);
  const years: number[] = range(startYear, endYear);
  for (let year of years) {
    for (let month of months) {
      if ((year !== startYear || month >= startMonth)
        && (year !== endYear || month < endMonth)
        && (year !== 2019 || month !== 12)) {
        labels.push(new DatePipe('en-US').transform(new Date(year, month - 1), 'yyyy-MM-dd'));
      }
    }
  }
  return labels;
}
