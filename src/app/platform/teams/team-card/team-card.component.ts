import {Component, Input, OnInit, Output, EventEmitter, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {ApiError} from 'src/app/core/api-error/api-error';
import {ConfirmModalComponent} from '../../platform-shared/components/confirm-modal/confirm-modal.component';
import {Team, TeamDelete} from '../model/team.interface';

@Component({
  selector: 'co-team-card',
  templateUrl: './team-card.component.html',
  styleUrls: ['./team-card.component.scss']
})
export class TeamCardComponent implements OnInit {
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

  @Output()
  viewMember = new EventEmitter<number | string>();

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

  emitViewMember(id: number | string): void {
    this.viewMember.emit(id);
  }

  onConfirmModalOpen(name: string): void {
    this.resetError.emit();
    this.confirmModal.openModal(name);
  }

  displayMember(): string {
    let suffixes = '';
    let memberLabel = `${this.teamEl.users.length} Member${suffixes}`;
    if (this.teamEl.users.length > 1) {
      suffixes = 's';
    }
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
