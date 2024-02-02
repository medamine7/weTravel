import type { UploadedImage } from "~/types/file";

export interface UploadFilesPayload {
  files: File[];
}

export type UploadFilesResponse = UploadedImage[];
