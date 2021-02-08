export interface Attachment {
  id?: number;
  contentUrl?: string;
  // TODO: leave file || filePath when api is ready
  filePath?: string;
  file?: File | string;
  filename: string;
  experimentid: string;
  userid: string;
}
