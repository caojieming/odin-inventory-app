# odin-inventory-app

A simple app that manages an inventory stored in a database.

Todo:
- ~~edit adding items so that if the item already exists in `items`, it just adds it to `category_items`, unless it also already exists there, in which case throw an error~~
- ~~edit adding categories so that if the category already exists in `categories`, it throws an error~~
- delete items (from categories/`category_items`)
- figure out behavior for deleting items from `items` (maybe once the item no longer exists in `category_items`, delete it from `items`)
- delete categories (and also delete any relationships to items from that category)

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