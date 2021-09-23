import {Component, Input, OnInit, Output, EventEmitter, ViewChild, ElementRef, OnDestroy, ViewEncapsulation} from '@angular/core';
import Quill from 'quill';
import {QuillModules} from 'ngx-quill/lib/quill-editor.interfaces';
import {BehaviorSubject, combineLatest, fromEvent, Subject, Subscription} from 'rxjs';
import {debounceTime, filter, map, startWith, tap} from 'rxjs/operators';
import {availableToolbarFeaturesConfig} from './available-toolbar-features-config.const';
import {TextEditorContentType} from './text-editor-content.type';
import BlotFormatter from 'quill-blot-formatter';
import {ImageDrop} from 'quill-image-drop-module';
import ImageUploader from 'quill-image-uploader';
import {ExperimentDetailsService} from 'src/app/platform/experiments/experiment-details/experiment-details.service';
import {fileUpload} from 'src/app/shared/interfaces/file-upload.interface';
import QuillImageDropAndPaste from 'quill-image-drop-and-paste';

Quill.register('modules/imageDropAndPaste', QuillImageDropAndPaste);
Quill.register('modules/imageUploader', ImageUploader);
Quill.register('modules/blotFormatter', BlotFormatter);
Quill.register('modules/imageDrop', ImageDrop);
@Component({
  selector: 'co-text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TextEditorComponent implements OnInit, OnDestroy {
  @ViewChild('quillEditorRef', {static: true})
  quillEditor: ElementRef;
  @Input()
  set initialValue(value: TextEditorContentType) {
    this._initialValue = value;
  }
  get initialValue(): TextEditorContentType {
    return this._initialValue;
  }
  quillInstance: Quill;
  @Input()
  format: 'object' | 'html' | 'text' | 'json';
  @Input()
  config: QuillModules = this.getQuillDefaultConfig();
  @Input()
  set contentWrapperHeight(height: number) {
    this.editorContentHeight$.next(height);
  }
  @Output()
  contentChanged = new EventEmitter<TextEditorContentType>();

  icons: {[key: string]: string};
  quillEditorInstance$ = new Subject<Quill>();
  editorContentHeight$ = new BehaviorSubject<number>(null);
  private subscription: Subscription;
  private _initialValue: TextEditorContentType;

  constructor(private experimentDetailsService: ExperimentDetailsService) {}

  ngOnInit(): void {
    this.addQuillIcons();
    this.subscription = combineLatest([
      this.quillEditorInstance$.pipe(
        tap((quillInstance: Quill) => {
          if (!this.quillInstance) {
            this.quillInstance = quillInstance;
          }
        })
      ),
      this.editorContentHeight$.pipe(filter(h => !!h)),
      fromEvent(window, 'resize').pipe(startWith(null as string), debounceTime(30))
    ])
      .pipe(filter(([quillInstance]: [Quill, number, Event]) => !!quillInstance))
      .subscribe(([_, editorContentHeight]: [Quill, number, Event]) => {
        this.setEditorContentHeight(editorContentHeight);
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.initialValue = undefined;
  }

  onQuillCreated(quillInstance: Quill): void {
    this.quillEditorInstance$.next(quillInstance);
  }

  onModelChange(value: TextEditorContentType): void {
    this.contentChanged.emit(value);
  }

  addQuillIcons(): void {
    const icons = Quill.import('ui/icons');
    icons.undo =
      '<svg viewbox="0 0 18 18"><polygon class="ql-fill ql-stroke" points="6 10 4 12 2 10 6 10"></polygon><path class="ql-stroke" d="M8.09,13.91A4.6,4.6,0,0,0,9,14,5,5,0,1,0,4,9"></path></svg>';
    icons.redo =
      '<svg viewbox="0 0 18 18"><polygon class="ql-fill ql-stroke" points="12 10 14 12 16 10 12 10"></polygon><path class="ql-stroke" d="M9.91,13.91A4.6,4.6,0,0,1,9,14a5,5,0,1,1,5-5"></path></svg>';
  }

  getQuillDefaultConfig(): QuillModules {
    return {
      toolbar: {
        container: availableToolbarFeaturesConfig,
        handlers: {
          redo: () => this.quillInstance.history.redo(),
          undo: () => this.quillInstance.history.undo()
        }
      },
      history: {delay: 2000, maxStack: 500, userOnly: true},
      blotFormatter: {},
      // imageDrop: true,
      imageUploader: {
        upload: file => {
          return this.experimentDetailsService
            .uploadFile(file)
            .pipe(map((rs: fileUpload) => rs.contentUrl))
            .toPromise();
        }
      },
      imageDropAndPaste: {}
    } as QuillModules;
  }

  returnFile(fileURL: string): Promise<string> {
    return new Promise(resolve => {
      resolve(fileURL);
    });
  }

  setEditorContentHeight(editorContentHeight: number): void {
    const toolbarHeight = (this.quillEditor as any).editorElem.previousSibling.offsetHeight;
    const editorContentWrapperHeight = editorContentHeight - toolbarHeight;
    (this.quillEditor as any).editorElem.style.height = `${editorContentWrapperHeight}px`;
  }
}
