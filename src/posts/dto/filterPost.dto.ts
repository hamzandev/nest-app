import { PostStatus } from "../posts.model";

export class FilterPostDto {
  status: PostStatus;
  search: string
}
