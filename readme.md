## How to run project
- Setup your database config in server/.env file and start your sql server

- Go to the folder named server
> cd realtime-chat-laravel-vue-websocket-master/server

- Start composer install
> composer install

- Start artisan server
> php artisan serve

- Make a migration
> php artisan migrate

- Start websocket server
> php artisan websocket:serve

- Go to the folder named client
> cd realtime-chat-laravel-vue-websocket-master/client

- Start npm install
> npm install

- Start npm
> npm run dev

### Go to the http://localhost:3000/

For testing register at least 2 users