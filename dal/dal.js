var Q       	= require('q');
var db			= require('../db/mongo');
var ObjectId 	= require('mongodb').ObjectId;

var module = function() {
	var dalProjects = {
		errorResponse: {
			"error": {
				"code": 	401,
				"message": 	"Invalid Credentials",
				"errors": [{
					"reason": 		"General Error",
					"message": 		"Invalid Credentials",
					"location": 	"dalProjects",
					"locationType": "header"
				}]
			},
			"hiddenErrors": []
		},

		add: (args) => {
			var deferred = Q.defer();

			var params = {
				'bitid': {
					'auth': {
						'users': 			args.req.body.users,
						'organizationOnly': args.req.body.organizationOnly || 0
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
				'icon': 		args.req.body.icon,
				'serverDate': 	new Date(),
				'description': 	args.req.body.description
			};

			if (typeof(args.req.body.author) == "object") {
				if (typeof(args.req.body.author.name) == "object") {
					if (typeof(args.req.body.author.name.last) != "undefined") {
						params.author.name.last = args.req.body.author.name.last;
					};
					if (typeof(args.req.body.author.name.first) != "undefined") {
						params.author.name.first = args.req.body.author.name.first;
					};
				};
				if (typeof(args.req.body.author.email) != "undefined") {
					params.author.email = args.req.body.author.email;
				};
				if (typeof(args.req.body.author.number) != "undefined") {
					params.author.number = args.req.body.author.number;
				};
				if (typeof(args.req.body.author.company) != "undefined") {
					params.author.company = args.req.body.author.company;
				};
			};

			db.call({
				'params': 		params,
				'operation': 	'insert',
				'collection': 	'tblProjects'
			})
			.then(result => {
				args.result = result[0];
				deferred.resolve(args);
			}, err => {
				dalProjects.errorResponse.error.errors[0].code 		= err.code 			|| dalProjects.errorResponse.error.errors[0].code;
				dalProjects.errorResponse.error.errors[0].reason 	= err.description 	|| 'Add Project Error';
				deferred.reject(dalProjects.errorResponse);
			});

			return deferred.promise;
		},

		get: (args) => {
			var deferred = Q.defer();

			var params = {
				'_id': ObjectId(args.req.body.projectId)
			};

			var filter = {};
			if (typeof(args.req.body.filter) != "undefined") {
				filter._id = 0;
				args.req.body.filter.map(f => {
					if (f == 'projectId') {
						filter['_id'] = 1;
					} else if (f == 'role' || f == 'users') {
						filter['bitid.auth.users'] = 1;
					} else if (f == 'organizationOnly') {
						filter['bitid.auth.organizationOnly'] = 1;
					} else {
						filter[f] = 1;
					};
				});
			};

			db.call({
				'params': 		params,
				'filter': 		filter,
				'operation': 	'find',
				'collection': 	'tblProjects'
			})
			.then(result => {
				args.result 	= result[0];
				args.project 	= result[0];
				deferred.resolve(args);
			}, err => {
				dalProjects.errorResponse.error.errors[0].code 		= err.code 			|| dalProjects.errorResponse.error.errors[0].code;
				dalProjects.errorResponse.error.errors[0].reason 	= err.description 	|| 'Get Project Error';
				deferred.reject(dalProjects.errorResponse);
			});

			return deferred.promise;
		},

		list: (args) => {
			var deferred = Q.defer();

			var params = {};

			if (typeof(args.req.body.projectId) != "undefined") {
				if (Array.isArray(args.req.body.projectId) && args.req.body.projectId.length > 0) {
					params._id = {
						$in: args.req.body.projectId.map(id => ObjectId(id))
					};
				} else if (typeof(args.req.body.projectId) == "string" && args.req.body.projectId.length == 24) {
					params._id = ObjectId(args.req.body.projectId);
				};
			};

			var filter = {};
			if (typeof(args.req.body.filter) != "undefined") {
				filter._id = 0;
				args.req.body.filter.map(f => {
					if (f == 'projectId') {
						filter['_id'] = 1;
					} else if (f == 'role' || f == 'users') {
						filter['bitid.auth.users'] = 1;
					} else if (f == 'organizationOnly') {
						filter['bitid.auth.organizationOnly'] = 1;
					} else {
						filter[f] = 1;
					};
				});
			};

			db.call({
				'filter':		filter,
				'params': 		params,
				'operation': 	'find',
				'collection': 	'tblProjects'
			})
			.then(result => {
				args.result = result;
				deferred.resolve(args);
			}, err => {
				dalProjects.errorResponse.error.errors[0].code 		= err.code 			|| dalProjects.errorResponse.error.errors[0].code;
				dalProjects.errorResponse.error.errors[0].reason 	= err.description 	|| 'List Projects Error';
				deferred.reject(dalProjects.errorResponse);
			});

			return deferred.promise;
		},

		share: (args) => {
			var deferred = Q.defer();

			var params = {
			    "bitid.auth.users.email": {
			    	$ne: args.req.body.email
		    	},
			    "bitid.auth.users": {
			        $elemMatch: {
			            "role": {
			                $gte: 4
			            },
			            "email": args.req.body.header.email
			        }
			    },
			    "_id": ObjectId(args.req.body.projectId)
			};
			var update = {
				$set: {
					"serverDate": new Date()
				},
				$push: {
					"bitid.auth.users": {
				        "role": 	args.req.body.role,
				        "email": 	args.req.body.email
				    }
				}
			};

			db.call({
				'params':		params,
				'update': 		update,
				'operation': 	'update',
				'collection': 	'tblProjects'
			})
			.then(result => {
				args.result = result;
				deferred.resolve(args);
			}, err => {
				dalProjects.errorResponse.error.errors[0].code   = err.code 		|| dalProjects.errorResponse.error.errors[0].code;
				dalProjects.errorResponse.error.errors[0].reason = err.description 	|| 'Share User To Document Version Error';
				deferred.reject(dalProjects.errorResponse);
			});

			return deferred.promise;
		},

		update: (args) => {
			var deferred = Q.defer();

			var params = {
				"bitid.auth.users": {
			        $elemMatch: {
			            "role": {
			                $gte: 2
			            },
			            "email": args.req.body.header.email
			        }
			    },
				"_id": ObjectId(args.req.body.projectId)
			};
			var update = {
				$set: {
					"serverDate": new Date()
				}
			};
			if (typeof(args.req.body.author) == "object") {
				if (typeof(args.req.body.author.name) == "object") {
					if (typeof(args.req.body.author.name.last) != "undefined") {
						update.$set['author.name.last'] = args.req.body.author.name.last;
					};
					if (typeof(args.req.body.author.name.first) != "undefined") {
						update.$set['author.name.first'] = args.req.body.author.name.first;
					};
				};
				if (typeof(args.req.body.author.email) != "undefined") {
					update.$set['author.email'] = args.req.body.author.email;
				};
				if (typeof(args.req.body.author.number) != "undefined") {
					update.$set['author.number'] = args.req.body.author.number;
				};
				if (typeof(args.req.body.author.company) != "undefined") {
					update.$set['author.company'] = args.req.body.author.company;
				};
			};
			if (typeof(args.req.body.icon) != "undefined") {
				update.$set['icon'] = args.req.body.icon;
			};
			if (typeof(args.req.body.description) != "undefined") {
				update.$set['description'] = args.req.body.description;
			};
			if (typeof(args.req.body.organizationOnly) != "undefined") {
				update.$set["bitid.auth.organizationOnly"] = args.req.body.organizationOnly;
			};

			db.call({
				'params':		params,
				'update': 		update,
				'operation': 	'update',
				'collection': 	'tblProjects'
			})
			.then(result => {
				args.result = result;
				deferred.resolve(args);
			}, err => {
				dalProjects.errorResponse.error.errors[0].code   = err.code 		|| dalProjects.errorResponse.error.errors[0].code;
				dalProjects.errorResponse.error.errors[0].reason = err.description 	|| 'Update Document Version Error';
				deferred.reject(dalProjects.errorResponse);
			});

			return deferred.promise;
		},

		delete: (args) => {
			var deferred = Q.defer();

			var params = {
				"bitid.auth.users": {
			        $elemMatch: {
			            "role": 	5,
			            "email": 	args.req.body.header.email
			        }
			    },
				"_id": ObjectId(args.req.body.projectId)
			};

			db.call({
				'params':		params,
				'operation': 	'remove',
				'collection': 	'tblProjects'
			})
			.then(result => {
				var deferred = Q.defer();

				args.result = result;

				var params 	= {
					"projectId": ObjectId(args.req.body.projectId)
				};

				deferred.resolve({
					'params':				params,
					'operation': 			'remove',
					'collection': 			'tblDocumnentation',
					'allowNoRecordsFound': 	true
				});

				return deferred.promise;
			}, null)
			.then(db.call, null)
			.then(result => {
				deferred.resolve(args);
			}, err => {
				dalProjects.errorResponse.error.errors[0].code   = err.code 		|| dalProjects.errorResponse.error.errors[0].code;
				dalProjects.errorResponse.error.errors[0].reason = err.description 	|| 'Delete Document Version Error';
				deferred.reject(dalProjects.errorResponse);
			});

			return deferred.promise;
		},

		unsubscribe: (args) => {
			var deferred = Q.defer();

			var params = {
				"bitid.auth.users": {
			        $elemMatch: {
			            "role": {
			                $gte: 4
			            },
			            "email": args.req.body.header.email
			        }
			    },
			    "_id": ObjectId(args.req.body.projectId)
			};
			var update = {
				$set: {
					"serverDate": new Date()
				},
				$pull: {
					"bitid.auth.users": {
				        "email": args.req.body.email
				    }
				}
			};

			db.call({
				'params':		params,
				'update':		update,
				'operation': 	'update',
				'collection': 	'tblProjects'
			})
			.then(result => {
				args.result = result;
				deferred.resolve(args);
			}, err => {
				dalProjects.errorResponse.error.errors[0].code   = err.code 		|| dalProjects.errorResponse.error.errors[0].code;
				dalProjects.errorResponse.error.errors[0].reason = err.description 	|| 'Unsubscribe User From A Document Version Error';
				deferred.reject(dalProjects.errorResponse);
			});

			return deferred.promise;
		},

		updatesubscriber: (args) => {
			var deferred = Q.defer();
			
			var params = {
				"bitid.auth.users": {
			        $elemMatch: {
			            "role": {
			                $gte: 4
			            },    
			            "email": args.req.body.header.email
			        }
			    },
				"_id": ObjectId(args.req.body.projectId)	
			};
			
			db.call({
				'params':		params,
				'operation': 	'find',
				'collection': 	'tblProjects'
			})
			.then(result => {
				var deferred = Q.defer();

				var params = {
					"bitid.auth.users": {
				        $elemMatch: {
				            "email": args.req.body.email    
				        }
				    },
					"_id": ObjectId(args.req.body.projectId)	
				};
				var update = {
					$set: {
			            "bitid.auth.users.$.role": args.req.body.role
					}
				};

				deferred.resolve({
					'params':		params,
					'update':		update,
					'operation': 	'update',
					'collection': 	'tblProjects'
				});

				return deferred.promise;
			}, null)
			.then(db.call, null)
			.then(result => {
				args.result = result;
				deferred.resolve(args);
			}, err => {
				dalProjects.errorResponse.error.errors[0].code 	= err.code 			|| dalProjects.errorResponse.error.errors[0].code;
				dalProjects.errorResponse.error.errors[0].reason = err.description 	|| 'Update Document Version Subscriber Error';
				deferred.reject(dalProjects.errorResponse);
			});

			return deferred.promise;
		}
	};

	var dalDocumentation = {
		errorResponse: {
			"error": {
				"code": 	401,
				"message": 	"Invalid Credentials",
				"errors": [{
					"reason": 		"General Error",
					"message": 		"Invalid Credentials",
					"location": 	"dalDocumentation",
					"locationType": "header"
				}]
			},
			"hiddenErrors": []
		},

		add: (args) => {
			var deferred = Q.defer();

			var params = {
				"bitid.auth.users": {
			        $elemMatch: {
			            "role": {
			                $gte: 2
			            },
			            "email": args.req.body.header.email
			        }
			    },
			    "_id": ObjectId(args.req.body.projectId)
			};

			db.call({
				'params': 		params,
				'operation': 	'find',
				'collection': 	'tblProjects'
			})
			.then(result => {
				var deferred = Q.defer();

				var params = {
					"date":			args.req.body.date,
					"routes":		args.req.body.routes || [],
					"version":		args.req.body.version,
					"projectId":	ObjectId(args.req.body.projectId),
					"serverDate":	new Date()
				};

				deferred.resolve({
					'params': 		params,
					'operation': 	'insert',
					'collection': 	'tblDocumentation'
				});

				return deferred.promise;
			}, null)
			.then(db.call, null)
			.then(result => {
				args.result = result[0];
				deferred.resolve(args);
			}, err => {
				dalProjects.errorResponse.error.errors[0].code 		= err.code 			|| dalProjects.errorResponse.error.errors[0].code;
				dalProjects.errorResponse.error.errors[0].reason 	= err.description 	|| 'Add Documentation Error';
				deferred.reject(dalProjects.errorResponse);
			});

			return deferred.promise;
		},

		get: (args) => {
			var deferred = Q.defer();

			var params = [
				{
					$lookup: {
						"as": 			"project",
						"from": 		"tblProjects",
						"localField": 	"projectId",
						"foreignField": "_id"
					}
				},
				{
					$unwind: "$project"
				},
				{
					$match: {}
				}
			];

			if (typeof(args.req.body.projectId) != "undefined") {
				params[2].$match['projectId'] = ObjectId(args.req.body.projectId);
			};
			if (typeof(args.req.body.documentId) != "undefined") {
				params[2].$match['_id'] = ObjectId(args.req.body.documentId);
			};
			if (typeof(args.req.body.description) != "undefined") {
				params[2].$match['project.description'] = args.req.body.description;
			};

			if (typeof(args.req.body.filter) != "undefined") {
				var filter = {
					'_id': 0
				};
				args.req.body.filter.map(f => {
					if (f == 'documentId') {
						filter['_id'] = 1;
					} else if (f == 'project') {
						filter['project'] = '$project';
					} else {
						filter[f] = 1;
					};
				});
				params.push({
					$project: filter
				});
			};
			
			db.call({
				'params': 		params,
				'operation': 	'aggregate',
				'collection': 	'tblDocumentation'
			})
			.then(result => {
				args.result = result[0];
				deferred.resolve(args);
			}, err => {
				dalDocumentation.errorResponse.error.errors[0].code 	= err.code 			|| dalDocumentation.errorResponse.error.errors[0].code;
				dalDocumentation.errorResponse.error.errors[0].reason 	= err.description 	|| 'Get Document Error';
				deferred.reject(dalDocumentation.errorResponse);
			});

			return deferred.promise;
		},

		list: (args) => {
			var deferred = Q.defer();

			var params = [
				{
					$lookup: {
						"as": 			"project",
						"from": 		"tblProjects",
						"localField": 	"projectId",
						"foreignField": "_id"
					}
				},
				{
					$unwind: "$project"
				},
				{
					$match: {}
				}
			];

			if (typeof(args.req.body.projectId) != "undefined") {
				if (Array.isArray(args.req.body.projectId) && args.req.body.projectId.length > 0) {
					params[2].$match['projectId'] = {
						$in: args.req.body.projectId.map(id => ObjectId(id))
					};
				} else if (typeof(args.req.body.projectId) == "string" && args.req.body.projectId.length == 24) {
					params[2].$match['projectId'] = ObjectId(args.req.body.projectId);
				};
			};
			if (typeof(args.req.body.documentId) != "undefined") {
				if (Array.isArray(args.req.body.documentId) && args.req.body.documentId.length > 0) {
					params[2].$match['_id'] = {
						$in: args.req.body.documentId.map(id => ObjectId(id))
					};
				} else if (typeof(args.req.body.documentId) == "string" && args.req.body.documentId.length == 24) {
					params[2].$match['_id'] = ObjectId(args.req.body.documentId);
				};
			};
			if (typeof(args.req.body.description) != "undefined") {
				if (Array.isArray(args.req.body.description) && args.req.body.description.length > 0) {
					params[2].$match['project.description'] = {
						$in: args.req.body.description
					};
				} else if (typeof(args.req.body.description) == "string") {
					params[2].$match['project.description'] = args.req.body.description;
				};
			};

			if (typeof(args.req.body.filter) != "undefined") {
				var filter = {
					'_id': 0
				};
				args.req.body.filter.map(f => {
					if (f == 'documentId') {
						filter['_id'] = 1;
					} else if (f == 'project') {
						filter['project'] = '$project';
					} else {
						filter[f] = 1;
					};
				});
				params.push({
					$project: filter
				});
			};
			
			db.call({
				'params': 		params,
				'operation': 	'aggregate',
				'collection': 	'tblDocumentation'
			})
			.then(result => {
				args.result = result;
				deferred.resolve(args);
			}, err => {
				dalDocumentation.errorResponse.error.errors[0].code 	= err.code 			|| dalDocumentation.errorResponse.error.errors[0].code;
				dalDocumentation.errorResponse.error.errors[0].reason 	= err.description 	|| 'Get Document Error';
				deferred.reject(dalDocumentation.errorResponse);
			});

			return deferred.promise;
		},

		update: (args) => {
			var deferred = Q.defer();

			var params = {
				"bitid.auth.users": {
			        $elemMatch: {
			            "role": {
			                $gte: 2
			            },
			            "email": args.req.body.header.email
			        }
			    },
			    "_id": ObjectId(args.req.body.projectId)
			};

			db.call({
				'params': 		params,
				'operation': 	'find',
				'collection': 	'tblProjects'
			})
			.then(result => {
				var deferred = Q.defer();

				var params = {
					"_id":			ObjectId(args.req.body.documentId),
					"projectId":	ObjectId(args.req.body.projectId)
				};
				var update = {
					$set: {
						'serverDate': new Date()
					}
				};
				if (Array.isArray(args.req.body.routes)) {
					update.$set['routes'] = args.req.body.routes;
				};
				if (typeof(args.req.body.date) != "undefined") {
					update.$set['date'] = args.req.body.date;
				};
				if (typeof(args.req.body.version) != "undefined") {
					update.$set['version'] = args.req.body.version;
				};

				deferred.resolve({
					'params': 		params,
					'update': 		update,
					'operation': 	'update',
					'collection': 	'tblDocumentation'
				});

				return deferred.promise;
			}, null)
			.then(db.call, null)
			.then(result => {
				args.result = result;
				deferred.resolve(args);
			}, err => {
				dalProjects.errorResponse.error.errors[0].code 		= err.code 			|| dalProjects.errorResponse.error.errors[0].code;
				dalProjects.errorResponse.error.errors[0].reason 	= err.description 	|| 'Update Document Error';
				deferred.reject(dalProjects.errorResponse);
			});

			return deferred.promise;
		},

		delete: (args) => {
			var deferred = Q.defer();

			var params = {
				"bitid.auth.users": {
			        $elemMatch: {
			            "role": {
			                $gte: 2
			            },
			            "email": args.req.body.header.email
			        }
			    },
			    "_id": ObjectId(args.req.body.projectId)
			};

			db.call({
				'params': 		params,
				'operation': 	'find',
				'collection': 	'tblProjects'
			})
			.then(result => {
				var deferred = Q.defer();

				var params = {
					"_id":			ObjectId(args.req.body.documentId),
					"projectId":	ObjectId(args.req.body.projectId)
				};

				deferred.resolve({
					'params': 		params,
					'operation': 	'remove',
					'collection': 	'tblDocumentation'
				});

				return deferred.promise;
			}, null)
			.then(db.call, null)
			.then(result => {
				args.result = result;
				deferred.resolve(args);
			}, err => {
				dalProjects.errorResponse.error.errors[0].code 		= err.code 			|| dalProjects.errorResponse.error.errors[0].code;
				dalProjects.errorResponse.error.errors[0].reason 	= err.description 	|| 'Delete Document Error';
				deferred.reject(dalProjects.errorResponse);
			});

			return deferred.promise;
		}
	};

	return {
		"projects": 		dalProjects,
		"documentation":	dalDocumentation
	};
};

exports.module = module;