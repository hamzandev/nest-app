import { Injectable, Param, Query } from '@nestjs/common';
import { Post, PostStatus } from './posts.model';
import { CreatePostDto } from './dto/createPost.dto';
import uuid from 'src/utils/uuid';
import { FilterPostDto } from './dto/filterPost.dto';

@Injectable()
export class PostsService {
  private posts: Post[] = []

  getPosts(): Post[] {
    return this.posts
  }

  getPostsFilter(filters: FilterPostDto): Post[] {
    const { search, status } = filters
    if (status) {
      return this.posts.filter(post => post.status == status)
    }

    if (search) {
      return this.posts.filter(post => post.title.includes(search) || post.body.includes(search))
    }
  }

  getPostById(id: string): Post {
    return this.posts.find(post => post.id == id)
  }

  updatePost(id: string, status: PostStatus): Post {
    const post = this.getPostById(id)
    post.status = status
    return post
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

  deletePost(id: string): Post {
    const found = this.getPostById(id)
    this.posts.filter(post => post.id !== id)
    return found;
  }
}
