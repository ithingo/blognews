import { UserType } from './user-type';

export class NewsType {
	id: number;
  subject: string;
  content: string;
  userId: number;
  photo: string;
  author: UserType;
  // [hashtag: string]: string;
}
