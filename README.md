# Blog API 

This is an API I created for the blog-api project from the The Odin Project curriculum. This API allows a user to create, read, update and delete posts and authors and it allows visitors to create comments under certain posts (which the author of that post can delete). Comments can not be updated. This API also includes two frontends that can be found at `/author-frontend/` and `/blog-frontend/` respectively. The author frontend allows users to create, edit, privatize or publicize and delete posts. The blog frontend allows users to read public posts and comment on them. 

The repository of the author interface can be found [here](https://github.com/niconap/blog-author-interface) and the repository of the reader interface can be found [here](https://github.com/niconap/blog-frontend).

## Live version
The live version can be found here: [reader interface](https://blog-9s8m.onrender.com/blog-frontend) and [author interface](https://blog-9s8m.onrender.com/author-frontend).

## How does it work?

All the POST and PUT data has to be provided in the body of the HTTP request in JSON format.

### Logging in
Logging in is possible by using `/auth/login` (POST request), all information that needs to provided is a username and a password. For example:
```json
{
  "username": "username",
  "password": "password"
}
```

### GET requests
Using `/blog/posts/` will give a list of all the posts on the blog. 

Using `/blog/posts/:id` will give the post with the corresponding id. 

Using `/blog/posts/:id/comments` will give a list of all the comments under the post with the corresponding id. 

Using `/blog/authors/` will give a list of all the authors.

### POST requests
Using `/blog/posts/` will create a post. Information about the title, the content and whether or not the post is public should be provided. For example:
```json
{
  "title": "Sample title",
  "content": "Sample content",
  "public": false
}
```
The API will automatically add an author to the post. It is required to be logged in to be able to create posts. Setting public to false means that the post is private, setting it to true means that it's public.

Using `/blog/posts/:id/comments` will post a comment under a post with the corresponding id. A name and content have to be added in the request. For example:
```json
{
  "name": "Sample name",
  "content": "Sample content",
}
```

It is also possible to create an author. Creating an author is done using `/authors/`. In order to create an author information must be submitted in like this:
```json
{
  "firstname": "Sample name",
  "lastname": "Sample name",
  "username": "Sample username",
  "password": "Sample password"
}
```

### DELETE requests
No additional information in the body of the HTTP-request is required for delete requests.

Using `/blog/posts/:id` will delete a post with the corresponding id. It is required to be logged in to perform this action AND the post has to be written by the account that is currently logged in. 

Using `/blog/authors/:id` will to delete an author/account with the corresponding id. It is required to be logged in to perform this action AND the author/account has to be the account that is currently logged in.

Using `/blog/posts/:postid/comments/:commentid` will to delete a comment with the corresponding commentid under a post with the corresponding postid. It is required to be logged in to perform this action AND the comment has to be under a post that the account that is currently logged in has written.

### PUT requests
Using `/posts/:id/` will update a post with the corresponding id. It is required to be logged in to perform this action AND the post has to be written by the current account. Data needs to be provided in the same format as in the POST request to create a post.

Editing comments is not possible, since comments are not associated to an account.
