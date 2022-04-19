import {NgModule} from '@angular/core';
import {SafePipe} from './safe.pipe';

@NgModule({
  imports: [],
  declarations: [SafePipe],
  providers: [SafePipe],
  exports: [SafePipe]
})
export class PipeModule {
  static forRoot() {
    return {
      ngModule: PipeModule,
      providers: []
    };
  }
}
