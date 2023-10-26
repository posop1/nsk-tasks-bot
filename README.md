# nsk-tasks-bot
Telegram bot for task notifications.

## How start
- Clone repo: ```git clone https://github.com/posop1/nsk-tasks-bot.git``` 
- Install dependencies: ```npm install``` 
- Create .env file, example:
```
NODE_ENV="dev or prod"
APP_URL="your app url"
TOKEN="your bot token"
ACCESSTOKEN="your planka access token"
CHATID="telegram char ID"
INTERVAL="fetch time interval"
```
- For development: ```npm run dev```
- For prod:
```
npm run build
npm run start
```

## How start with Docker Compose
- Create .env file
- Start: ```docker-compose up -d --build```
