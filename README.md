
# ass2-module-pattern
For the /api/users/create-user or to update on  /api/users/:userId use this 
format .Make sure you are wraping objects in the "user" 

```
{
	"user": {
        "userId": number,
        "username": string,
         ...
    }
	
} 	
```



## Installation

Create .env in the ./ directory  and insert variables there 

```
PORT=
DATABASE_URL=
B_Salt_round=
```

To run the src file as development enviornment : 

```bash
npm run start:dev
```
To run the dist file as production enviornment : 


```bash
npm run start:prod
```
    
Live site : https://ass2-module-pattern.vercel.app/