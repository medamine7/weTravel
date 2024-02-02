import type { AxiosInstance } from "axios";
import type { UploadFilesPayload, UploadFilesResponse } from "./types";

const resource = "/travels";

export default (client: AxiosInstance) => ({
  uploadFiles: ({
    files,
  }: UploadFilesPayload): Promise<UploadFilesResponse> => {
    const formData = new FormData();

    files.forEach((file) => {
      formData.append("images", file);
    });

    return client.post(`${resource}/upload`, formData).then((res) => {
      return res.data;
    });
  },
});
