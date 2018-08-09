export class NewsType {
	id: number;
  subject: string;
  content: string;
  person: {
    imageUrl: string;
    fullName: string;
  };
  userId: number;
  // [hashtag: string]: string;
}
