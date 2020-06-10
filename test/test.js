var Q           = require('q');
var chai        = require('chai');
var fetch       = require('node-fetch');
var expect      = require('chai').expect;
var should      = require('chai').should();
var config      = require('./config.json');
var chaiSubset  = require('chai-subset');
chai.use(chaiSubset);

var versionId   = null;
var projectId   = null;

describe('Projects', function() {
    it('/docs/projects/add', function(done) {
        this.timeout(5000);

        tools.api.projects.add()
        .then((result) => {
            try {
                versionId = result.versionId;
                result.should.have.property('versionId');
                result.should.have.property('projectId');
                done();
            } catch(e) {
                done(e);
            };
        }, (err) => {
            try {
                done(err);
            } catch(e) {
                done(e);
            };
        });
    });

    it('/docs/projects/get', function(done) {
        this.timeout(5000);

        tools.api.projects.get()
        .then((result) => {
            try {
                result.should.have.property('icon');
                result.should.have.property('type');
                result.should.have.property('title');
                result.should.have.property('routes');
                result.should.have.property('version');
                result.should.have.property('versionId');
                result.should.have.property('projectId');
                result.should.have.property('serverDate');
                result.should.have.property('description');
                done();
            } catch(e) {
                done(e);
            };
        }, (err) => {
            try {
                done(err);
            } catch(e) {
                done(e);
            };
        });
    });

    it('/docs/projects/list', function(done) {
        this.timeout(5000);

        tools.api.projects.list()
        .then((result) => {
            try {
                result[0].should.have.property('icon');
                result[0].should.have.property('type');
                result[0].should.have.property('title');
                result[0].should.have.property('routes');
                result[0].should.have.property('version');
                result[0].should.have.property('versionId');
                result[0].should.have.property('projectId');
                result[0].should.have.property('serverDate');
                result[0].should.have.property('description');
                done();
            } catch(e) {
                done(e);
            };
        }, (err) => {
            try {
                done(err);
            } catch(e) {
                done(e);
            };
        });
    });

    it('/docs/projects/latest', function(done) {
        this.timeout(5000);

        tools.api.projects.latest()
        .then((result) => {
            try {
                result[0].should.have.property('icon');
                result[0].should.have.property('type');
                result[0].should.have.property('title');
                result[0].should.have.property('version');
                result[0].should.have.property('versionId');
                result[0].should.have.property('projectId');
                result[0].should.have.property('serverDate');
                done();
            } catch(e) {
                done(e);
            };
        }, (err) => {
            try {
                done(err);
            } catch(e) {
                done(e);
            };
        });
    });

    it('/docs/projects/update', function(done) {
        this.timeout(5000);

        tools.api.projects.update()
        .then((result) => {
            try {
                result.should.have.property('updated');
                expect(result.updated).to.equal(1);
                done();
            } catch(e) {
                done(e);
            };
        }, (err) => {
            try {
                done(err);
            } catch(e) {
                done(e);
            };
        });
    });

    it('/docs/projects/share', function(done) {
        this.timeout(5000);

        tools.api.projects.share()
        .then((result) => {
            try {
                result.should.have.property('updated');
                expect(result.updated).to.equal(1);
                done();
            } catch(e) {
                done(e);
            };
        }, (err) => {
            try {
                done(err);
            } catch(e) {
                done(e);
            };
        });
    });

    it('/docs/projects/updatesubscriber', function(done) {
        this.timeout(5000);

        tools.api.projects.updatesubscriber()
        .then((result) => {
            try {
                result.should.have.property('updated');
                expect(result.updated).to.equal(1);
                done();
            } catch(e) {
                done(e);
            };
        }, (err) => {
            try {
                done(err);
            } catch(e) {
                done(e);
            };
        });
    });

    it('/docs/projects/unsubscribe', function(done) {
        this.timeout(5000);

        tools.api.projects.unsubscribe()
        .then((result) => {
            try {
                result.should.have.property('updated');
                expect(result.updated).to.equal(1);
                done();
            } catch(e) {
                done(e);
            };
        }, (err) => {
            try {
                done(err);
            } catch(e) {
                done(e);
            };
        });
    });
});

describe('Remove Added Items', function() {
    it('/docs/projects/delete', function(done) {
        this.timeout(5000);

        tools.api.projects.delete()
        .then((result) => {
            try {
                result.should.have.property('deleted');
                expect(result.deleted).to.equal(1);
                done();
            } catch(e) {
                done(e);
            };
        }, (err) => {
            try {
                done(err);
            } catch(e) {
                done(e);
            };
        });
    });
});

var tools = {
    api: {
        projects: {
            add: () => {
                var deferred = Q.defer();
                
                tools.post('/docs/projects/add', {
                    'icon':             'https://...',
                    'type':             'api',
                    'title':            'Mocha Test Docs',
                    'routes':           [],
                    'version':          '1.0.0',
                    'projectId':        projectId,
                    'serverDate':       new Date(),
                    'description':      'Mocha Test Docs ..',
                    'organizationOnly': 1
                })
                .then(deferred.resolve, deferred.resolve);

                return deferred.promise;
            },
            get: () => {
                var deferred = Q.defer();
                
                tools.put('/docs/projects/get', {
                    'filter': [
                        'icon',
                        'type',
                        'title',
                        'routes',
                        'version',
                        'versionId',
                        'projectId',
                        'serverDate',
                        'description'
                    ],
                    'versionId': versionId
                })
                .then(deferred.resolve, deferred.resolve);

                return deferred.promise;
            },
            list: () => {
                var deferred = Q.defer();
                
                tools.put('/docs/projects/list', {
                    'filter': [
                        'role',
                        'icon',
                        'type',
                        'title',
                        'routes',
                        'version',
                        'versionId',
                        'projectId',
                        'serverDate',
                        'description'
                    ],
                    'versionId': versionId,
                    'projectId': projectId
                })
                .then(deferred.resolve, deferred.resolve);

                return deferred.promise;
            },
            share: () => {
                var deferred = Q.defer();
                
                tools.post('/docs/projects/share', {
                    'role':     4,
                    'email':    'shared@email.com',
                    'versionId': versionId
                })
                .then(deferred.resolve, deferred.resolve);

                return deferred.promise;
            },
            latest: () => {
                var deferred = Q.defer();
                
                tools.put('/docs/projects/latest', {
                    'filter': [
                        'icon',
                        'type',
                        'title',
                        'version',
                        'versionId',
                        'projectId',
                        'serverDate'
                    ]
                })
                .then(deferred.resolve, deferred.resolve);

                return deferred.promise;
            },
            update: () => {
                var deferred = Q.defer();
                
                tools.post('/docs/projects/update', {
                    'versionId':    versionId,
                    'description':  'Mocha Test Doc Updated'
                })
                .then(deferred.resolve, deferred.resolve);

                return deferred.promise;
            },
            delete: () => {
                var deferred = Q.defer();
                
                tools.post('/docs/projects/delete', {
                    'versionId': versionId
                })
                .then(deferred.resolve, deferred.resolve);

                return deferred.promise;
            },
            unsubscribe: () => {
                var deferred = Q.defer();
                
                tools.post('/docs/projects/unsubscribe', {
                    'email':        'shared@email.com',
                    'versionId':    versionId
                })
                .then(deferred.resolve, deferred.resolve);

                return deferred.promise;
            },
            updatesubscriber: () => {
                var deferred = Q.defer();
                
                tools.post('/docs/projects/updatesubscriber', {
                    'role':     2,
                    'email':    'shared@email.com',
                    'versionId': versionId
                })
                .then(deferred.resolve, deferred.resolve);

                return deferred.promise;
            }
        }
    },
    put: async (url, payload) => {
        var deferred = Q.defer();

        payload.header = {
            'email': config.email, 
            'appId': config.appId
        };

        payload = JSON.stringify(payload);

        const response = await fetch(config.api + url, {
            'headers': {
                'Accept':           '*/*',
                'Content-Type':     'application/json; charset=utf-8',
                'Authorization':    JSON.stringify(config.token),
                'Content-Length':   payload.length
            },
            'body':   payload,
            'method': 'PUT'
        });
        
        const result = await response.json();

        deferred.resolve(result);
        
        return deferred.promise;
    },
    post: async (url, payload) => {
        var deferred = Q.defer();

        payload.header = {
            'email': config.email, 
            'appId': config.appId
        };

        payload = JSON.stringify(payload);

        const response = await fetch(config.docs + url, {
            'headers': {
                'Accept':           '*/*',
                'Content-Type':     'application/json; charset=utf-8',
                'Authorization':    JSON.stringify(config.token),
                'Content-Length':   payload.length
            },
            'body':   payload,
            'method': 'POST'
        });
        
        const result = await response.json();

        deferred.resolve(result);
        
        return deferred.promise;
    }
};