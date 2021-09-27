import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {finalize} from 'rxjs/operators';
import {AuthService} from 'src/app/auth/auth.service';
import {Count, CountUser} from 'src/app/auth/model/auth.interface';
import {UserRoles} from 'src/app/core/enums/user-roles.enum';
import {ManageUsersCreateComponent} from '../../manage-users-create/manage-users-create.component';

@Component({
  selector: 'co-manage-users-list-header',
  templateUrl: './manage-users-list-header.component.html',
  styleUrls: ['./manage-users-list-header.component.scss']
})
export class ManageUsersListHeaderComponent implements OnInit {
  userCount: CountUser;
  countLoading = false;
  @ViewChild('userModalRef')
  createModal: ManageUsersCreateComponent;

  @Input()
  updateNumber: number;

  @Output()
  userCreated = new EventEmitter<void>();

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.countUser();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes['updateNumber'] && changes['updateNumber'].currentValue) {
      this.countUser();
    }
  }

  openModal(): void {
    this.createModal.openModal();
  }

  countUser(): void {
    this.countLoading = true;
    this.authService
      .coutUser()
      .pipe(
        finalize(() => {
          this.countLoading = false;
        })
      )
      .subscribe((rs: CountUser) => {
        this.userCount = rs;
      });
  }

  getRoleName(roleItem: Count): string {
    let roleName = '';
    if (roleItem.name === UserRoles.ROLE_ADMIN) {
      roleName = 'Admin';
      if (roleItem.count > 1) {
        roleName = roleName + 's';
      }
    } else if (roleItem.name === UserRoles.ROLE_SCIENTIST) {
      roleName = 'Scientist';
    }
    return roleName;
  }

  onUserCreated(): void {
    this.userCreated.emit();
  }
}
