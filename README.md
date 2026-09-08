# odin-inventory-app

A simple app that manages an inventory stored in a database.

Todo:
- None! All basic functionality features implemented

optional:
- Make it pretty!
  - header?
- Figure out how to protect destructive actions (like deleting and updating) by making users enter a secret admin password to confirm the action


Behavior:
- database has 3 tables: categories, items, and category_items
  - first 2 are self explanatory, category_items is responsible for keeping track of what item is part of which category and is entirely dependent on the other 2 tables through foreign keys
- deleting a catetgory/item deletes its corresponding relationships with its items/categories in category_items (via ON DELETE CASCADE)

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