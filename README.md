# odin-inventory-app

A simple app that manages an inventory stored in a database.

Todo:
- ~~edit adding items so that if the item already exists in `items`, it just adds it to `category_items`, unless it also already exists there, in which case throw an error~~
- ~~edit adding categories so that if the category already exists in `categories`, it throws an error~~
- ~~delete items (from categories/`category_items`)~~
- ~~remove the extra /category and /item in the links (unneeded, makes certain calls confusing)~~
- ~~figure out behavior for deleting items from `items` (maybe once the item no longer exists in `category_items`, delete it from `items`)~~
- delete categories (and also delete any relationships to items from that category)
- edit adding items to categories so that it first asks for a name and checks if it already exists in `items`, if so then it bypasses all other fields, otherwise ask the other fields
  - technically optional, as the itemForm effectively ignores inputs in non-name fields if the itemname already exists in items, but it would feel nicer

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