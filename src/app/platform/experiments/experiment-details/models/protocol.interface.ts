import {TextEditorContentType} from '../../../platform-shared/components/text-editor/text-editor-content.type';

export interface Protocol {
  id?: number;
  datetime?: string;
  protocol?: TextEditorContentType;
  experimentId?: string;
  userid?: string;
  padid?: string;
}
