import { Injectable, Param } from '@nestjs/common';
import { Post, PostStatus } from './posts.model';
import { CreatePostDto } from './dto/createPost.dto';
import uuid from 'src/utils/uuid';

@Injectable()
export class PostsService {
  private posts: Post[] = []

  getAllPosts(): Post[] {
    return this.posts
  }

  getPostById(id: string): Post {
    return this.posts.find(post => post.id == id)
  }

  search(key: string): Post {
    return this.posts.find(post => post[key] == key)
  }

  createPost(post: CreatePostDto) {
    const { title, slug, body, likes } = post
    const newPost: Post = {
      id: uuid(),
      title,
      slug,
      body,
      status: PostStatus.DRAFT
    }

    this.posts.push(newPost)

    return newPost
  }
}
