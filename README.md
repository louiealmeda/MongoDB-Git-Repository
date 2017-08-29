# mongovc 
#### (mongo Version Control)
node module for mongodb collection version control support

Source codes are versioned for the team to collaborate easily and safely. Databases needs to be given the same collaboration procedure as business logic has been increasingly dependent on data. A lot of teams dump, restore and merge their versions of databases manually. Which leads to changes not being applied and causes unexpected behaviours.
 
mongovc aims to version mongodb collections properly so the need to copy-paste dumps can be obsoleted. 

### Features
- [x] Dump MongoDB collections as a readable files
- [x] Restore MongoDB collections from files
- [x] Create collection groups to specify which collections should be dump or restored 
- [ ] Specify filter per collection
- [ ] Automatically dump collections on `stat` of git 
- [ ] Automatically dump collections on before `pull` of git to check for conflicts
- [ ] Automatically restore collections after pull if there are no conflicts
- [ ] Connect with Authentication

## Install

> npm install mongovc -g

if this is a new project, you should `--init`  
> mongovc --init

## How to use
Since automatic dump and restore is not yet supported, you can run the commands yourself for now.

### Help
show everything you can do with mongovc
```
mongovc --help
```

### dump collections
```shell
mongovc --dump
```

### restore collections
```shell
mongovc --restore
```

### specifying collections to dump/restore

```shell
mongovc --restore <group name>
mongovc --dump <group name>
```
you can specify groups in the `mongovc.config.js`

if group is not specified, it will use what is indicated in `collections` 

### initialize dev configuration
```shell
mongovc --init-dev
```

## Configuration
> mongovc.config.js
```javascript
{
  "database": "<databaseName>",
  "host": "localhost", //optional, default
  "port": "27017", //optional, default
  "collections": ["Accounts", "Stores"],
  "groups": {
    "all": [],
    "structure": [],
    "generated": []
  }
}
```

## Dev Configuration
> dev.mongovc.config.js

Same format with the main configuration. This file will override the main config's field that are specified.
All fields in this file are optional.
This is `.gitignored` so everyone can specify their own `database` and other configurations without conflicting with others.
[Can be automatically generated](https://github.com/louiealmeda/mongovc/blob/master/README.md#initialize-dev-configuration)

## License

Copyright (c) 2017 Mark Louie Almeda

Permission to use, copy, modify, and distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
