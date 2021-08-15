# Blog API (backend) 

This is an API I created for the blog-api project from the The Odin Project curriculum. The project is a sister project of my blog-frontend project, which you can find [here](https://www.github.com/niconap/blog-frontend). This API allows a user to create, read, update and delete posts and authors and it allows visitors to create comments under certain posts (which the author of that post can delete). Comments can not be updated. 

## How does it work?

All the POST and PUT data has to be provided in the body of the HTTP request in JSON format.

### Logging in
You can log into your account using `/auth/login` (POST request), all you need to provide is a username and a password. 

### GET requests
Using `/blog/posts/` will give you a list of all the posts on the blog. 

Using `/blog/posts/:id` will give you the post with the corresponding id. 

Using `/blog/posts/:id/comments` will give you a list of all the comments under the post with the corresponding id. 

Using `/blog/authors/` will give you a list of all the authors.

### POST requests
Using `/blog/posts/` will allow you to create a post. You'll need to provide a title, some content and whether or not you want the post to be public. For example:
```json
{
  "title": "Sample title",
  "content": "Sample content",
  "public": false
}
```
The API will automatically add an author to the post. You need to be logged in to be able to create posts. Setting public to false means that the post is private, setting it to true means that it's public.

Using `/blog/posts/:id/comments` will allow you to post a comment under a post with the corresponding id. You'll need to provide a name and some content. For example:
```json
{
  "name": "Sample name",
  "content": "Sample content",
}
```

### DELETE requests
Using `/blog/posts/:id` will allow you to delete a post with the corresponding id. You need to be logged in to perform this action AND the post has to be written by you on your account. 

Using `/blog/authors/:id` will allow you to delete an author/account with the corresponding id. You need to be logged in to perform this action AND the author/account has to be yours.

Using `/blog/posts/:postid/comments/:commentid` will allow you to delete a comment with the corresponding commentid under a post with the corresponding postid. You need to be logged in to perform this action AND the comment has to be under one of your posts.

### PUT requests
Using `/posts/:id/` will allow you to update a post with the corresponding id. You need to be logged in to perform this action AND the post has to be written by you on your account. You need to provide the data in the same way as in the POST request.

Editing comments is not possible, since comments are not associated to an account.
