import {HttpErrorResponse} from '@angular/common/http';
import {THIS_EXPR} from '@angular/compiler/src/output/output_ast';
import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {ApiError} from 'src/app/core/api-error/api-error';
import {ApiHttpErrorResponse} from 'src/app/core/api-error/api-http-error-response';
import {CoModalLayoutComponent} from 'src/app/shared/co-modal/co-modal-layout/co-modal-layout.component';
import {MyTeam} from '../../models/my-team.interface';
import {MyTeamService} from '../../my-team.service';
@Component({
  selector: 'co-my-team-create',
  templateUrl: './my-team-create.component.html',
  styleUrls: ['./my-team-create.component.scss']
})
export class MyTeamCreateComponent implements OnInit {
  @ViewChild('coModalLayoutRef', {static: true})
  modal: CoModalLayoutComponent;
  loading = false;
  apiError: ApiError;

  constructor(private myTeamService: MyTeamService, private router: Router) {}

  ngOnInit(): void {}

  onModalClose(): void {
    this.modal.onClose();
  }

  onFormSubmit(myTeamForm: Partial<MyTeam>): void {
    this.myTeamService.createMyTeam(myTeamForm).subscribe(
      rs => {
        this.loading = false;
        this.router.navigate(['platform/view/my-team/detail', rs.id]).then(() => this.onModalClose());
      },
      (httpResponseError: ApiHttpErrorResponse | HttpErrorResponse) => {
        this.apiError = httpResponseError.error;
      }
    );
  }
}
