var Q = require('q');

var module = function() {
	var responder = {
		errorResponse: {
			"error": {
				"code": 	401,
				"message": 	"Error",
				"errors":[{
					"code": 		1,
					"reason": 		"General Error",
					"message": 		"Error In Responder",
					"locaction": 	"Responder",
					"locationType": "db"
				}]
			}
		},

		response: {
			update: (result) => {
				var deferred = Q.defer();

				deferred.resolve({
					'updated': result.n
				});

				return deferred.promise;
			},

			delete: (result) => {
				var deferred = Q.defer();

				deferred.resolve({
					'deleted': result.n
				});

				return deferred.promise;
			},

			projects: {
				add: (result) => {
					var deferred = Q.defer();

					deferred.resolve({
						'projectId': result._id
					});

					return deferred.promise;
				},

				get: (result) => {
					var deferred = Q.defer();

					var tmp = {
						'role': 		result.role,
						'icon': 		result.icon,
						'title': 		result.title,
						'projectId': 	result._id,
						'serverDate': 	result.serverDate,
						'description': 	result.description
					};

					if (typeof(result.bitid) != "undefined") {
						if (typeof(result.bitid.auth) != "undefined") {
							tmp.users 				= result.bitid.auth.users;
							tmp.organizationOnly 	= result.bitid.auth.organizationOnly;
						};
					};

					deferred.resolve(tmp);

					return deferred.promise;
				},

				list: (result) => {
					var deferred = Q.defer();

					result = result.map(obj => {
						var tmp = {
							'role': 		obj.role,
							'icon': 		obj.icon,
							'title': 		obj.title,
							'projectId': 	obj._id,
							'serverDate': 	obj.serverDate,
							'description': 	obj.description
						};

						if (typeof(obj.bitid) != "undefined") {
							if (typeof(obj.bitid.auth) != "undefined") {
								tmp.users 				= obj.bitid.auth.users;
								tmp.organizationOnly 	= obj.bitid.auth.organizationOnly;
							};
						};

						return tmp;
					});

					deferred.resolve(result);

					return deferred.promise;
				}
			},

			documentation: {
				get: (result) => {
					var deferred = Q.defer();

					deferred.resolve({
						'icon': 		result.icon,
						'date': 		result.date,
						'routes': 		result.routes,
						'project': 		result.project,
						'version': 		result.version,
						'serverDate':	result.serverDate,
						'description': 	result.description
					});

					return deferred.promise;
				},

				list: (result) => {
					var deferred = Q.defer();

					result = result.map(obj => {
						return {
							'icon': 		obj.icon,
							'date': 		obj.date,
							'routes': 		obj.routes,
							'project': 		obj.project,
							'version': 		obj.version,
							'serverDate':	obj.serverDate,
							'description': 	obj.description
						};
					});

					deferred.resolve(result);

					return deferred.promise;
				}
			}
		},

		model: (req, result) => {
			var deferred = Q.defer();

			switch(req.originalUrl) {
				case('*'):
					deferred.resolve(result);
					break;
					
				case('/docs/projects/add'):
					responder.response.projects.add(result).then(deferred.resolve, deferred.reject);
					break;
				case('/docs/projects/get'):
					responder.response.projects.get(result).then(deferred.resolve, deferred.reject);
					break;
				case('/docs/projects/list'):
					responder.response.projects.list(result).then(deferred.resolve, deferred.reject);
					break;

				case('/docs/documentation/get'):
					responder.response.documentation.get(result).then(deferred.resolve, deferred.reject);
					break;
				case('/docs/documentation/list'):
					responder.response.documentation.list(result).then(deferred.resolve, deferred.reject);
					break;

				case('/docs/projects/share'):
				case('/docs/projects/update'):
				case('/docs/projects/unsubscribe'):
				case('/docs/projects/updatesubscriber'):
					responder.response.update(result).then(deferred.resolve, deferred.reject);
					break;

				case('/docs/projects/delete'):
					responder.response.delete(result).then(deferred.resolve, deferred.reject);
					break;

				default:
					deferred.resolve({
						'success': 'your request resolved successfully but this payload is not modeled'
					});
					break;
			};

			return deferred.promise;
		},

		error: (req, res, err) => {
			if (typeof(err) == 'object') {
				try {
					__logger.LogData(JSON.stringify(err), '');
				} catch (e) {
					__logger.LogData('Skipped writing an Error. Could not stringify the err object','');
				};
			} else {
				__logger.LogData(err,'');	
			};

			res.status(err.error.code).json(err.error);
		},

		success: (req, res, result) => {
			responder.model(req,result)
			.then(result => {
				if (typeof(result[0]) !== 'undefined') {
					if (typeof(result[0].error) !== 'undefined') {
						if (result[0].error == 'No records found') {
							responder.errorResponse.error.code 	= 401;
							responder.errorResponse.error.message = 'No records found1';
						};
						responder.errorResponse(req, res, responder.errorResponse);
						return;				
					};
				};
				res.json(result);
			}, err => {
				responder.errorResponse.error.code 	= 401;
				responder.errorResponse.error.message = err;
				responder.errorResponse(req, res, responder.errorResponse);
			});
		}
	};

	return responder;
};

exports.module = module;