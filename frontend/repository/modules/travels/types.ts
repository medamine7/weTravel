interface UploadedImage {
  url: string;
  filename: string;
  originalname: string;
}

export interface UploadFilesPayload {
  files: File[];
}

export type UploadFilesResponse = UploadedImage[];
