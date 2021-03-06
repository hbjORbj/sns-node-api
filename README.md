# Node JS API Development for Social Network Services 

These NodeJS APIs can be very useful especially for social network services (for other purposes as well!)
<br/>
Front-end App associated with these APIs is available [here](https://github.com/hbjORbj/sns-frontend).

# APIs:

## Global
- [x] login()
- [x] logout()
- [x] signUp()
  
## User
- [x] getUser()
- [x] getAllUsers()
- [x] updateUser()
- [x] deleteUser()
- [x] followUser()
- [x] unfollowUser()
- [x] findPeople() 
  
## Post
- [x] getPost()
- [x] getAllPosts()
- [x] createPost()
- [x] getPostsByUser()
- [x] deletePost()
- [x] updatePost()
- [x] likePost()
- [x] unlikePost()

# Routes:

## Global
- /api: api document
- /api/signup: sign up
- /api/login: log in
- /api/logout: log out
- /api/forgot-password: send password reset link
- /api/reset-password: reset password

## User
- /api/users: get all users
- /api/user/:userId: get / update / delete user
- /api/user/findpeople/:userId: find users not being followed by logged-in user
- /api/user/follow: follow user
- /api/user/unfollow: unfollow user

## Post  
- /api/posts: get all posts
- /api/post/:postId: get a single post
- /api/post/new/:userId: create new post
- /api/posts/by/:userId: get all posts by user
- /api/post/:postId: update / delete post
- /api/post/like: like post
- /api/post/unlike: unlike post

