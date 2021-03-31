const Q = require('q');
const chai = require('chai');
const fetch = require('node-fetch');
const expect = require('chai').expect;
const should = require('chai').should();
const config = require('./config.json');
const chaiSubset = require('chai-subset');
chai.use(chaiSubset);

var projectId = null;
var documentId = null;

describe('Projects', function () {
    it('/docs/projects/add', function (done) {
        this.timeout(5000);

        tools.api.projects.add()
            .then((result) => {
                try {
                    projectId = result.projectId;
                    result.should.have.property('projectId');
                    done();
                } catch (e) {
                    done(e);
                };
            }, (err) => {
                try {
                    done(err);
                } catch (e) {
                    done(e);
                };
            });
    });

    it('/docs/projects/get', function (done) {
        this.timeout(5000);

        tools.api.projects.get()
            .then((result) => {
                try {
                    result.should.have.property('icon');
                    result.should.have.property('role');
                    result.should.have.property('users');
                    result.should.have.property('author');
                    result.should.have.property('projectId');
                    result.should.have.property('serverDate');
                    result.should.have.property('description');
                    done();
                } catch (e) {
                    done(e);
                };
            }, (err) => {
                try {
                    done(err);
                } catch (e) {
                    done(e);
                };
            });
    });

    it('/docs/projects/list', function (done) {
        this.timeout(5000);

        tools.api.projects.list()
            .then((result) => {
                try {
                    result[0].should.have.property('icon');
                    result[0].should.have.property('role');
                    result[0].should.have.property('users');
                    result[0].should.have.property('author');
                    result[0].should.have.property('projectId');
                    result[0].should.have.property('serverDate');
                    result[0].should.have.property('description');
                    done();
                } catch (e) {
                    done(e);
                };
            }, (err) => {
                try {
                    done(err);
                } catch (e) {
                    done(e);
                };
            });
    });

    it('/docs/projects/update', function (done) {
        this.timeout(5000);

        tools.api.projects.update()
            .then((result) => {
                try {
                    result.should.have.property('updated');
                    expect(result.updated).to.equal(1);
                    done();
                } catch (e) {
                    done(e);
                };
            }, (err) => {
                try {
                    done(err);
                } catch (e) {
                    done(e);
                };
            });
    });

    it('/docs/projects/share', function (done) {
        this.timeout(5000);

        tools.api.projects.share()
            .then((result) => {
                try {
                    result.should.have.property('updated');
                    expect(result.updated).to.equal(1);
                    done();
                } catch (e) {
                    done(e);
                };
            }, (err) => {
                try {
                    done(err);
                } catch (e) {
                    done(e);
                };
            });
    });

    it('/docs/projects/updatesubscriber', function (done) {
        this.timeout(5000);

        tools.api.projects.updatesubscriber()
            .then((result) => {
                try {
                    result.should.have.property('updated');
                    expect(result.updated).to.equal(1);
                    done();
                } catch (e) {
                    done(e);
                };
            }, (err) => {
                try {
                    done(err);
                } catch (e) {
                    done(e);
                };
            });
    });

    it('/docs/projects/unsubscribe', function (done) {
        this.timeout(5000);

        tools.api.projects.unsubscribe()
            .then((result) => {
                try {
                    result.should.have.property('updated');
                    expect(result.updated).to.equal(1);
                    done();
                } catch (e) {
                    done(e);
                };
            }, (err) => {
                try {
                    done(err);
                } catch (e) {
                    done(e);
                };
            });
    });
});

describe('Documentation', function () {
    it('/docs/documentation/add', function (done) {
        this.timeout(5000);

        tools.api.documentation.add()
            .then((result) => {
                try {
                    documentId = result.documentId;
                    result.should.have.property('documentId');
                    done();
                } catch (e) {
                    done(e);
                };
            }, (err) => {
                try {
                    done(err);
                } catch (e) {
                    done(e);
                };
            });
    });

    it('/docs/documentation/get', function (done) {
        this.timeout(50000);

        tools.api.documentation.get()
            .then((result) => {
                try {
                    result.should.have.property('date');
                    result.should.have.property('routes');
                    result.should.have.property('project');
                    result.should.have.property('version');
                    result.should.have.property('documentId');
                    result.should.have.property('serverDate');
                    done();
                } catch (e) {
                    done(e);
                };
            }, (err) => {
                try {
                    done(err);
                } catch (e) {
                    done(e);
                };
            });
    });

    it('/docs/documentation/list', function (done) {
        this.timeout(5000);

        tools.api.documentation.list()
            .then((result) => {
                try {
                    result[0].should.have.property('date');
                    result[0].should.have.property('routes');
                    result[0].should.have.property('project');
                    result[0].should.have.property('version');
                    result[0].should.have.property('documentId');
                    result[0].should.have.property('serverDate');
                    done();
                } catch (e) {
                    done(e);
                };
            }, (err) => {
                try {
                    done(err);
                } catch (e) {
                    done(e);
                };
            });
    });

    it('/docs/documentation/update', function (done) {
        this.timeout(5000);

        tools.api.documentation.update()
            .then((result) => {
                try {
                    result.should.have.property('updated');
                    expect(result.updated).to.equal(1);
                    done();
                } catch (e) {
                    done(e);
                };
            }, (err) => {
                try {
                    done(err);
                } catch (e) {
                    done(e);
                };
            });
    });
});

describe('Remove Added Items', function () {
    it('/docs/documentation/delete', function (done) {
        this.timeout(5000);

        tools.api.documentation.delete()
            .then((result) => {
                try {
                    result.should.have.property('deleted');
                    expect(result.deleted).to.equal(1);
                    done();
                } catch (e) {
                    done(e);
                };
            }, (err) => {
                try {
                    done(err);
                } catch (e) {
                    done(e);
                };
            });
    });

    it('/docs/projects/delete', function (done) {
        this.timeout(5000);

        tools.api.projects.delete()
            .then((result) => {
                try {
                    result.should.have.property('deleted');
                    expect(result.deleted).to.equal(1);
                    done();
                } catch (e) {
                    done(e);
                };
            }, (err) => {
                try {
                    done(err);
                } catch (e) {
                    done(e);
                };
            });
    });
});

describe('Health Check', function () {
    it('/', function (done) {
        this.timeout(5000);

        tools.api.healthcheck()
            .then((result) => {
                try {
                    result.should.have.property('uptime');
                    result.should.have.property('memory');
                    result.should.have.property('database');
                    done();
                } catch (e) {
                    done(e);
                };
            }, (err) => {
                try {
                    done(err);
                } catch (e) {
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
                    'author': {
                        'name': {
                            'last': 'xxx',
                            'first': 'xxx'
                        },
                        'email': 'xxx',
                        'number': 'xxx',
                        'company': 'xxx'
                    },
                    'icon': 'https://...',
                    'description': 'Mocha Test Docs ..',
                    'organizationOnly': 1
                })
                    .then(deferred.resolve, deferred.resolve);

                return deferred.promise;
            },
            get: () => {
                var deferred = Q.defer();

                tools.post('/docs/projects/get', {
                    'filter': [
                        'role',
                        'icon',
                        'users',
                        'author',
                        'projectId',
                        'serverDate',
                        'description'
                    ],
                    'projectId': projectId
                })
                    .then(deferred.resolve, deferred.resolve);

                return deferred.promise;
            },
            list: () => {
                var deferred = Q.defer();

                tools.post('/docs/projects/list', {
                    'filter': [
                        'role',
                        'icon',
                        'users',
                        'author',
                        'projectId',
                        'serverDate',
                        'description'
                    ],
                    'projectId': projectId
                })
                    .then(deferred.resolve, deferred.resolve);

                return deferred.promise;
            },
            share: () => {
                var deferred = Q.defer();

                tools.post('/docs/projects/share', {
                    'role': 4,
                    'email': 'shared@email.com',
                    'projectId': projectId
                })
                    .then(deferred.resolve, deferred.resolve);

                return deferred.promise;
            },
            update: () => {
                var deferred = Q.defer();

                tools.post('/docs/projects/update', {
                    'projectId': projectId,
                    'description': 'Mocha Test Doc Updated'
                })
                    .then(deferred.resolve, deferred.resolve);

                return deferred.promise;
            },
            delete: () => {
                var deferred = Q.defer();

                tools.post('/docs/projects/delete', {
                    'projectId': projectId
                })
                    .then(deferred.resolve, deferred.resolve);

                return deferred.promise;
            },
            unsubscribe: () => {
                var deferred = Q.defer();

                tools.post('/docs/projects/unsubscribe', {
                    'email': 'shared@email.com',
                    'projectId': projectId
                })
                    .then(deferred.resolve, deferred.resolve);

                return deferred.promise;
            },
            updatesubscriber: () => {
                var deferred = Q.defer();

                tools.post('/docs/projects/updatesubscriber', {
                    'role': 2,
                    'email': 'shared@email.com',
                    'projectId': projectId
                })
                    .then(deferred.resolve, deferred.resolve);

                return deferred.promise;
            }
        },
        healthcheck: () => {
            var deferred = Q.defer();

            tools.put('/health-check', {})
                .then(deferred.resolve, deferred.resolve);

            return deferred.promise;
        },
        documentation: {
            add: () => {
                var deferred = Q.defer();

                tools.post('/docs/documentation/add', {
                    'routes': [
                        {
                            "title": "xxx",
                            "routeId": "xxx",
                            "description": "xxx",
                            "endpoints": [
                                {
                                    "request": {
                                        "header": {
                                            "email": "xxx@xxx.co.za",
                                            "appId": "xxx"
                                        }
                                    },
                                    "response": {
                                        "xxx": "xxx"
                                    },
                                    "url": "xxx",
                                    "title": "xxx",
                                    "method": "POST",
                                    "endpointId": "xxx",
                                    "description": "xxx"
                                }
                            ]
                        }
                    ],
                    'date': new Date(),
                    'version': '1.0.0',
                    'projectId': projectId
                })
                    .then(deferred.resolve, deferred.resolve);

                return deferred.promise;
            },
            get: () => {
                var deferred = Q.defer();

                tools.post('/docs/documentation/get', {
                    'filter': [
                        'date',
                        'routes',
                        'project',
                        'version',
                        'documentId',
                        'serverDate'
                    ],
                    'projectId': projectId,
                    'documentId': documentId
                })
                    .then(deferred.resolve, deferred.resolve);

                return deferred.promise;
            },
            list: () => {
                var deferred = Q.defer();

                tools.post('/docs/documentation/list', {
                    'filter': [
                        'date',
                        'routes',
                        'project',
                        'version',
                        'documentId',
                        'serverDate'
                    ],
                    'projectId': projectId,
                    'documentId': documentId
                })
                    .then(deferred.resolve, deferred.resolve);

                return deferred.promise;
            },
            update: () => {
                var deferred = Q.defer();

                tools.post('/docs/documentation/update', {
                    'version': '1.0.1',
                    'projectId': projectId,
                    'documentId': documentId
                })
                    .then(deferred.resolve, deferred.resolve);

                return deferred.promise;
            },
            delete: () => {
                var deferred = Q.defer();

                tools.post('/docs/documentation/delete', {
                    'projectId': projectId,
                    'documentId': documentId
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

        const response = await fetch(config.docs + url, {
            'headers': {
                'Accept': '*/*',
                'Content-Type': 'application/json; charset=utf-8',
                'Authorization': JSON.stringify(config.token),
                'Content-Length': payload.length
            },
            'body': payload,
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
                'Accept': '*/*',
                'Content-Type': 'application/json; charset=utf-8',
                'Authorization': JSON.stringify(config.token),
                'Content-Length': payload.length
            },
            'body': payload,
            'method': 'POST'
        });

        const result = await response.json();

        deferred.resolve(result);

        return deferred.promise;
    }
};