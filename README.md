# Tech_Blog

The Tech Blog application is intended for registered users to blog about tech and contribute comments to other blogs. Unregistered users will be able to see blogs but cannot contribute unless they create an account.

## Configuration and Installation

Install node.js and initialize npm at the root of the folder.
Install all the dependencies in the package.json file. This will include the following:
express
express-session
express-handlebars
dotenv
mysql2
sequelize
bcrypt
connect-session-sequelize
eslint
save-dev

The application uses an MVC software design.

## Miscellaneous

New users must provide a username and email address that is not already registed in the database. The password must be at least eight characters long. Passwords are hashed. The database is named techblog_db; replace with another name if that db name already exists on your server.

## Issues

An MVP calls for a dashboard that displays any blogs a user has already created, which is not yet enabled.
