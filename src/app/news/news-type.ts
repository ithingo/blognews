export interface NewsType {
  subject: string;
  content: string;
  person: {
    imageUrl: string;
    fullName: string;
  };
  // [hashtag: string]: string;
}
