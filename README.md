# Anon-Msgs
## Documentation
|Route|Method|Auth|Description|Query|Body|
|---|---|---|---|---|---|
|/api/auth/login|POST|Public|Login|-|*Username, Password|
|/api/auth/register|POST|Public|Register|-|Name, *Username, Password|
|/api/message|GET|Private|Get messages|Page|-|
|/api/message/[:username]|POST|Public/Private|Send message|-|Body (Message body)|
|/api/message/[:id]|DELETE|Private|Delete message|-|-|
|/api/profile/[:username]|GET|Public/Private|View profile|-|-|
|/api/profile|PUT|Private|Edit profile|-|Name, *Username|
|/api/profile|DELETE|Private|Delete profile|-|-|

***Username is the Handle**

### Error Response
Link the article [Reference](https://www.baeldung.com/rest-api-error-handling-best-practices)
```json
{
  "error": {
    "message": "Missing redirect_uri parameter.",
    "stack": null,
    "type": "OAuthException",
    "code": 191
  }
}
```
**Message**: Actual error message.<br />
**Stack**: The error stack. *(Null value in production)*<br />
**Type**: Error name, e.g. OAuthException<br />
**Code**: Error code, e.g. 191<br />