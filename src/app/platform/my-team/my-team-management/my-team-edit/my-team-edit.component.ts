import {Component, OnInit, OnDestroy, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';
import {ApiError} from 'src/app/core/api-error/api-error';
import {CoModalLayoutComponent} from 'src/app/shared/co-modal/co-modal-layout/co-modal-layout.component';
import {IMyTeam} from '../../models/my-team.interface';
import {MyTeamService} from '../../my-team.service';
export interface IQueryParams {
  id: string;
}

@Component({
  selector: 'co-my-team-edit',
  templateUrl: './my-team-edit.component.html',
  styleUrls: ['./my-team-edit.component.scss']
})
export class MyTeamEditComponent implements OnInit, OnDestroy {
  @ViewChild('coModalLayoutRef', {static: true})
  modal: CoModalLayoutComponent;
  loading = false;
  apiError: ApiError;
  subscription: Subscription;

  constructor(private activeRouter: ActivatedRoute, private myTeamService: MyTeamService) {}

  ngOnInit(): void {
    this.subscription = this.activeRouter.queryParams.subscribe((rs: IQueryParams) => {
      this.getTeamsById(rs.id);
    });
  }

  getTeamsById(id: string): void {
    this.loading = true;
    this.myTeamService
      .getTeamsById(id)
      .pipe()
      .subscribe(rs => {
        this.loading = false;
      });
  }

  onModalClose(): void {
    this.modal.onClose();
  }

  onFormSubmit(myTeamForm: Partial<IMyTeam>): void {
    console.log('update', myTeamForm);
    // this.myTeamService.createMyTeam(myTeamForm).subscribe(
    //   rs => {
    //     this.loading = false;
    //     this.router.navigate(['platform/view/my-team/detail', rs.id]).then(() => this.onModalClose());
    //   },
    //   (httpResponseError: ApiHttpErrorResponse | HttpErrorResponse) => {
    //     this.apiError = httpResponseError.error;
    //   }
    // );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
