export type ServerResponse = {
  status: number;
  message: string;
};

export type MultiPageModalContent = {
  title?: string;
  content: (() => string) | string;
};
