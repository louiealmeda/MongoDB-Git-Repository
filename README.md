# MongoDB-Git-Repository
Seed repository for versioning mongodb

Source codes are versioned for the team to collaborate easily and safely. Databases needs to be given the same collaboration procedure as business logic has been increasingly dependent on data. A lot of teams dump, restore and merge their versions of databases manually. Which leads to changes not being applied and causes unexpected behaviours.

### Features
- [x] Dump MongoDB collections as a readable files
- [x] Restore MongoDB collections from files
- [ ] Create collection groups to specify which collections should be dump or restored 
- [ ] Automatically dump collections on `stat` of git 
- [ ] Automatically dump collections on before `pull` of git to check for conflicts
- [ ] Automatically restore collections after pull if there are no conflicts

## Install

```shell
npm install mongodb-git-repository -g
```

## How to use
Since automatic dump and restore is not yet supported, you can run the commands yourself.
> make sure you `run as administrator` (windows) or with `sudo` (unix)

### dump collections
```shell
node dump
```

### restore collections
```shell
node restore
```

### specifying collections to dump/restore

```shell
use --group <name>
```
you can specify groups in the `config.js`

if group is not specified, it will use what is indicated in `collections` 
## Configuration

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
