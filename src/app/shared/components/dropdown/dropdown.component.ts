import {Component, EventEmitter, Input, OnInit, Output, SimpleChange} from '@angular/core';
import {UserDropDown} from 'src/app/platform/manage-users/manage-users.interface';

@Component({
  selector: 'co-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements OnInit {
  defaultSelection: UserDropDown;
  dropList: UserDropDown[] = [];
  @Input()
  dropdownList: UserDropDown[];

  @Output()
  itemSelected = new EventEmitter<UserDropDown>();

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(change: SimpleChange): void {
    if (change['dropdownList']) {
      this.dropList = change['dropdownList'].currentValue;
      const filterAll = {
        name: '',
        label: 'All'
      };
      if (this.dropList) {
        this.dropList.unshift(filterAll);
        this.defaultSelection = this.dropList[0];
      }
    }
  }

  secletOption(itemSelected: UserDropDown): void {
    this.defaultSelection = itemSelected;
    this.itemSelected.emit(itemSelected);
  }
}
