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
	"_id": 			ObjectId("000000000000000000000001"),
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
	"version":		"0.0.1",
	"projectId":	"xxx",
	"serverDate": 	ISODate()
});