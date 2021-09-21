import {Experiments2labels} from '../../models/experiment.interface';

export interface ExperimentTag {
  experimentId: number;
  labelId?: number;
  label: string;
  color?: string;
}

export interface Labels {
  color: string;
  experiments2labels?: Array<Experiments2labels>;
  id: number;
  label: string;
}
