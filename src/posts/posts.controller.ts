import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Query } from '@nestjs/common';
import { PostsService } from './posts.service';
import { Post as PostModel, PostStatus } from './posts.model';
import { CreatePostDto } from './dto/createPost.dto';
import { FilterPostDto } from './dto/filterPost.dto';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) { }

  @Get()
  getPosts(@Query() query: FilterPostDto): PostModel[] {
    if (Object.keys(query).length > 0) {
      return this.postsService.getPostsFilter(query)
    }
    return this.postsService.getPosts()
  }

  @Get('/:id')
  getPostById(@Param('id') id: string): PostModel {
    return this.postsService.getPostById(id)
  }

  @Post()
  createPost(@Body() post: CreatePostDto): PostModel {
    return this.postsService.createPost(post)
  }

  @Patch('/:id')
  updatePost(@Param('id') id: string, @Body('status') status: PostStatus): PostModel {
    return this.postsService.updatePost(id, status)
  }

  @Delete('/:id')
  deletePost(@Param('id') id: string): PostModel {
    return this.postsService.deletePost(id)
  }
}
