import {Component, OnInit, ViewChild} from '@angular/core';
import {CoModalLayoutComponent} from '../../shared/co-modal/co-modal-layout/co-modal-layout.component';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'co-ui-kit-modal',
  templateUrl: './ui-kit-modal.component.html',
  styleUrls: ['./ui-kit-modal.component.scss']
})
export class UiKitModalComponent implements OnInit {
  @ViewChild('coModalLayout', {static: true})
  coModalLayout: CoModalLayoutComponent;
  isBlocked = this.route.snapshot.routeConfig.path.includes('blocked');
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {}

  onModalClose(): void {
    this.coModalLayout.onClose();
  }
}
