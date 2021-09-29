import {Component, Input, OnInit, Output, EventEmitter, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {ApiError} from 'src/app/core/api-error/api-error';
import {ConfirmModalComponent} from '../../platform-shared/components/confirm-modal/confirm-modal.component';
import {MemberShortInfo, Team, TeamDelete} from '../model/team.interface';
import {TeamsService} from '../teams.service';

@Component({
  selector: 'co-team-card',
  templateUrl: './team-card.component.html',
  styleUrls: ['./team-card.component.scss']
})
export class TeamCardComponent implements OnInit {
  totalMember = 0;
  memberAvartarList: MemberShortInfo[] = [];
  @ViewChild('confirmModalRef', {static: true})
  confirmModal: ConfirmModalComponent;

  @Input()
  teamEl: Team;

  @Input()
  loading: boolean;

  @Input()
  apiError: ApiError;

  @Input()
  showViewMember = true;

  @Input()
  isShowInvite = true;

  @Output()
  viewMember = new EventEmitter<number | string>();

  @Output()
  deleteTeam = new EventEmitter<TeamDelete>();

  @Output()
  resetError = new EventEmitter();

  constructor(private teamsService: TeamsService) {}

  ngOnInit(): void {
    this.checkUserAvatar();
    this.countMember();
  }

  countMember(): void {
    if (this.teamEl.totalUsers) {
      this.totalMember = this.teamEl.totalUsers;
    } else {
      this.totalMember = this.teamEl.users.length;
    }
  }
  checkUserAvatar(): void {
    if (this.teamEl.userAvatars) {
      this.memberAvartarList = this.teamEl.userAvatars;
    } else {
      this.teamEl.users.map((el, index) => {
        const info = {
          avatar: el.avatar,
          name: el.name,
          email: el.email
        };
        if (index < 3) {
          this.memberAvartarList.push(info);
        }
      });
    }
  }

  stopEventPropagation(e: Event): void {
    e.preventDefault();
    e.stopPropagation();
  }

  emitViewMember(id: number | string): void {
    this.viewMember.emit(id);
  }

  onConfirmModalOpen(name: string): void {
    this.resetError.emit();
    this.confirmModal.openModal(name);
  }

  displayMember(): string {
    let suffixes = '';
    if (this.totalMember > 1) {
      suffixes = 's';
    }
    const memberLabel = `${this.totalMember} Member${suffixes}`;
    return memberLabel;
  }

  onDeleteConfirm(): void {
    this.deleteTeam.emit({
      modal: this.confirmModal,
      id: this.teamEl.id,
      name: this.teamEl.name
    });
  }
}
