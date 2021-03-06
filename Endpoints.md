# Endpoints

## Notes

* if running locally, the port 4100 is exposed for use
* All endpoints are prefixed with `/tsq/`
* Use the header Content-Type, application/json for POST/PUT endpoints

## `/skills/`

### POST

**Route**

```code
/
```

**Example**

```bash
curl -d '{"name":"django", "tags": ["python", "framework"]}' -H "Content-Type: application/json" -X POST http://localhost:4100/tsq/skills/
```

**Additional Notes**

* Use Content-Type of application json
* Required Fields: `name`
* Optional Fields: `tags`, `keys`

`name`: string, the name of the skill entry
`tags`: array of strings, the other tags/skills associated with this skill entry
`keys`: user keys that this skill are registered to (this functionality isn't implemented yet)

### GET

**Route**

```code
/
```

**Example**

```bash
curl -i -H "Accept: application/json" -H "Content-Type: application/json" -X GET http://localhost:4100/tsq/skills/?id=5c7d61a16813350016de866e
```


**Query Params**

* `?id` -- the id field of the skills entry
* `?tags` -- entries inside the tags array.  You can search for an entry with multiple
tags by seperating the tags with a comma and entries that have ALL the tags specified will show in the results

**Additional Notes**

*  When there are no query parameters specified, this will return all the skills entries

### PUT

**Routes**

```code
/updateName/<id>
```
```code
/updateTags/<id>
```

**Examples**

```bash
curl  -H "Content-Type: application/json" -d '{"name":"newValue"}'  -X PUT http://localhost:4100/tsq/skills/updateName/5c7d61a16813350016de866e
curl  -H "Content-Type: application/json" -d '{"tags":["newTag1", "newTag2"]}'  -X PUT http://localhost:4100/tsq/skills/updateTags/5c7d61a16813350016de866e?append=true
```

**Query Params**
* For `/updateName/<id>` there are no query params
* For `/updateTags/<id>` there are `append` and `remove` params
* to add tags to the list, use `?append=true`
* to remove tags, use `?remove=true`
* the system assumes append if no param is set

### DELETE

**Route**

```code
/removeEntry/<id>
```

**Example**

```bash
curl -i -H "Accept: application/json" -H "Content-Type: application/json" -X DELETE http://localhost:4100/tsq/skills/removeEntry/5c7d61a16813350016de866e
```

## `/skills/users/`

### POST

**Route**

```code
/register
```

**Example**

```bash
curl -d '{"skills": [{"name": "python"}, {"name": "java", "familiarityScore": 3}]}' -H "Content-Type: application/json" -X POST http://localhost:4100/tsq/skills/users/register
```

**Fields**

`skills`: skills is an array of skill objects for the entry.
These contain a `name` (string, required) and `familiarityScore` (number, optional, defaults to 0)


### GET

**Routes**

```javascript
/findAll  					// finds all the entries
/findOne/key/<key> 	// finds one entry by entry key field
/findOne/id/<id>  	// finds one entry by entry _id field
```

**Examples**

```bash
# findall
curl -i -H "Accept: application/json" -H "Content-Type: application/json" -X GET http://localhost:4100/tsq/skills/users/findAll/
# findOne by Key
curl -i -H "Accept: application/json" -H "Content-Type: application/json" -X GET http://localhost:4100/tsq/skills/users/findOne/key/<key>
# findOne by Id
curl -i -H "Accept: application/json" -H "Content-Type: application/json" -X GET http://localhost:4100/tsq/skills/users/findOne/id/<id>
```

### PUT

**Routes**

```javascript
/addSkills/key/<key>			// add skills to a user entry
/removeSkills/key/<key>		// remove skills from a user entry
```

**Examples**

```bash
# add skills by key
curl  -H "Content-Type: application/json" -d '{"skills": [{"name": "MEAN", "familiarityScore": 4}]}'  -X PUT http://localhost:4100/tsq/skills/users/addSkills/key/d60c6X62iC2Qu1P7
# remove skills by key
curl  -H "Content-Type: application/json" -d '{"skills": [{"name": "MEAN"}]}'  -X PUT http://localhost:4100/tsq/skills/users/removeSkills/key/d60c6X62iC2Qu1P7
```

### DELETE

**Routes**

```javascript
/remove/key/<key>	// remove an entry from the db by key field
/remove/id/<id>		// remove an entry from the db by id field
```

**Examples**

```bash
# remove an entry by key
curl -i -H "Accept: application/json" -H "Content-Type: application/json" -X DELETE http://localhost:4100/tsq/skills/users/remove/key/<key>
# remove an entry by id
curl -i -H "Accept: application/json" -H "Content-Type: application/json" -X DELETE http://localhost:4100/tsq/skills/users/remove/id/<_id>
```
