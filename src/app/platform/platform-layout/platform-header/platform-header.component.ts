import {Component, OnInit} from '@angular/core';
import {MobileNavigationService} from '../mobile-navigation.service';

@Component({
  selector: 'co-platform-header',
  templateUrl: './platform-header.component.html',
  styleUrls: ['./platform-header.component.scss']
})
export class PlatformHeaderComponent implements OnInit {
  constructor(public mobileNavigationService: MobileNavigationService) {}

  ngOnInit(): void {}
}
