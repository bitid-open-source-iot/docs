export const environment = {
    "auth":          "https://auth.bitid.co.za",
    "docs":          "https://docs.bitid.co.za",
    "drive":   		 "https://drive.bitid.co.za",
    "appName":       "Docs",
    "production":    true,
    "appId":  "000000000000000000000088",
    "scopes": [
        {"url":"/docs/projects/get","role":4},
        {"url":"/docs/projects/list","role":4},

        {"url":"/docs/documentation/get","role":4},
        {"url":"/docs/documentation/list","role":4},
    ],
    "roles": [
    	{
            "value":        0,
            "description":  "NA"
        },
        {
            "value":        1,
            "description":  "Read"
        },
        {
            "value":        2,
            "description":  "Write"
        },
        {
            "value":        3,
            "description":  "Read/Write"
        },
        {
            "value":        4,
            "description":  "Admin"
        },
        {
            "value":        5,
            "description":  "Owner"
        }
    ]
};