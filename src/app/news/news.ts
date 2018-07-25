interface Person {
  imageUrl: string;
  fullName: string;
}

export interface News {
  subject: string;
  content: string;
  person: Person;
  // [hashtag: string]: string;
}
