import {TextEditorContentType} from '../../../platform-shared/components/text-editor/text-editor-content.type';

export interface Conclusion {
  id?: number;
  datetime?: string;
  conclusions?: TextEditorContentType;
  experimentId?: string;
  userid?: string;
  padid?: string;
}
