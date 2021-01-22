import {SelectedDate} from './selected-date.interface';

export function mapRequestParams(page: number, searchParam?: string, selectedDate?: SelectedDate): {[key: string]: string | string[]} {
  let params: {[key: string]: string | string[]} = {page: String(page), title: searchParam};
  if (!searchParam) {
    params = {
      ...params,
      title: ''
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
