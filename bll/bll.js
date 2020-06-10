var dal     = require('../dal/dal');
var tools   = require('../lib/tools');

var module = function() {
    var bllProjects = {
        errorResponse: {
            "error": {
                "errors": [{
                    "reason":       "General Error",
                    "message":      "Projects Error",
                    "locaction":    "bllProjects",
                    "locationType": "body"
                }],
                "code":     401,
                "message": "Projects Error"
            },
            "hiddenErrors": []
        },
        
        add: (req, res) => {
            var args = {
                'req': req,
                'res': res
            };

            var myModule = new dal.module();

            tools.insertOwnerIfNoneExists(args)
            .then(myModule.projects.add, null)
            .then(args => {
                __responder.success(req, res, args.result);
            }, err => {
                __responder.error(req, res, err);
            });
        },

        get: (req, res) => {
            var args = {
                'req': req,
                'res': res
            };

            var myModule = new dal.module();

            myModule.projects.get(args)
            .then(tools.setRoleObject, null)
            .then(args => {
                __responder.success(req, res, args.result);
            }, err => {
                __responder.error(req, res, err);
            });
        },

        list: (req, res) => {
            var args = {
                'req': req,
                'res': res
            };

            var myModule = new dal.module();

            myModule.projects.list(args)
            .then(tools.setRoleList, null)
            .then(args => {
                __responder.success(req, res, args.result);
            }, err => {
                __responder.error(req, res, err);
            });
        },

        share: (req, res) => {
            var args = {
                'req': req,
                'res': res
            };

            var myModule = new dal.module();
            myModule.projects.share(args) 
            .then(args => {
                __responder.success(req, res, args.result);
            }, err => {
                __responder.error(req, res, err);
            });
        },

        update: (req, res) => {
            var args = {
                'req': req,
                'res': res
            };

            var myModule = new dal.module();
            myModule.projects.update(args)
            .then(args => {
                __responder.success(req, res, args.result);
            }, err => {
                __responder.error(req, res, err);
            });
        },

        delete: (req, res) => {
            var args = {
                'req': req,
                'res': res
            };

            var myModule = new dal.module();
            myModule.projects.delete(args)
            .then(args => {
                __responder.success(req, res, args.result);
            }, err => {
                __responder.error(req, res, err);
            });
        },
        
        unsubscribe: (req, res) => {
            var args = {
                'req': req,
                'res': res
            };
            
            var myModule    = new dal.module();
            myModule.projects.unsubscribe(args) 
            .then(args => {
                __responder.success(req, res, args.result);
            }, err => {
                __responder.error(req, res, err);
            });
        },

        updateSubscriber: (req, res) => {
            var args = {
                'req': req,
                'res': res
            };

            var myModule = new dal.module();
            myModule.projects.updateSubscriber(args)
            .then(args => {
                __responder.success(req, res, args.result);
            }, err => {
                __responder.error(req, res, err);
            });
        }
    };

    var bllDocumentation = {
        errorResponse: {
            "error": {
                "errors": [{
                    "reason":       "General Error",
                    "message":      "Documentation Error",
                    "locaction":    "bllDocumentation",
                    "locationType": "body"
                }],
                "code":     401,
                "message": "Documentation Error"
            },
            "hiddenErrors": []
        },

        get: (req, res) => {
            var args = {
                'req': req,
                'res': res
            };

            var myModule = new dal.module();

            myModule.projects.get(args)
            .then(myModule.documentation.get, null)
            .then(args => {
                args.result.project = {
                    'projectId':    args.project._id,
                    'description':  args.project.description
                };
                __responder.success(req, res, args.result);
            }, err => {
                __responder.error(req, res, err);
            });
        },

        list: (req, res) => {
            var args = {
                'req': req,
                'res': res
            };

            var myModule = new dal.module();
            myModule.projects.get(args)
            .then(myModule.documentation.list, null)
            .then(args => {
                __responder.success(req, res, args.result);
            }, err => {
                __responder.error(req, res, err);
            });
        }
    };

	return {
        "projects":         bllProjects,
        "documentation":    bllDocumentation
	};
};

exports.module = module;