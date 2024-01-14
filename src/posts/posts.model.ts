export interface Post {
  id: string;
  title: string;
  slug: string;
  body: string;
  status: PostStatus
}

export enum PostStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
  ARCHIVED = 'ARCHIVED',
}
