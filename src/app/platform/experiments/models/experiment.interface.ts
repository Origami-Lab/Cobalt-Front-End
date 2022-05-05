import {Status} from '../../../core/enums/status.enum';

export interface Experiment {
  datetime?: string;
  id?: number;
  lastchange?: string;
  title?: string;
  status?: Status;
  dueDate?: string;
  userid?: string;
  startDate?: string;
  author?: string;
  experiments2labels?: Array<Experiments2labels>;
  padid?: string;
}

export interface Experiments2labels {
  color: string;
  experimentId: number;
  id: number;
  label: string;
  labelId: number;
}
