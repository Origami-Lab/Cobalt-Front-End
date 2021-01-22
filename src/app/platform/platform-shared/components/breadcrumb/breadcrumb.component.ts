import {Component, Input, OnInit} from '@angular/core';
import {BreadcrumbConfig} from './breadcrumb-config.interface';

@Component({
  selector: 'co-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {
  private static platformViewPath = '/platform/view';
  @Input()
  breadcrumbConfig: BreadcrumbConfig[];

  constructor() {}

  ngOnInit(): void {}

  getBreadcrumbURL(url: string | string[]): string[] {
    return [BreadcrumbComponent.platformViewPath, ...url];
  }
}
