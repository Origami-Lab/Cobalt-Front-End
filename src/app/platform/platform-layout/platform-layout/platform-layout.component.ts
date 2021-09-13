import {Component, OnInit} from '@angular/core';
import {AuthService} from 'src/app/auth/auth.service';
import {UserRolesService} from 'src/app/auth/user-role.service';

@Component({
  selector: 'co-platform-layout',
  templateUrl: './platform-layout.component.html',
  styleUrls: ['./platform-layout.component.scss']
})
export class PlatformLayoutComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
