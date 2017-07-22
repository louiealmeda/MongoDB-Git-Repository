# MongoDB-Git-Repository
Seed repository for versioning mongodb

Source codes are versioned for the team to collaborate easily and safely. Databases needs to be given the same collaboration procedure as business logic has been increasingly dependent on data. A lot of teams dump, restore and merge their versions of databases manually. Which leads to changes not being applied and causes unexpected behaviours.

### Available Features
- [x] Dump MongoDB collections as a readable files
- [x] Restore MongoDB collections from files
- [ ] Create collection groups to specify which collections should be dump or restored 
- [ ] Automatically dump collections on `stat` of git 
- [ ] Automatically dump collections on before `pull` of git to check for conflicts
- [ ] Automatically restore collections after pull if there are no conflicts


## How to use
Since automatic dump and restore is not yet supported, you can run the commands yourself

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
