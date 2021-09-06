import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';

@Component({
  selector: 'co-team-search',
  templateUrl: './team-search.component.html',
  styleUrls: ['./team-search.component.scss']
})
export class TeamSearchComponent implements OnInit {
  searchForm = this.fb.group({
    searchPhrase: [null]
  });
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}
}
