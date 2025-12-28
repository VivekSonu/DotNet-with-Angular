import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BlogPostService } from '../services/blog-post-service';

@Component({
  selector: 'app-blogpost-list',
  imports: [RouterLink],
  templateUrl: './blogpost-list.html',
  styleUrl: './blogpost-list.css',
})
export class BlogpostList {
  blogPostService = inject(BlogPostService);

  getAllBlogPostsRef = this.blogPostService.getAllBlogPosts();

  isLoading = this.getAllBlogPostsRef.isLoading;
  error = this.getAllBlogPostsRef.error;
  response = this.getAllBlogPostsRef.value;
  statusCode = this.getAllBlogPostsRef.statusCode;
}
