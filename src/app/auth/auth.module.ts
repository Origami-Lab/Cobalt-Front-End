import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../shared/shared.module';
import {AuthLayoutComponent} from './auth-layout/auth-layout.component';
import {LoginComponent} from './login/login.component';
import {LogoutComponent} from './logout/logout.component';
import {AuthRoutingModule} from './auth-routing.module';
import {TabsModule} from 'ngx-bootstrap/tabs';
import {FormsModule} from '@angular/forms';
import {SignupComponent} from './signup/signup.component';

@NgModule({
  declarations: [AuthLayoutComponent, LoginComponent, LogoutComponent, SignupComponent],
  imports: [CommonModule, SharedModule, AuthRoutingModule, TabsModule, FormsModule]
})
export class AuthModule {}
