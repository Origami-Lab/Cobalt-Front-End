import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {UserDropDown} from 'src/app/platform/manage-users/manage-users.interface';

@Component({
  selector: 'co-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements OnInit, OnChanges {
  defaultSelection: UserDropDown;
  dropList: UserDropDown[] = [];
  @Input()
  dropdownList: UserDropDown[];

  @Input()
  title: string;

  @Input()
  isShowAll = true;

  @Output()
  itemSelected = new EventEmitter<UserDropDown>();

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.dropdownList) {
      this.dropList = changes.dropdownList.currentValue;
      const filterAll = {
        name: '',
        label: 'All'
      };
      if (this.dropList) {
        if (this.isShowAll) {
          this.dropList.unshift(filterAll);
        }
        this.defaultSelection = this.dropList[0];
        this.itemSelected.emit(this.defaultSelection);
      }
    }
  }

  secletOption(itemSelected: UserDropDown): void {
    this.defaultSelection = itemSelected;
    this.itemSelected.emit(itemSelected);
  }
}
