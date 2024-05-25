export type Author = {
  name: string;
};

export type Book = {
  id: number;
  dateAdded: string;
  isbn: string;
  title: string;
  author?: Author;
};
