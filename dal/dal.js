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
					"locaction": 	"dalProjects",
					"locationType": "header"
				}]
			},
			"hiddenErrors": []
		},

		add: (args) => {
			var deferred = Q.defer();

			dalProjects.dbArgs[2] = [];
			dalProjects.dbArgs[1] = 'insert';
			dalProjects.dbArgs[2].push('tblProjects');
			dalProjects.dbArgs[2].push({
				'bitid': {
					'auth': {
						'users': 			args.req.body.users,
						'organizationOnly': args.req.body.organizationOnly || 0
					}
				},
				'icon': 		args.req.body.icon,
				'type': 		args.req.body.type,
				'title': 		args.req.body.title,
				'routes': 		args.req.body.routes 	|| [],
				'version': 		args.req.body.version 	|| '1.0.0',
				'serverDate': 	new Date(),
				'description': 	args.req.body.description
			});

			var myDB = new db.module();
			myDB.dbCall(dalProjects.dbArgs)
			.then(result => {
				args.result = result[0];
				deferred.resolve(args);
			}, err => {
				dalProjects.errorResponse.error.errors[0].code 		= err.code 			|| dalProjects.errorResponse.error.errors[0].code;
				dalProjects.errorResponse.error.errors[0].reason 	= err.description 	|| 'Get Project Error';
				dalProjects.errorResponse.hiddenErrors.push(err.error);
				deferred.reject(dalProjects.errorResponse);
			});

			return deferred.promise;
		},

		get: (args) => {
			var deferred = Q.defer();

			var params = {};

			if (typeof(args.req.body.project) != "undefined") {
				params.description = args.req.body.project;
			};
			if (typeof(args.req.body.versionId) != "undefined") {
				params._id = ObjectId(args.req.body.versionId);
			};
			if (typeof(args.req.body.projectId) != "undefined") {
				params._id = ObjectId(args.req.body.projectId);
			};

			db.call({
				'params': 		params,
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
				dalProjects.errorResponse.hiddenErrors.push(err.error);
				deferred.reject(dalProjects.errorResponse);
			});

			return deferred.promise;
		},

		list: (args) => {
			var deferred = Q.defer();

			var params = {};

			if (typeof(args.req.body.project) != "undefined") {
				params.description = args.req.body.project;
			};
			if (typeof(args.req.body.projectId) != "undefined") {
				params._id = ObjectId(args.req.body.projectId);
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
				dalProjects.errorResponse.hiddenErrors.push(err.error);
				deferred.reject(dalProjects.errorResponse);
			});

			return deferred.promise;
		},

		share: (args) => {
			var deferred = Q.defer();

			dalProjects.dbArgs[2] = [];
			dalProjects.dbArgs[1] = 'update';
			dalProjects.dbArgs[2].push('tblDocumentation');
			dalProjects.dbArgs[2].push({
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
			    "_id": ObjectId(args.req.body.versionId)
			});
			dalProjects.dbArgs[2].push({
				$set: {
					"serverDate": 	new Date()
				},
				$push: {
					"bitid.auth.users": {
				        "role": 	args.req.body.role,
				        "email": 	args.req.body.email
				    }
				}
			});

			var myDB = new db.module();
			myDB.dbCall(dalProjects.dbArgs)
			.then(result => {
				args.result = result.result;
				deferred.resolve(args);
			}, err => {
				dalProjects.errorResponse.error.errors[0].code   = err.code 		|| dalProjects.errorResponse.error.errors[0].code;
				dalProjects.errorResponse.error.errors[0].reason = err.description 	|| 'Share User To Document Version Error';
				dalProjects.errorResponse.hiddenErrors.push(err.error);
				deferred.reject(dalProjects.errorResponse);
			});

			return deferred.promise;
		},

		update: (args) => {
			var deferred = Q.defer();

			var params = {
				"serverDate": new Date()
			};
			if (typeof(args.req.body.icon) != "undefined") {
				params.icon = args.req.body.icon;
			};
			if (typeof(args.req.body.type) != "undefined") {
				params.type = args.req.body.type;
			};
			if (typeof(args.req.body.title) != "undefined") {
				params.title = args.req.body.title;
			};
			if (typeof(args.req.body.routes) != "undefined") {
				params.routes = args.req.body.routes;
			};
			if (typeof(args.req.body.version) != "undefined") {
				params.version = args.req.body.version;
			};
			if (typeof(args.req.body.projectId) != "undefined") {
				params.projectId = args.req.body.projectId;
			};
			if (typeof(args.req.body.description) != "undefined") {
				params.description = args.req.body.description;
			};
			if (typeof(args.req.body.organizationOnly) != "undefined") {
				params["bitid.auth.organizationOnly"] = args.req.body.organizationOnly;
			};

			dalProjects.dbArgs[2] = [];
			dalProjects.dbArgs[1] = 'update';
			dalProjects.dbArgs[2].push('tblDocumentation');
			dalProjects.dbArgs[2].push({
				"bitid.auth.users": {
			        $elemMatch: {
			            "role": {
			                $gte: 2
			            },
			            "email": args.req.body.header.email
			        }
			    },
				"_id": ObjectId(args.req.body.versionId)
			});

			dalProjects.dbArgs[2].push({
				$set: params
			});

			var myDB = new db.module();
			myDB.dbCall(dalProjects.dbArgs)
			.then(result => {
				args.result = result.result;
				deferred.resolve(args);
			}, err => {
				dalProjects.errorResponse.error.errors[0].code   = err.code 		|| dalProjects.errorResponse.error.errors[0].code;
				dalProjects.errorResponse.error.errors[0].reason = err.description 	|| 'Update Document Version Error';
				dalProjects.errorResponse.hiddenErrors.push(err.error);
				deferred.reject(dalProjects.errorResponse);
			});

			return deferred.promise;
		},

		delete: (args) => {
			var deferred = Q.defer();

			dalProjects.dbArgs[2] = [];
			dalProjects.dbArgs[1] = 'remove';
			dalProjects.dbArgs[2].push('tblDocumentation');
			dalProjects.dbArgs[2].push({
				"bitid.auth.users": {
			        $elemMatch: {
			            "role": 5,
			            "email": args.req.body.header.email
			        }
			    },
				"_id": ObjectId(args.req.body.versionId)
			});

			var myDB = new db.module();
			myDB.dbCall(dalProjects.dbArgs)
			.then(result => {
				args.result = result.result;
				deferred.resolve(args);
			}, err => {
				dalProjects.errorResponse.error.errors[0].code   = err.code 		|| dalProjects.errorResponse.error.errors[0].code;
				dalProjects.errorResponse.error.errors[0].reason = err.description 	|| 'Delete Document Version Error';
				dalProjects.errorResponse.hiddenErrors.push(err.error);
				deferred.reject(dalProjects.errorResponse);
			});

			return deferred.promise;
		},

		unsubscribe: (args) => {
			var deferred = Q.defer();

			dalProjects.dbArgs[2] = [];
			dalProjects.dbArgs[1] = 'update';
			dalProjects.dbArgs[2].push('tblDocumentation');
			dalProjects.dbArgs[2].push({
				"bitid.auth.users": {
			        $elemMatch: {
			            "role": {
			                $gte: 4
			            },
			            "email": args.req.body.header.email
			        }
			    },
			    "_id": ObjectId(args.req.body.versionId)
			});
			dalProjects.dbArgs[2].push({
				$set: {
					"serverDate": 	new Date()
				},
				$pull: {
					"bitid.auth.users": {
				        "email": args.req.body.email
				    }
				}
			});

			var myDB = new db.module();
			myDB.dbCall(dalProjects.dbArgs)
			.then(result => {
				args.result = result.result;
				deferred.resolve(args);
			}, err => {
				dalProjects.errorResponse.error.errors[0].code   = err.code 		|| dalProjects.errorResponse.error.errors[0].code;
				dalProjects.errorResponse.error.errors[0].reason = err.description 	|| 'Unsubscribe User From A Document Version Error';
				dalProjects.errorResponse.hiddenErrors.push(err.error);
				deferred.reject(dalProjects.errorResponse);
			});

			return deferred.promise;
		},

		updateSubscriber: (args) => {
			var deferred = Q.defer();
			
			dalProjects.dbArgs[2] = [];
			dalProjects.dbArgs[1] = 'find';
			dalProjects.dbArgs[2].push('tblDocumentation');
			dalProjects.dbArgs[2].push({
				"bitid.auth.users": {
			        $elemMatch: {
			            "role": {
			                $gte: 4
			            },    
			            "email": args.req.body.header.email
			        }
			    },
				"_id": ObjectId(args.req.body.versionId)	
			});
			
			var myDB = new db.module();
			myDB.dbCall(dalProjects.dbArgs)
			.then(result => {
				var deferred = Q.defer();

				dalProjects.dbArgs[2] = [];
				dalProjects.dbArgs[1] = 'update';
				dalProjects.dbArgs[2].push('tblDocumentation');
				dalProjects.dbArgs[2].push({
					"bitid.auth.users": {
				        $elemMatch: {
				            "email": args.req.body.email    
				        }
				    },
					"_id": ObjectId(args.req.body.versionId)	
				});
				dalProjects.dbArgs[2].push({ 
					$set: {
			            "bitid.auth.users.$.role": args.req.body.role
					}
				});

				deferred.resolve(dalProjects.dbArgs);

				return deferred.promise;
			}, null)
			.then(myDB.dbCall, null)
			.then(result => {
				args.result = result.result;
				deferred.resolve(args);
			}, err => {
				dalProjects.errorResponse.error.errors[0].code 	= err.code 			|| dalProjects.errorResponse.error.errors[0].code;
				dalProjects.errorResponse.error.errors[0].reason = err.description 	|| 'Update Document Version Subscriber Error';
				dalProjects.errorResponse.hiddenErrors.push(err.error);
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
					"locaction": 	"dalDocumentation",
					"locationType": "header"
				}]
			},
			"hiddenErrors": []
		},

		get: (args) => {
			var deferred = Q.defer();

			var params = {};

			if (typeof(args.req.body.version) != "undefined") {
				params.version = args.req.body.version;
			};

			if (typeof(args.project._id) != "undefined") {
				params.projectId = args.project._id.toString();
			};

			if (typeof(args.req.body.documentId) != "undefined") {
				params._id = ObjectId(args.req.body.documentId);
			};

			db.call({
				'params': 		params,
				'operation': 	'find',
				'collection': 	'tblDocumentation'
			})
			.then(result => {
				args.result = result[0];
				deferred.resolve(args);
			}, err => {
				dalDocumentation.errorResponse.error.errors[0].code 	= err.code 			|| dalDocumentation.errorResponse.error.errors[0].code;
				dalDocumentation.errorResponse.error.errors[0].reason 	= err.description 	|| 'Get Document Error';
				dalDocumentation.errorResponse.hiddenErrors.push(err.error);
				deferred.reject(dalDocumentation.errorResponse);
			});

			return deferred.promise;
		},

		list: (args) => {
			var deferred = Q.defer();

			var params = {};

			if (typeof(args.req.body.version) != "undefined") {
				params.version = args.req.body.version;
			};

			if (typeof(args.req.body.projectId) != "undefined") {
				params.projectId = args.req.body.projectId;
			};

			if (typeof(args.project._id) != "undefined") {
				params.projectId = args.project._id.toString();
			};

			if (typeof(args.req.body.documentId) != "undefined") {
				if (Array.isArray(args.req.body.documentId) && args.req.body.documentId.length > 0) {
					params._id = {
						$in: args.req.body.documentId.map(id => ObjectId(id))
					};
				} else {
					params._id = ObjectId(args.req.body.documentId);
				};
			};

			db.call({
				'params': 		params,
				'operation': 	'find',
				'collection': 	'tblDocumentation'
			})
			.then(result => {
				args.result = result;
				deferred.resolve(args);
			}, err => {
				dalDocumentation.errorResponse.error.errors[0].code 	= err.code 			|| dalDocumentation.errorResponse.error.errors[0].code;
				dalDocumentation.errorResponse.error.errors[0].reason 	= err.description 	|| 'List Documents Error';
				dalDocumentation.errorResponse.hiddenErrors.push(err.error);
				deferred.reject(dalDocumentation.errorResponse);
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