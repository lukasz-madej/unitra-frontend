export enum ImageType {
  SET = 'set',
  EQUIPMENT = 'equipment'
}

export enum ImageUploadStatus {
  PROGRESS = 'progress',
  COMPLETE = 'complete'
}

export interface Image {
  type: ImageType;
  location: string;
  name: string;
  size: number;
  hasThumbnail: boolean;
  parentId: number;
  id: number;
}
