var Q		= require('q');
var mongo 	= require('mongodb').MongoClient;

exports.call = (args) => {
	var deferred = Q.defer();

	var db 			= __database;
	var collection 	= db.collection(args.collection);

	switch(args.operation) {
		case('find'):
			args.skip 	= args.skip		|| 0;
			args.sort 	= args.sort		|| {'_id': -1};
			args.limit 	= args.limit	|| 1000000;
			args.filter = args.filter	|| {};
			
			collection.find(args.params, args.filter).skip(args.skip).sort(args.sort).limit(args.limit).toArray((err, result) => {
				if (typeof(result) == 'undefined') {
					deferred.reject({
						'code': 		71,
						'description': 'result undefined'
					});
				} else if (err) {
					deferred.reject({
						'code': 		72,
						'description': 'find error'
					});
				} else {
					if (result.length > 0) {
						deferred.resolve(result)
					} else {
						if (args.allowNoRecordsFound) {
							deferred.resolve([]);
						} else {
							deferred.reject({
								'code': 		69,
								'description': 'no records found'
							});
						};
					};
				};
			});
			break;
		case('insert'):
			collection.insertOne(args.params, (err, result) => {
				if (err) {
					if (err.code = '11000') {
						deferred.reject({
							'code': 		70,
							'description': 	'already exists'
						});
					} else {
						deferred.reject(err);
					};
				} else {
					if (typeof(result) !== 'undefined') {
						if (result.result.ok == 1) {
							deferred.resolve(result.ops);
						} else {
							deferred.reject({
								'code': 		70,
								'description': 	'error inserting'
							});
						};
					} else {
						deferred.reject({
							'code': 		70,
							'description': 	'error inserting'
						});
					};
				};
			});
			break;
		case('remove'):
			collection.deleteMany(args.params, (err, result) => {
				if (err) {
					if (args.allowNoRecordsFound) {
						deferred.resolve({
							'n':	0,
							'ok': 	0
						});
					} else {
						deferred.reject(err);
					};
				} else {
					if (typeof(result) !== 'undefined') {
						if (result.result.ok > 0) {
							deferred.resolve(result.result);
						} else if (args.allowNoRecordsFound) {
							deferred.resolve({
								'n':	0,
								'ok': 	0
							});
						} else {
							deferred.reject({
								'code': 		70,
								'description': 	'error removing'
							});
						};
					} else {
						deferred.reject({
							'code': 		70,
							'description': 	'error removing'
						});
					};
				};
			});
			break;
		case('update'):
			collection.updateOne(args.params, args.update, (err, result) => {
				if (err) {
					deferred.reject(err);
				} else {
					if (typeof(result) !== 'undefined') {
						if (result.result.ok == 1) {
							deferred.resolve(result.result);
						} else {
							deferred.reject({
								'code': 		70,
								'description': 	'error updating'
							});
						};
					} else {
						deferred.reject({
							'code': 		70,
							'description': 	'error updating'
						});
					};
				};
			});
			break;
		case('aggregate'):
			collection.aggregate(args.params).toArray((err, result) => {
				if (err) {
					deferred.reject(err);
				} else if (result.length > 0) {
					deferred.resolve(result);
				} else {
					if (args.allowNoRecordsFound) {
						deferred.resolve([]);
					} else {
						deferred.reject({
							'code': 		69,
							'description': 'no records found'
						});
					};
				};
			});
			break;
		case('updateMany'):
			collection.updateMany(args.params, args.update, (err, result) => {
				if (err) {
					deferred.reject(err);
				} else {
					if (typeof(result) !== 'undefined') {
						if (result.result.ok == 1) {
							deferred.resolve(result.result);
						} else {
							deferred.reject({
								'code': 		70,
								'description': 	'error updating'
							});
						};
					} else {
						deferred.reject({
							'code': 		70,
							'description': 	'error updating'
						});
					};
				};
			});
			break;
		case('bulkWrite'):
			collection.bulkWrite(args.params, (err, result) => {
				if (err) {
					deferred.reject(err);
				} else {
					if (typeof(result) !== 'undefined') {
						if (result.result.ok == 1) {
							deferred.resolve(result.result);
						} else {
							deferred.reject({
								'code': 		70,
								'description': 	'error updating'
							});
						};
					} else {
						deferred.reject({
							'code': 		70,
							'description': 	'error updating'
						});
					};
				};
			});
			break;
		default:
			deferred.reject({
				'code': 		503,
				'description': 'db query error'
			});
			break;
	};

	return deferred.promise;
};

exports.connect = () => {
	var deferred = Q.defer();

	mongo.connect(__settings.mongodb.url, {
		"poolSize": 			500,
		"useUnifiedTopology": 	true
	}, (error, connection) => {
		if (error) {
			deferred.reject({
				'code': 		600,
				'description': 	'Error Connecting To Database'
			});
		} else {
			var database = connection.db(__settings.mongodb.database);
			deferred.resolve(database);
		};
	});

	return deferred.promise;
};