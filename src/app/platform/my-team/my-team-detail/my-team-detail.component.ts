import {HttpErrorResponse} from '@angular/common/http';
import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {ApiError} from 'src/app/core/api-error/api-error';
import {ApiHttpErrorResponse} from 'src/app/core/api-error/api-http-error-response';
import {BreadcrumbConfig} from '../../platform-shared/components/breadcrumb/breadcrumb-config.interface';
import {ConfirmModalComponent} from '../../platform-shared/components/confirm-modal/confirm-modal.component';
import {MyTeam} from '../models/my-team.interface';
import {MyTeamService} from '../my-team.service';

@Component({
  selector: 'co-my-team-detail',
  templateUrl: './my-team-detail.component.html',
  styleUrls: ['./my-team-detail.component.scss']
})
export class MyTeamDetailComponent implements OnInit {
  loading = true;
  teamItem: MyTeam;
  breadcrumbConfig: BreadcrumbConfig[];
  apiError: ApiError;
  deleteTeamLoading = false;

  @ViewChild('confirmModalRef', {static: true})
  confirmModal: ConfirmModalComponent;

  constructor(private myTeamService: MyTeamService, private route: ActivatedRoute, private toastr: ToastrService, private router: Router) {}

  ngOnInit(): void {
    const {myTeamId} = this.route.snapshot.params;
    this.getTeamsById(myTeamId);
    this.generateBreadcrumbConfig(myTeamId);
  }

  getTeamsById(id: string): void {
    this.myTeamService
      .getTeamsById(id)
      .pipe()
      .subscribe(rs => {
        this.loading = false;
        this.teamItem = rs;
      });
  }

  generateBreadcrumbConfig(id: string): void {
    this.breadcrumbConfig = [
      {
        label: 'My Team',
        path: ['my-team']
      },
      {
        label: 'Details',
        path: ['my-team', 'details', String(id)]
      }
    ];
  }

  onConfirmModalOpen(name): void {
    this.confirmModal.openModal(name);
  }

  onDeleteConfirm(): void {
    this.deleteTeamLoading = true;
    this.myTeamService.deleteTeamById(this.teamItem.id).subscribe(
      () => {
        this.deleteTeamLoading = false;
        this.toastr.success(`${this.teamItem.name} has been successfully deleted`);
        this.confirmModal.onModalClose();
        this.router.navigate(['/platform/view/my-team/list']);
      },
      (httpResponseError: ApiHttpErrorResponse | HttpErrorResponse) => {
        this.apiError = httpResponseError.error;
        this.deleteTeamLoading = false;
      }
    );
  }
}
