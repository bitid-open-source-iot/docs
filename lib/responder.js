const Q = require('q');
const ErrorResponse = require('./error-response');

var module = function () {
	var responder = {
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
						'role': result.role,
						'icon': result.icon,
						'author': result.author,
						'projectId': result._id,
						'serverDate': result.serverDate,
						'description': result.description
					};

					if (typeof (result.bitid) != "undefined") {
						if (typeof (result.bitid.auth) != "undefined") {
							tmp.users = result.bitid.auth.users;
							tmp.organizationOnly = result.bitid.auth.organizationOnly;
						};
					};

					deferred.resolve(tmp);

					return deferred.promise;
				},

				list: (result) => {
					var deferred = Q.defer();

					result = result.map(obj => {
						var tmp = {
							'role': obj.role,
							'icon': obj.icon,
							'author': obj.author,
							'projectId': obj._id,
							'serverDate': obj.serverDate,
							'description': obj.description
						};

						if (typeof (obj.bitid) != "undefined") {
							if (typeof (obj.bitid.auth) != "undefined") {
								tmp.users = obj.bitid.auth.users;
								tmp.organizationOnly = obj.bitid.auth.organizationOnly;
							};
						};

						return tmp;
					});

					deferred.resolve(result);

					return deferred.promise;
				}
			},

			documentation: {
				add: (result) => {
					var deferred = Q.defer();

					deferred.resolve({
						'documentId': result._id
					});

					return deferred.promise;
				},

				get: (result) => {
					var deferred = Q.defer();

					var tmp = {
						'date': result.date,
						'routes': result.routes,
						'version': result.version,
						'documentId': result._id,
						'serverDate': result.serverDate
					};

					if (typeof (result.project) != "undefined") {
						tmp.project = {
							'icon': result.project.icon,
							'author': result.project.author,
							'projectId': result.project._id,
							'description': result.project.description,
						};
					};

					deferred.resolve(tmp);

					return deferred.promise;
				},

				list: (result) => {
					var deferred = Q.defer();

					result = result.map(obj => {
						var tmp = {
							'date': obj.date,
							'routes': obj.routes,
							'version': obj.version,
							'documentId': obj._id,
							'serverDate': obj.serverDate
						};

						if (typeof (obj.project) != "undefined") {
							tmp.project = {
								'icon': obj.project.icon,
								'author': obj.project.author,
								'projectId': obj.project._id,
								'description': obj.project.description,
							};
						};
						return tmp;
					});

					deferred.resolve(result);

					return deferred.promise;
				}
			}
		},

		model: (req, result) => {
			var deferred = Q.defer();

			switch (req.originalUrl) {
				case ('*'):
					deferred.resolve(result);
					break;

				case ('/docs/projects/add'):
					responder.response.projects.add(result).then(deferred.resolve, deferred.reject);
					break;
				case ('/docs/projects/get'):
					responder.response.projects.get(result).then(deferred.resolve, deferred.reject);
					break;
				case ('/docs/projects/list'):
					responder.response.projects.list(result).then(deferred.resolve, deferred.reject);
					break;

				case ('/docs/documentation/add'):
					responder.response.documentation.add(result).then(deferred.resolve, deferred.reject);
					break;
				case ('/docs/documentation/get'):
					responder.response.documentation.get(result).then(deferred.resolve, deferred.reject);
					break;
				case ('/docs/documentation/list'):
					responder.response.documentation.list(result).then(deferred.resolve, deferred.reject);
					break;

				case ('/docs/projects/share'):
				case ('/docs/projects/update'):
				case ('/docs/projects/unsubscribe'):
				case ('/docs/documentation/update'):
				case ('/docs/projects/updatesubscriber'):
					responder.response.update(result).then(deferred.resolve, deferred.reject);
					break;

				case ('/docs/projects/delete'):
				case ('/docs/documentation/delete'):
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
			if (typeof (err) == 'object') {
				try {
					__logger.error(JSON.stringify(err), '');
				} catch (e) {
					__logger.error('Skipped writing an Error. Could not stringify the err object', '');
				};
			} else {
				__logger.error(err, '');
			};

			res.status(err.error.code).json(err.error);
		},

		success: (req, res, result) => {
			responder.model(req, result)
				.then(result => {
					res.json(result);
				}, error => {
					var err = new ErrorResponse();
					err.error.errors[0].code = 503;
					err.error.errors[0].reason = error.message;
					err.error.errors[0].message = error.message;
					responder.error(req, res, err);
				});
		}
	};

	return responder;
};

exports.module = module;