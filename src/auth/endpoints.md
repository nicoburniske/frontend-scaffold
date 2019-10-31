# Login and Token Endpoints

Common Headers: 
  ```json
  Content-Type: application/json
  ```

## `POST user/login`

>Used for logging in.

### __Request__

Body:
  ```json
    {
    "username" : EMAIL or USERNAME,
    "password" : STRING
    }
  ```
  An EMAIL is a string representing a user's email.

  A USERNAME is a string representing a user's username.
  
### __Responses__ 
 

#### `201 Created`

>The username/password combination is valid. Includes distinct access and refresh tokens for the given user. 

Body: 
```json
{
  "access_token"  : STRING,
  "refresh_token" : STRING
}
```

#### `401 Unauthorized`
> The username/password combination is invalid.

Body
```json
{
  "status" : "BAD REQUEST",
  "reason" : STRING,
}
```

## `POST user/login/refresh`

> Used for getting a new access token.

### __Request__

Body:
  ```json
    {
    "refresh_token" : STRING
    }
  ```

### __Responses__ 

#### `201 Created`
> The refresh token is valid and has not yet expired. Response includes a new unique access_token.

Body: 
```json
{
  "access_token" : STRING,
}
```

#### `401 Unauthorized`
> The refresh token is invalid.

Body
```JSON
{
  "status": "BAD REQUEST",
  "reason": STRING
}
```

## `DELETE user/login`

> Used for logging out. 

### __Request__

Body:
  ```json
  {
    "access_token" : STRING,
    "refresh_token" : STRING
  }
  ```

### __Responses__ 

#### `204 No Content`
> Logout successful.

## `POST user/signup`

> Used for signing up a new user.

Body

```json
{
  "username" : STRING,
  "email" : STRING,
  "password" : STRING,
  "first_name" : STRING,
  "last_name" : STRING
}
```

### __Responses__ 

#### `201 Created`
> The username and email are still available, and an account has been successfully created.

Body: 
```json
{
  "access_token"  : STRING,
  "refresh_token" : STRING
}
```
 
#### `409 Conflict`
> There has been a conflict regarding the unique identifiers email and/or username.

Body:
```json
{
  "status" : "BAD REQUEST",
  "reason" : STRING,
}

```
