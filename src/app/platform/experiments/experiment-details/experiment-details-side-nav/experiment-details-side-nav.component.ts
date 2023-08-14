import {Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {WindowSizeService} from '../../../../core/utils/window-size.service';
import {fromEvent, Subscription} from 'rxjs';
import {debounceTime} from 'rxjs/operators';
import {Experiment} from '../../models/experiment.interface';
import {KetcherModalComponent} from './ketcher-modal/ketcher-modal.component';

@Component({
  selector: 'co-experiment-details-side-nav',
  templateUrl: './experiment-details-side-nav.component.html',
  styleUrls: ['./experiment-details-side-nav.component.scss']
})
export class ExperimentDetailsSideNavComponent implements OnInit, OnDestroy {
  @ViewChild('ketcherModelRef')
  ketcherModelRef: KetcherModalComponent;

  @Input()
  experiment: Experiment;

  @Output()
  toggleNav = new EventEmitter<boolean>();

  isExpanded = !this.windowSizeService.isMd;
  private subscription: Subscription;

  constructor(private windowSizeService: WindowSizeService) {}

  ngOnInit(): void {
    this.subscription = fromEvent(window, 'resize')
      .pipe(debounceTime(300))
      .subscribe(() => {
        this.isExpanded = !this.windowSizeService.isMd;
        this.toggleNav.emit(this.isExpanded);
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    const modalElement = document.querySelector('.modal');
    if (modalElement) {
      modalElement.remove();
    }
  }

  openKetcherModal(): void {
    this.ketcherModelRef.openModal();
  }

  toggleNavExpand(): void {
    this.isExpanded = !this.isExpanded;
    this.toggleNav.emit(this.isExpanded);
  }
}
