export type SingleNavItem = { title: string; href: string; outlined?: boolean };

export type NavItems = SingleNavItem[];

export interface SingleArticle {
  slug: string;
  content: string;
  meta: {
    title: string;
    description: string;
    date: string;
    category: string; // Changed from tags
    author: string;
    imageUrl: string;
    readTime?: string | null;
  };
}

export type NonNullableChildren<T> = { [P in keyof T]: Required<NonNullable<T[P]>> };

export type NonNullableChildrenDeep<T> = {
  [P in keyof T]-?: NonNullableChildrenDeep<NonNullable<T[P]>>;
};
