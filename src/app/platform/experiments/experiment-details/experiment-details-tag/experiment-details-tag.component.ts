import {Component, Input, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {BsDropdownDirective} from 'ngx-bootstrap/dropdown';
import {Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import {COLORS} from 'src/app/shared/utils/colors';
import {ExperimentsService} from '../../experiments.service';
import {Experiment, Experiments2labels} from '../../models/experiment.interface';
import {ExperimentTag, Labels} from '../models/tag.interface';

@Component({
  selector: 'co-experiment-details-tag',
  templateUrl: './experiment-details-tag.component.html',
  styleUrls: ['./experiment-details-tag.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ExperimentDetailsTagComponent implements OnInit {
  @ViewChild('dropdown') dropdown: BsDropdownDirective;

  @Input()
  experiment: Experiment;

  tagItems: Array<Experiments2labels>;
  tagList: Labels[];
  loading = false;
  tagKey: string;
  inputChange = new Subject<string>();
  inputLoading = false;
  isOpenAddTag = false;

  constructor(private experimentsService: ExperimentsService) {
    this.inputChange.pipe(debounceTime(500), distinctUntilChanged()).subscribe(value => {
      this.getTagList(value);
      this.inputLoading = false;
    });
  }
  ngOnInit(): void {
    this.tagItems = this.experiment.experiments2labels;
  }

  toogleAddTag(): void {
    this.isOpenAddTag = !this.isOpenAddTag;
  }

  addTag(): void {
    this.dropdown.hide();
    if (!this.checkIsExistInTagItems()) {
      this.experimentsService
        .getAllTag(this.tagKey)
        .pipe()
        .subscribe((rs: Labels[]) => {
          this.addItems(rs, this.tagKey);
        });
    } else {
      this.tagKey = '';
    }
  }

  addItems(tagList: Labels[], label: string): void {
    const tagForm: ExperimentTag = {
      experimentId: this.experiment.id,
      label,
      color: this.randomColor()
    };
    const tag = tagList.find(el => {
      return el.label.toString().toLowerCase() === label.toString().toLowerCase();
    });
    if (tag) {
      tagForm.labelId = tag.id;
    }
    this.addTagToExperiment(tagForm);
    this.isOpenAddTag = false;
  }

  checkIsExistInTagItems(): boolean {
    const ind = this.tagItems.findIndex(el => el.label.toLowerCase() === this.tagKey.toLowerCase());
    if (ind > -1) {
      return true;
    }
    return false;
  }

  randomColor(): string {
    const num = Math.floor(Math.random() * COLORS.length) + 0;
    const color = COLORS[num];
    return color;
  }

  removeTag(tag): void {
    this.removeTagFromExperiment(tag.id);
  }

  removeTagFromExperiment(id: number): void {
    this.loading = true;
    this.experimentsService.removeTagFromExperiment(id).subscribe(
      () => {
        this.loading = false;
        this.removeTagFormTagList(id);
      },
      () => {
        this.loading = false;
      }
    );
  }

  removeTagFormTagList(id: number): void {
    this.tagItems = this.tagItems.filter(el => el.id !== id);
  }

  addTagToExperiment(tagForm: ExperimentTag): void {
    this.experimentsService
      .addTagToExperiment(tagForm)
      .pipe()
      .subscribe((rs: Experiments2labels) => {
        this.tagItems.push(rs);
        this.tagKey = '';
      });
  }

  searchDebounce($event: string): void {
    this.inputLoading = true;
    this.inputChange.next($event);
  }

  getTagList(label: string): void {
    this.experimentsService
      .getAllTag(label)
      .pipe()
      .subscribe(rs => {
        this.tagList = rs.filter(item => {
          const ind = this.tagItems.findIndex(el => {
            return el.label === item.label;
          });
          if (ind < 0) {
            return item;
          }
        });
        if (this.tagList.length > 0) {
          this.dropdown.show();
        } else {
          this.dropdown.hide();
        }

        this.inputLoading = false;
      });
  }

  selectItemDropdown(tag: Labels): void {
    const tagForm: ExperimentTag = {
      experimentId: this.experiment.id,
      label: tag.label,
      color: tag.color,
      labelId: tag.id
    };
    this.addTagToExperiment(tagForm);
    this.dropdown.hide();
    this.tagKey = '';
    this.isOpenAddTag = false;
  }
}
