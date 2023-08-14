import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'co-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {
  @Input()
  loading: boolean;

  @Input()
  size?: number;

  constructor() {}

  ngOnInit(): void {}
}
