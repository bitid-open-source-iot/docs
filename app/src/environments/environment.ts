export const environment = {
    "auth":         "https://auth.bitid.co.za",
    "docs":         "http://127.0.0.1:15000",
    "appId":        "000000000000000000000012",
    "drive":        "https://drive.bitid.co.za",
    "appName":      "docs",
    "production":   false,
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

        {"url": "/docs/docs/add", "role": 4},
        {"url": "/docs/docs/get", "role": 4},
        {"url": "/docs/docs/list", "role": 4},
        {"url": "/docs/docs/update", "role": 4},
        {"url": "/docs/docs/delete", "role": 5},
    ]
};