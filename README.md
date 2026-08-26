# odin-inventory-app

A simple app that manages an inventory stored in a database.

Todo:
- add a way to edit existing items
- add a list of categories (links included) an item is a part of to the itemDetails page

optional:
- Make it pretty!
- Figure out how to protect destructive actions (like deleting and updating) by making users enter a secret admin password to confirm the action


Behavior:
- to fill out eventually

## nodejs-express-template
Repository Template for NodeJS + Express.

Run `npm install` to install all packages/dev dependencies.<br>
Run `npm outdated` to check if any packages are outdated (can generally ignore yellow packages: current version is the wanted version, but not the latest version).<br>
Run `npm update` to update outdated packages.

## npm scripts included:
`npm run app`<br>
The equivalent of `node --watch app.js`.<br>
Opens an Express server for viewing changes in real time without needing to build.<br>
Default server link: http://localhost:8080/

## Packages included
- express
- ejs
- express-validator
- pg