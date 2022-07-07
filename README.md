# UltraNoteI-Cloud

UltraNote Infinity Cloud Wallet

## Installing Frontend

- cd UltraNoteI-Cloud/cryptwallet
- nvm install 14
- nvm use 14.19.0
- npm install
- npm run build
- mv build /var/www/Cloud
- chown -R www-data:www-data /var/www

Edit .htaccess file and activate https

- nano /var/www/Cloud/.htaccess

## Building Backend

- cd UltraNoteI-Cloud/Backend
- yarn

## Run Backend

- Using pm2: pm2 start ./index.js --name=backend

## Important

-Use yarn for building Admin/Backend-admin
-Use yarn for building Users/Backend

-For everything else use npm i
