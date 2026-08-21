# odin-inventory-app

A simple app that manages an inventory stored in a database.

Todo:
- implement deleting items from categories (their relationship, not the item itself)
- add a way to edit existing categories
- add a way to edit existing items
- add a way to create new items from a category page


Behavior:
- deleting an item only deletes it from `category_items`
  - if you delete the last entry with a certain item_name in `category_items`, then it also deletes the item from `items`
- deleting a category deletes it from `categories`, and deletes all entries in `category_items` that include that category_name via ON DELETE CASCADE (items that were in that category will still exist in other categories)
  - if deleting a category removes the last category an item is connected to in `category_items`, then the item is deleted from `items` as well

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