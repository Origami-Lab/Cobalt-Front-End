import {SelectedDate} from './models/selected-date.interface';

export function mapRequestParams(page: number, searchPhrase?: string, selectedDate?: SelectedDate): {[key: string]: string | string[]} {
  let params: {[key: string]: string | string[]} = {page: String(page)};
  if (searchPhrase) {
    params = {
      ...params,
      title: searchPhrase
    };
  }
  if (selectedDate) {
    params = {
      ...params,
      ['startdate[strictly_before]']: `${selectedDate.year}-${selectedDate.monthNumber}`,
      ['startdate[after]']: `${selectedDate.year}-${selectedDate.after}`
    };
  }
  return params;
}
