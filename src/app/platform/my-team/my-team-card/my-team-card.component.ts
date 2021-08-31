import {HttpErrorResponse} from '@angular/common/http';
import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {ApiError} from 'src/app/core/api-error/api-error';
import {ApiHttpErrorResponse} from 'src/app/core/api-error/api-http-error-response';
import {ConfirmModalComponent} from '../../platform-shared/components/confirm-modal/confirm-modal.component';
import {IMyTeam} from '../models/my-team.interface';
import {MyTeamService} from '../my-team.service';

@Component({
  selector: 'co-my-team-card',
  templateUrl: './my-team-card.component.html',
  styleUrls: ['./my-team-card.component.scss']
})
export class MyTeamCardComponent implements OnInit {
  apiError: ApiError;
  deleteTeamLoading = false;

  @ViewChild('confirmModalRef', {static: true})
  confirmModal: ConfirmModalComponent;

  @Input()
  teamCardElement: IMyTeam;

  constructor(private myTeamService: MyTeamService, private toastr: ToastrService, private router: Router) {}

  ngOnInit(): void {}

  onConfirmModalOpen(name: string): void {
    this.confirmModal.openModal(name);
  }

  onDeleteConfirm(): void {
    this.deleteTeamLoading = true;
    this.myTeamService.deleteTeamById(this.teamCardElement.id).subscribe(
      () => {
        this.deleteTeamLoading = false;
        this.toastr.success(`${this.teamCardElement.name} has been successfully deleted`);
        this.confirmModal.onModalClose();
        this.router.navigate(['/platform/view/my-team/list']);
      },
      (httpResponseError: ApiHttpErrorResponse | HttpErrorResponse) => {
        this.apiError = httpResponseError.error;
        this.deleteTeamLoading = false;
      }
    );
  }

  stopEventPropagation(e: Event): void {
    e.preventDefault();
    e.stopPropagation();
  }
}
