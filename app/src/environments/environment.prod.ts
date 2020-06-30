export const environment = {
    "auth":         "https://auth.bitid.co.za",
    "docs":         "https://docs.bitid.co.za",
    "appId":        "000000000000000000000012",
    "drive":        "https://drive.bitid.co.za",
    "appName":      "Documentation",
    "production":   true,
    "roles": [
        {"value": 1, "title": "Read Only"},
        {"value": 2, "title": "Write Only"},
        {"value": 3, "title": "Read/Write"},
        {"value": 4, "title": "Admin"},
        {"value": 5, "title": "Owner"}
    ],
    "scopes": [
        {"url": "/users/get", "role": 4},
        
        {"url": "/drive/files/upload", "role": 4},

        {"url": "/docs/projects/add", "role": 4},
        {"url": "/docs/projects/get", "role": 4},
        {"url": "/docs/projects/list", "role": 4},
        {"url": "/docs/projects/share", "role": 4},
        {"url": "/docs/projects/update", "role": 4},
        {"url": "/docs/projects/delete", "role": 5},
        {"url": "/docs/projects/unsubscribe", "role": 4},
        {"url": "/docs/projects/updatesubscriber", "role": 4},

        {"url": "/docs/documentation/add", "role": 4},
        {"url": "/docs/documentation/get", "role": 4},
        {"url": "/docs/documentation/list", "role": 4},
        {"url": "/docs/documentation/update", "role": 4},
        {"url": "/docs/documentation/delete", "role": 5},
    ]
};