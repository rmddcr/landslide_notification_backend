
## Landslide-Notification-Forum


##Things you need to install to run this code on your server
1. Nodejs version 6.9.4
2. npm version 3.10.10
3. mysql
4. Install package dependencies using npm install 

## How to deploy this code on your system
To deploy the code on your system you need to have a database with the schema present in hcl.sql
You can download this file on your system and then after moving to the directory run the command 
```bash
 mysql -u mysql_user -p DATABASE < hcl.sql
 ```
 DATABASE and mysql_user are just placeholders for the actual names
 Once you have the database on your system all you need to do is connect it with the server you run. For that you would have to change
 the db.js file.
 in the dbconf you need to add 
 ```javascript
 dbconf{
 host:'localhost',
 user:'your_mysql_user',//in my case it was root
 password: 'your_password_for_mysql',
 database:'hcl'
 }
 ```
 and you are all set
 run the command node server.js on your terminal from the server.js directory
 
 
 
