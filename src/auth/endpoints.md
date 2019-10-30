# Login and Token Endpoints

Note: The same JWT was used for all examples, however in the implementation all JWT's should be unique. The refresh token should also never be the same as the access token.

## `POST /login`

Used for logging in.

### __Request__

Headers: 
  ```json
  Content-Type: application/json
  ```
Body:
  ```
  username: STRING (required)
    - Username or email of the user logging in.
  password: STRING (required)
    - Password of user logging in.
  ```

Example:
```json
  {
  "username" : "anemail@email.com",
  "password" : "password"
  }
```


### __Responses__ 
 

#### `201 Created`

The username/password combination is valid.

Includes distinct access and refresh tokens for the given user. 
-  Body: 
```json
{
  "access_token"  :"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
  "refresh_token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
}
```

#### `401 Unauthorized`
The username/password combination is invalid
- Body
```JSON
{
  "status" : "BAD REQUEST",
  "reason" : STRING
}
```

## `POST /login/refresh`

Used for getting a new access token

### __Request__

Headers: 
  ```json
  Content-Type: application/json
  ```
Body:
  ```
  refresh_token: STRING (required)
    - the refresh token that was granted upon successful login.
  ```

Example:
```json
  {
   "refresh_token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
  }
```


### __Responses__ 

#### `201 Created`
The refresh token is valid and has not yet expired.

Includes a new unique access_token.
-  Body: 
```json
{
  "access_token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
}
```

#### `401 Unauthorized`
The refresh token is invalid

- Body
```JSON
{
  "status": "BAD REQUEST",
  "reason": STRING
}
```

## `DELETE /login`

Used for logging out.

### __Request__

Headers: 
  ``` json
  Content-Type: application/json,
  X-Access-Token: STRING
  ```

Body:
  ```json
  refresh_token: STRING (REQUIRED)
  ```
  
Example:
```json
  {
   "refresh_token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
  }
```
### __Responses__ 

#### `204 No Content`
Logout successful


#### `401 Unauthorized`
Logout unsuccessful. 
- Body
```JSON
{
  "status" : "BAD REQUEST",
  "reason" : STRING
}
```
