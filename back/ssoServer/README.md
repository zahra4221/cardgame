# Welcome to Card game (Sso Server part)
This document will give you all needed APIs for manage Profiles and login.

## Starting project

```
npm i
mpn run start:dev
```

## APIs
### Login
* *[Post]* **/api/login** => Log a profile by login/password *(Body : LoginModel)*

### Profiles
* *[Get]* **/api/profiles** => Give all profiles *(Return : ProfileModel[])*
* *[Get]* **/api/profiles/:id** => Give profile from his id *(Return : ProfileModel[])*
* *[Put]* **/api/profiles** => Add a new profile *(Body : Partial\<ProfileModel>)*

### Token
* *[Get]* **/api/token/:id** => Refresh a token from profile id *(Return : TokenModel)*


## Models
### LoginModel
```
LoginModel {
    login: string;
    password: string;
}
```

### ProfileModel
```
ProfileModel {
    id: string | undefined;
    name: string;
    login: string;
    password: string;
}
```

### TokenModel
```
TokenModel {
    token: string;
}
```

## How to generate certificate for signing/verify JwtToken :

> ssh-keygen -t rsa -b 4096 -m PEM -f jwtRS256.key
> // Don't add passphrase
> openssl rsa -in jwtRS256.key -pubout -outform PEM -out jwtRS256.key.pub
> cat jwtRS256.key
> cat jwtRS256.key.pub
