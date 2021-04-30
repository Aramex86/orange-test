type SearchInfo = {
  textSnippet: string;
};

type VolumeType = {
  title: string;
  publishedDate: string;
  subtitle: string;
  imageLinks: ImageLiksType;
  description: string;
};

type ImageLiksType = {
  smallThumbnail: string;
  thumbnail: string;
};

export type BooksType = {
  kind: string;
  id: string;
  etag: string;
  selfLink: string;
  volumeInfo: VolumeType;
  language: string;
  searchInfo: SearchInfo;
};
export type ItemsType = {
  items: Array<BooksType>;
  kind: string;
  totalItems: number;
};

export type BookType = {
  kind: string;
  id: string;
  etag: string;
  selfLink: string;
  volumeInfo: VolumeType;
};
