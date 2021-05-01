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







export type BookType = {
  kind: string;
  id: string;
  etag: string;
  selfLink: string;
  volumeInfo: VolumeType;
  language: string;
  searchInfo: SearchInfo;
};

// accessInfo: {country: "MD", viewability: "PARTIAL", embeddable: true, publicDomain: false, textToSpeechPermission: "ALLOWED_FOR_ACCESSIBILITY", …}
// etag: "HCX2qyrnyp4"
// id: "IuDEDwAAQBAJ"
// kind: "books#volume"
// saleInfo: {country: "MD", saleability: "NOT_FOR_SALE", isEbook: false}
// searchInfo: {textSnippet: "y With <b>mama</b> her accepted whole heart, a <b>…</b> has always loved us both with equal&nbsp;..."}
// selfLink: "https://www.googleapis.com/books/v1/volumes/IuDEDwAAQBAJ"
// volumeInfo: {title: "Just Like a Mama", authors: Array(1), publisher: "Denene Millner Books/Simon & Schuster Books for Young Readers", publishedDate: 