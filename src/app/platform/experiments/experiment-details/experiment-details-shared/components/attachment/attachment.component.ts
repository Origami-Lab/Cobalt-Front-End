import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'co-attachment',
  templateUrl: './attachment.component.html',
  styleUrls: ['./attachment.component.scss']
})
export class AttachmentComponent implements OnInit {
  @Input()
  attachment: string;
  @Input()
  truncateText = false;
  @Input()
  showCloseButton = true;
  @Output()
  remove = new EventEmitter<void>();
  constructor() {}

  ngOnInit(): void {}

  onRemove(): void {
    this.remove.emit();
  }
}
