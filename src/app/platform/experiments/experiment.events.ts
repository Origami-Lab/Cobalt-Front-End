import {Experiment} from './models/experiment.interface';

export class EditExperiment {
  constructor(public experiment: Experiment) {}
}

export type ExperimentEvents = EditExperiment;
