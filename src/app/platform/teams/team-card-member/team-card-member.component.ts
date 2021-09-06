import {Component, Input, OnInit, Output, EventEmitter, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {ApiError} from 'src/app/core/api-error/api-error';
import {ConfirmModalComponent} from '../../platform-shared/components/confirm-modal/confirm-modal.component';
import {Team, TeamDelete} from '../model/team.interface';

@Component({
  selector: 'co-team-card-member',
  templateUrl: './team-card-member.component.html',
  styleUrls: ['./team-card-member.component.scss']
})
export class TeamCardMemberComponent implements OnInit {
  @ViewChild('confirmModalRef', {static: true})
  confirmModal: ConfirmModalComponent;

  @Input()
  memberEl: Team;

  @Input()
  loading: boolean;

  @Input()
  apiError: ApiError;

  @Output()
  viewWork = new EventEmitter<number | string>();

  @Output()
  deleteTeam = new EventEmitter<TeamDelete>();

  @Output()
  resetError = new EventEmitter();

  constructor(private router: Router) {}

  ngOnInit(): void {}

  stopEventPropagation(e: Event): void {
    e.preventDefault();
    e.stopPropagation();
  }

  emitViewWork(id: number | string): void {
    this.viewWork.emit(id);
  }

  onConfirmModalOpen(name: string): void {
    this.resetError.emit();
    this.confirmModal.openModal(name);
  }

  onDeleteConfirm(): void {
    this.deleteTeam.emit({
      modal: this.confirmModal,
      id: this.memberEl.id
      // name: this.memberEl.name
    });
  }
}
