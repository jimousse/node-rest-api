# node-rest-api

Simple rest API created using `express` and MongoDB for a social media app.

## Run the server
Install the dependencies
```sh
$ npm i
```

Put your mongodb server url in the file `mongodb_server.txt`. For instance: `mongodb://127.0.0.1:27017`.

Run the server
```sh
$ npm start
```

## Features

### Signup
 `POST`: `auth/signup` See [controller](https://github.com/jimousse/node-rest-api/blob/main/controllers/auth/signup.js).

Create a new user with a password and an email
- The client sends the following request:
```
{
   "method":"PUT",
   "headers":{
      "Content-Type":"application/json"
   },
   "body":"{"email": "jimmy@email.com", "password":"password"}"
}
```
- the server checks whether the email exists in the database
- if not, it hashes the password and then insert the user into the database

### Login
 `POST`: `auth/login` See [controller](https://github.com/jimousse/node-rest-api/blob/main/controllers/auth/login.js).

Logs in a returning user.
- The client sends the following request:
```
{
   "method":"POST",
   "headers":{
      "Content-Type":"application/json"
   },
   "body":"{"email": "jimmy@email.com", "password":"password"}"
}
```
- the server checks whether the email exists in the database
- if so, it hashes the password received and compares it with the one stored in the database for that user
- if match, the server generates a [JWT](https://jwt.io/introduction) token that contains the user id to the client

### Create/modify a post
 `POST`: `feed/post` See [controller](https://github.com/jimousse/node-rest-api/blob/main/controllers/feed/create-post.js).

Creates/modifies a social media post for a logged in user and stores it in the user entry.
- The client sends the following request:
```
{
   "method":"POST",
   "headers":{
      "Authorization: "Bearer <user-jwt-token>"
   },
   "body":"{"title": "My title", "content":"The content of my post", image: <image-file.png>}"
}
```
- the server decodes the token in the header and checks that it is valid and retrieves the user id from it and checks that it's valid
- it stores the image received on the server (if there is an image already, it replaces it)
- it creates a new post/modidies the post in the database with the `title`, `content`, `imageUrl` (path of the file on the server) and `creator` (ref to a user id)

### Get a post
 `GET`: `feed/post/:postId` See [controller](https://github.com/jimousse/node-rest-api/blob/main/controllers/feed/get-post.js).

Creates a social media post for a logged in user and stores it in the user entry.
- The client sends the following request with the postId as a param:
```
{
   "method":"GET",
   "headers":{
      "Authorization: "Bearer <user-jwt-token>"
   }
}
```
- the server decodes the token in the header and checks that it is valid and retrieves the user id from it and checks that it's valid
- gets the post from the database and sends it back to the client


### Delete a post
 `DELETE`: `feed/post/:postId` See [controller](https://github.com/jimousse/node-rest-api/blob/main/controllers/feed/delete-post.js).

Deletes a social media post for a logged in user.
- The client sends the following request with the postId as a param:
```
{
   "method":"DELETE",
   "headers":{
      "Authorization: "Bearer <user-jwt-token>"
   }
}
```
- the server decodes the token in the header and checks that it is valid and retrieves the user id from it and checks that it's valid
- deletes the post from the database
