import {Component, EventEmitter, OnInit, Output, ViewChild, ViewEncapsulation} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {finalize} from 'rxjs/operators';
import {AuthService} from 'src/app/auth/auth.service';
import {UserRoles} from 'src/app/core/enums/user-roles.enum';
import {CustomValidators} from 'src/app/core/utils/custom-validators';
import {CoModalLayoutComponent} from 'src/app/shared/co-modal/co-modal-layout/co-modal-layout.component';
import {markFormControlAsTouched} from 'src/app/shared/utils/mark-form-control-as-touched';
import {UserDropDown} from '../manage-users.interface';

@Component({
  selector: 'co-manage-users-create',
  templateUrl: './manage-users-create.component.html',
  styleUrls: ['./manage-users-create.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ManageUsersCreateComponent implements OnInit {
  createForm = this.fb.group({
    email: ['', [Validators.required, CustomValidators.validateEmail]],
    password: ['', Validators.required],
    firstName: [''],
    lastName: ['']
  });

  dropdownList: UserDropDown[];
  loading = false;
  isShowEyes = false;
  role = '';

  @ViewChild('userModalRef')
  coModal: CoModalLayoutComponent;

  @Output()
  userCreated = new EventEmitter<void>();

  modalConfig = {show: false, backdrop: 'static', keyboard: false};

  constructor(private fb: FormBuilder, private authorService: AuthService, private toast: ToastrService) {}

  ngOnInit(): void {
    this.getUserRoles();
  }

  openModal(): void {
    this.coModal.openModal();
    this.createForm.reset();
    this.isShowEyes = false;
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    markFormControlAsTouched(this.createForm);
    if (!this.createForm.valid || !this.role) {
      return;
    }
    this.loading = true;
    this.createForm.value.roles = [this.role];
    this.createForm.value.name = this.createForm.value.firstName + ' ' + this.createForm.value.lastName;
    delete this.createForm.value.firstName;
    delete this.createForm.value.lastName;
    this.authorService
      .createUser(this.createForm.value)
      .pipe(
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe(
        () => {
          this.toast.success(`User has been create successfully`);
          this.closeModal();
          this.userCreated.emit();
        },
        () => {
          this.createForm.setErrors({wrongCreateUser: true});
        }
      );
  }

  closeModal(): void {
    this.coModal.closeModal();
  }

  toggleEye(): void {
    this.isShowEyes = !this.isShowEyes;
  }

  getUserRoles(): void {
    this.authorService
      .getUserRoles()
      .pipe()
      .subscribe((rs: UserDropDown[]) => {
        this.dropdownList = rs;
      });
  }

  itemSelected(dropItem: UserDropDown): void {
    this.role = dropItem.name;
  }
}
