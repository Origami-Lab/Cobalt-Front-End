import {Component, OnInit} from '@angular/core';
import {Experiment} from '../../platform/experiments/models/experiment.interface';
import {Status} from '../../core/enums/status.enum';
@Component({
  selector: 'co-ui-kit-page',
  templateUrl: './ui-kit-page.component.html',
  styleUrls: ['./ui-kit-page.component.scss']
})
export class UiKitPageComponent implements OnInit {
  experiment: Experiment = {
    id: 1,
    title: 'Test Title',
    status: Status.IN_PREPARATION,
    startDate: new Date().toISOString(),
    dueDate: new Date().toISOString(),
    datetime: new Date().toISOString(),
    lastchange: new Date().toISOString(),
    userid: '/users/1'
  };
  constructor() {}

  ngOnInit(): void {}
}
