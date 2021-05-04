export const environment = {
    "auth":         "https://auth.bitid.co.za",
    "docs":         "https://docs.bitid.co.za",
    "appId":        "000000000000000000000012",
    "drive":        "https://drive.bitid.co.za",
    "appName":      "docs",
    "production":   true,
    "roles": [
        {"value": 1, "title": "Read Only"},
        {"value": 2, "title": "Write Only"},
        {"value": 3, "title": "Read/Write"},
        {"value": 4, "title": "Admin"},
        {"value": 5, "title": "Owner"}
    ],
    "scopes": [
        "/users/get",
        "/users/update",
        
        "/drive/files/upload",

        "/docs/projects/add",
        "/docs/projects/get",
        "/docs/projects/list",
        "/docs/projects/share",
        "/docs/projects/update",
        "/docs/projects/delete",
        "/docs/projects/unsubscribe",
        "/docs/projects/change-owner",
        "/docs/projects/update-subscriber",

        "/docs/documentation/add",
        "/docs/documentation/get",
        "/docs/documentation/list",
        "/docs/documentation/share",
        "/docs/documentation/update",
        "/docs/documentation/delete",
        "/docs/documentation/unsubscribe",
        "/docs/documentation/change-owner",
        "/docs/documentation/update-subscriber"
    ]
};