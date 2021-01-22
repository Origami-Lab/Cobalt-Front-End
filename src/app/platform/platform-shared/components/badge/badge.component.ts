import {Component, OnInit, Input} from '@angular/core';
import {Status} from '../../../../core/enums/status.enum';

@Component({
  selector: 'co-badge',
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.scss']
})
export class BadgeComponent implements OnInit {
  @Input() status: Status;
  statusColorMap = new Map([
    [Status.IN_PREPARATION, {backgroundColor: 'warning-100', textColor: 'warning', text: 'In Progress'}],
    [Status.RUNNING, {backgroundColor: 'primary-50', textColor: 'primary', text: 'Running'}],
    [Status.FINISHED, {backgroundColor: 'success-100', textColor: 'success', text: 'Finished'}]
  ]);

  constructor() {}

  ngOnInit(): void {}
}
