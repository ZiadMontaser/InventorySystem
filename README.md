## The Inventory Managment System app

This application allow users to manage there inventory and keep track of available items

## Requirements

* Node
* Git
* MongoDB Key

## Environment Variables
exmaple:
```
PASSWORD_HASH_SALT = 1
DATABASE_URI= <MONGO_DB_API_KEY>
```
  
## Common setup

Clone the repo and install the dependencies.

```bash
git clone https://github.com/contentful/the-example-app.nodejs.git
cd the-example-app.nodejs
```

```bash
cd server
npm install
cd ../client
npm install
cd ..
```

## Steps for building
Run the following commands in the root direcotory of the project
```bash
cd client
npm run build
```

## Steps for running

To start the express server, run the following

### Development:
```bash
cd server
npm run dev
```
### Deployment
```bash
cd server
npm run start
```

Open [http://localhost:3000](http://localhost:3000) and take a look around.


## Steps for regestering a new user with http endpoint (recommended)

Step 1: Make an http POST request

Step 2: Populate request body with following data
```json
{
  "username" : <username>,
  "password": <password>,
  "isAdmin": <true/ flase>
}
```
```
if done correctly you should get a 201 respone
```
