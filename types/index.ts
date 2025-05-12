export interface SingleArticle {
  slug: string;
  content: string;
  meta: {
    title: string;
    description: string;
    date: string;
    category: string;
    author: string;
    imageUrl: string;
  };
}
