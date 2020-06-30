db.tblProjects.insert({
	"bitid": {
		"auth": {
			"users": [
				{
					"role": 	5,
					"email": 	"xxx@xxx.co.za"
				}
			]
		}
	},
	"author": {
		"name": {
			"last": 	"",
			"first": 	""
		},
		"email": 	"",
		"number": 	"",
		"company": 	""
	},
	"_id": 			ObjectId("000000000000000000000001"),
	"icon":			"xxx",
	"serverDate": 	ISODate(),
	"description":	"xxx"
});

db.tblProjects.createIndex({
    "description": 1
}, {
    "unique": true
});

db.tblDocumentation.insert({
	"routes": [
		{
			"title": 		"Clients",
			"routeId": 		"clients",
			"description": 	"",
			"endpoints": [
				{
					"request": {
						"header": {
							"email": "xxx@xxx.co.za",
							"appId": "xxx"
						}
					},
					"response": [
						{
							"clientId": 	"xxx",
							"description": 	"xxx"
						}
					],
					"url": 			"https://auth.bitid.co.za/auth/clients/list",
					"title": 		"list",
					"method": 		"POST",
					"endpointId": 	"list",
					"description": 	""
				}
			]
		}
	],
	"_id": 			ObjectId("000000000000000000000001"),
	"date": 		ISODate(),
	"version":		"0.0.1",
	"projectId":	ObjectId("000000000000000000000001"),
	"serverDate": 	ISODate()
});

db.tblDocumentation.createIndex({
    "version":		1,
    "projectId":	1
}, {
    "unique": true
});