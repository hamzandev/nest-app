import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { PostsService } from './posts.service';
import { Post as PostModel } from './posts.model';
import { CreatePostDto } from './dto/createPost.dto';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) { }

  @Get()
  getAllPosts(): PostModel[] {
    return this.postsService.getAllPosts()
  }

  @Get('/:id')
  getPostById(@Param('id') id: string): PostModel {
    return this.postsService.getPostById(id)
  }

  @Post()
  createPost(@Body() post: CreatePostDto): PostModel {
    return this.postsService.createPost(post)
  }
}
