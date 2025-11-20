export interface PostFrontMatter {
  title: string;
  date: string;
  description: string;
  tags?: string[];
}

export interface Post {
  slug: string;
  frontMatter: PostFrontMatter;
  content: string;
}

export interface PostMeta {
  slug: string;
  frontMatter: PostFrontMatter;
  content: string;
}
