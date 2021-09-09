import {Component, OnInit} from '@angular/core';
import {AuthTokenService} from 'ngx-api-utils';

@Component({
  selector: 'co-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {
  constructor(private authToken: AuthTokenService) {}

  ngOnInit(): void {
    this.authToken.value$.next(undefined);
    localStorage.removeItem('user_id');
  }
}
