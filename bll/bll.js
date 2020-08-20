var dal     = require('../dal/dal');
var tools   = require('../lib/tools');

var module = function() {
    var bllProjects = {
        errorResponse: {
            "error": {
                "errors": [{
                    "reason":       "General Error",
                    "message":      "Projects Error",
                    "location":    "bllProjects",
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

        updatesubscriber: (req, res) => {
            var args = {
                'req': req,
                'res': res
            };

            var myModule = new dal.module();
            myModule.projects.updatesubscriber(args)
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
                    "location":    "bllDocumentation",
                    "locationType": "body"
                }],
                "code":     401,
                "message": "Documentation Error"
            },
            "hiddenErrors": []
        },

        add: (req, res) => {
            var args = {
                'req': req,
                'res': res
            };

            var myModule = new dal.module();
            myModule.documentation.add(args)
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
            myModule.documentation.get(args)
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
            myModule.documentation.list(args)
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
            myModule.documentation.update(args)
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
            myModule.documentation.delete(args)
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