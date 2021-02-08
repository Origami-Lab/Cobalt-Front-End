import {Status} from '../../../core/enums/status.enum';

export interface Experiment {
  datetime: string;
  id: number;
  lastchange: string;
  title: string;
  status: Status;
  dueDate: string;
  userid: string;
  startDate: string;
  author: string;
}
