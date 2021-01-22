import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {
  transform(text: string, limit: number, completeWords?: true, trail?: string): string {
    const defaultTrail = '...';
    trail = trail || defaultTrail;
    let limitWithExcludedTrailLength = limit - trail.length;

    if (completeWords) {
      const textWithoutPartialWordsIndex = text.substr(0, limit).lastIndexOf(' ');
      limitWithExcludedTrailLength = textWithoutPartialWordsIndex > 0 ? textWithoutPartialWordsIndex : limitWithExcludedTrailLength;
    }

    return text.length > limitWithExcludedTrailLength ? text.substr(0, limitWithExcludedTrailLength) + trail : text;
  }
}
