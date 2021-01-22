import {Component, ContentChild, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {RESIZABLE_BOX} from './resizable-box.token';
import {ResizableBoxMethods} from './resizable-box.interface';
import {Subject, Subscription} from 'rxjs';
import {startWith} from 'rxjs/operators';

@Component({
  selector: 'co-resizable-box',
  templateUrl: './resizable-box.component.html',
  styleUrls: ['./resizable-box.component.scss']
})
export class ResizableBoxComponent implements OnInit, OnDestroy {
  private static BOX_HEADER_HEIGHT = 59;
  @ViewChild('boxWrapperRef', {static: true})
  boxWrapper: ElementRef;
  @ContentChild(RESIZABLE_BOX, {static: true})
  resizableBox: ResizableBoxMethods;
  @Input()
  title: string;

  isResized = false;
  mutationObserverConfig = {
    attributeFilter: ['class'],
    attributes: true,
    characterDataOldValue: true,
    attributeOldValue: true
  };
  mutation$ = new Subject();
  private subscription: Subscription;
  constructor() {}

  ngOnInit(): void {
    this.subscription = this.mutation$.pipe(startWith(null as string)).subscribe(() => this.setBoxHeight());
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  setResize(): void {
    this.isResized = !this.isResized;
    if (this.resizableBox.resize) {
      this.resizableBox.resize(this.isResized);
    }
  }

  setBoxHeight(): void {
    if (!this.resizableBox.setBoxContentHeight) {
      return;
    }
    let {offsetHeight} = this.boxWrapper.nativeElement;
    offsetHeight -= ResizableBoxComponent.BOX_HEADER_HEIGHT;
    this.resizableBox.setBoxContentHeight(offsetHeight);
  }
}
