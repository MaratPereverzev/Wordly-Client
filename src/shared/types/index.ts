export type AxiosBasicRequestParams = {
  limit?: number;
  offset?: number;
};

export type FileData = {
  caption: string;
  data: File | null;
  type: string;
  preview: string | ArrayBuffer | null;
};
