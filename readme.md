# Kanban Server


## Kanban Server endpoints
---

## User endpoints
---
### GET /register : register new user

_Request Header_
```
{
  not needed
}
```

_Request Body_
```
{
  "name": "<posted name>"
  "email": "<posted email>",
  "password": "<posted password>"
}
```

_Response (201 - Created)_
```
{
  "id": "<user id given by system>",
  "name": "<posted name>"
  "email": "<posted email>",
  "password": "<hashed posted password>",
  "createdAt": "<date given by system>",
  "updatedAt": "<date given by system>",
}
```

_Response (400 - Bad Request)_
```
{
  "message": "<first validation error caught>"
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "internal server error"
}
```

---
### POST /login : user login using registered account

_Request Header_
```
not needed
```

_Request Body_
```
{
  "email": "<email post>",
  "password": "<password post>",
}
```

_Response (200)_
```
{
  "id": "<user id>",
  "name": "<user name>",
  "email": "<user email>",
  "access_token": "<user access_token>",
}
```

_Response (400 - Bad Request)_
```
{
  "message": "<first validation error caught>"
}
```

_Response (404 - Not Found)_
```
{
  "message": "<message email unregistered>"
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "internal server error"
}
```


# Task endpoints
---
### GET /tasks : show all task

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
not needed
```

_Response (200)_
```
[
  {
    "id": "<task id>",
    "title": "<task title>",
    "category": "<task category>",
    "UserId": "<creator id>",
    "createdAt": "<date task created>",
    "updatedAt": "<date last time task updated>"
  },
  {
    "id": "<task id>",
    "title": "<task title>",
    "category": "<task category>",
    "UserId": "<id creator>",
    "createdAt": "<date task created>",
    "updatedAt": "<date last time task updated>"
  },
]
```

_Response (500 - Internal Server Error)_
```
{
  "message": "internal server error"
}
```

---
### POST /tasks : add new task

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
{
  "title": "<task title>",
  "category": "<task category>",
}
```

_Response (201 - Created)_
```
{
  "id": "<task id>",
  "title": "<task title>",
  "category": "<task category>",
  "UserId": "<id creator>"
  "createdAt": "<date given by system>",
  "updatedAt": "<date given by system>"
}
```

_Response (400 - Bad Request)_
```
{
  "message": "<first validation error caught>"
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "internal server error"
}
```

---
### GET /tasks/:id : find task by id

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
not needed
```

_Response (200)_
```
{
  "id": "<id of found task>",
  "title": "<title of found task>",
  "category": "<category of found task>",
  "UserId": "<creator id of found task>"
  "createdAt": "<date created of found task>",
  "updatedAt": "<updateAt of found task>",
}
```

_Response (401 - Unauthorized)_
```
{
  "message": "<unauthorized message>"
}
```

_Response (404 - Not Found)_
```
{
  "message": "<message task not found>"
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "internal server error"
}
```

### PATCH /tasks/:id : edit task

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
{
  "title": "<task title>",
  "category": "<task category>"
}
```

_Response (200)_
```
{
  "id": "<task id>",
  "title": "<task title>",
  "category": "<task category>",
  "UserId": "<id creator>",
  "createdAt": "<date given by system>",
  "updatedAt": "<date given by system>"
}
```

_Response (400 - Bad Request)_
```
{
  "message": "<first validation error caught>"
}
```

_Response (401 - Unauthorized)_
```
{
  "message": "<unauthorized message>"
}
```

_Response (404 - Not Found)_
```
{
  "message": "<message task not found>"
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "internal server error"
}
```

---
### DELETE /tasks/:id : delete task

_Request Header_
```
{
  "access_token": "<your access token>"
}
```

_Request Body_
```
not needed
```

_Response (200)_
```
{
  "id": "<deleted task id>",
  "title": "<deleted task title>",
  "category": "<deleted task category>",
  "UserId": "<deleted task creator id>"
  "createdAt": "<deleted task date created>",
  "updatedAt": "<deleted task updateAt>"
}
```

_Response (401 - Unauthorized)_
```
{
  "message": "<unauthorized message>"
}
```

_Response (404 - Not Found)_
```
{
  "message": "<task not found message>"
}
```

_Response (500 - Internal Server Error)_
```
{
  "message": "internal server error"
}
```
