import type { AxiosInstance } from "axios";
import type { UploadFilesPayload, UploadFilesResponse } from "./types";

const resource = "/travels";

export default (client: AxiosInstance) => ({
  uploadFiles: ({
    files,
  }: UploadFilesPayload): Promise<UploadFilesResponse> => {
    const formData = new FormData();
    const payload = files.map((item) => {
      formData.append("images", item);
      return item.name;
    });

    return client.post(`${resource}/upload`, payload).then((res) => {
      return res.data;
    });
  },
});
