Blog Management System

A full-stack web application for managing blogs, comments, tags, and user interactions. Includes both user and admin functionalities with secure authentication and authorization.

Features

User Features

User Registration and Login
Register a new account.
Login to access features with JWT authentication.

Blog Management

Create, edit, and delete blogs.
Like or unlike blogs.
View all blogs created by the user.

Comments
Add, view, and delete comments on blogs.

Tags
Create and manage tags for blogs.

Admin Features
View all blogs and users.
Fetch blogs by specific tags or IDs.
Delete comments on blogs.

API Routes

1. Admin Routes

GET /admin/blogs - Fetch all blogs.

GET /admin/users - Fetch all users.

GET /admin/blog/:id - Fetch a blog by ID.

GET /admin/:tagname - Fetch blogs by tag.

DELETE /admin/blog/:blogid/delete/:id - Delete a comment from a blog.


4. Blog Routes
   
POST /blogs/create - Create a new blog.

GET /blogs/user - Fetch all blogs created by the logged-in user.

GET /blogs/:id - Fetch a blog by ID.

PUT /blogs/edit/:id - Edit a blog.

DELETE /blogs/delete/:id - Delete a blog.

POST /blogs/:id/like - Like or unlike a blog.

6. Comment Routes
   
POST /comments/:blogid/create - Add a comment to a blog.

GET /comments/:blogid - Fetch all comments for a blog.

DELETE /comments/:blogid/delete/:id - Delete a comment.

8. Tag Routes
   
POST /tags/:blogid/create - Create a tag and associate it with a blog.

GET /tags/alltags - Fetch all tags.

GET /tags/:tagname - Fetch blogs by tag.

DELETE /tags/:blogid/:tagid - Remove a tag from a blog.

10. User Routes
    
POST /users/create - Register a new user.

POST /users/login - Login a user and generate a token.

Technologies Used

Backend: Node.js, Express.js
Database: MongoDB
Authentication: JWT
Middleware: Custom validation and authorization guards
postman documentation : https://documenter.getpostman.com/view/27740952/2sAYBd88LQ

Project Workflow

User Authentication
Users register and log in to receive a JWT token.
All protected routes require a valid token in the Authorization header.

Blog Management
Users create blogs with a title and content.
Blogs can be liked or unliked by other users.

Comments and Tags
Comments and tags are linked to specific blogs.
Admins and users can manage their respective entities efficiently.

Admin Features
Admins can view and manage all blogs, users, and comments.
