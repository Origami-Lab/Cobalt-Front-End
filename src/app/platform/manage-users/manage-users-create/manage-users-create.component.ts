import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {finalize} from 'rxjs/operators';
import {AuthService} from 'src/app/auth/auth.service';
import {UserForm} from 'src/app/auth/model/auth.interface';
import {UserRoles} from 'src/app/core/enums/user-roles.enum';
import {CoModalLayoutComponent} from 'src/app/shared/co-modal/co-modal-layout/co-modal-layout.component';
import {markFormControlAsTouched} from 'src/app/shared/utils/mark-form-control-as-touched';

@Component({
  selector: 'co-manage-users-create',
  templateUrl: './manage-users-create.component.html',
  styleUrls: ['./manage-users-create.component.scss']
})
export class ManageUsersCreateComponent implements OnInit {
  createForm = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  });
  loading = false;
  @ViewChild('userModalRef')
  coModal: CoModalLayoutComponent;

  @Output()
  userCreated = new EventEmitter<void>();

  modalConfig = {show: false, backdrop: 'static', keyboard: false};

  constructor(private fb: FormBuilder, private authorService: AuthService, private toast: ToastrService) {}

  ngOnInit(): void {}

  openModal(): void {
    this.coModal.openModal();
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    markFormControlAsTouched(this.createForm);
    if (!this.createForm.valid) {
      return;
    }
    this.loading = true;
    this.createForm.value.roles = [UserRoles.ROLE_SCIENTIST];
    this.authorService
      .createUser(this.createForm.value)
      .pipe(
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe(() => {
        this.toast.success(`User has been create successfully`);
        this.closeModal();
        this.userCreated.emit();
      });
  }

  closeModal(): void {
    this.coModal.closeModal();
  }
}
