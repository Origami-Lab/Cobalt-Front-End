import {Component, OnInit, ViewChild} from '@angular/core';
import {CoModalLayoutComponent} from 'src/app/shared/co-modal/co-modal-layout/co-modal-layout.component';
import {User} from '../../model/team.interface';
import {TeamsService} from '../../teams.service';

@Component({
  selector: 'co-add-member',
  templateUrl: './add-member.component.html',
  styleUrls: ['./add-member.component.scss']
})
export class AddMemberComponent implements OnInit {
  @ViewChild('coModalLayoutRef', {static: true})
  modal: CoModalLayoutComponent;

  userList: User[];
  loading: boolean = false;
  constructor(private teamsService: TeamsService) {}

  ngOnInit(): void {
    this.getAllUser();
  }

  onModalClose(): void {
    this.modal.onClose();
  }

  getAllUser(): void {
    this.teamsService
      .getAllUser()
      .pipe()
      .subscribe((rs: User[]) => {
        this.userList = rs;
      });
  }
}
