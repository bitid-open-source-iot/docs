import { User } from 'src/app/interfaces/user';
import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';
import { environment } from 'src/environments/environment';
import { LocalstorageService } from '../localstorage/localstorage.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class ProjectsService {

    public data:    Project[]                   = [];
    public project: BehaviorSubject<Project>    = new BehaviorSubject<Project>(null);

    constructor(private api: ApiService, private localstorage: LocalstorageService) {};

    public async add(params: AddQuery) {
        const response = await this.api.post(environment.docs, '/docs/projects/add', params);
        
        if (response.ok) {
            let project: Project    = params;
            project.projectId       = response.result.projectId;
            this.data.push(project);
        };

        return response;
    };

    public async get(params: GetQuery) {
        const response = await this.api.post(environment.docs, '/docs/projects/get', params);

        if (response.ok) {
            this.project.next(response.result);
        };

        return response;
    };

    public async list(params: ListQuery) {
        const response = await this.api.post(environment.docs, '/docs/projects/list', params);
        
        if (response.ok) {
            this.data = response.result;
        };

        return response;
    };

    public async share(params: ShareQuery) {
        return await this.api.post(environment.docs, '/docs/projects/share', params);
    };

    public async update(params: UpdateQuery) {
        const response = await this.api.post(environment.docs, '/docs/projects/update', params);
        
        if (response.ok) {
            for (let i = 0; i < this.data.length; i++) {
                if (this.data[i].projectId == params.projectId) {
                    Object.keys(params).map(key => {
                        this.data[i][key] = params[key];
                    });
                    break;
                };
            };
        };

        return response;
    };

    public async delete(params: DeleteQuery) {
        const response = await this.api.post(environment.docs, '/docs/projects/delete', params);
        
        if (response.ok) {
            for (let i = 0; i < this.data.length; i++) {
                if (this.data[i].projectId == params.projectId) {
                    this.data.splice(i, 1);
                    break;
                };
            };
        };

        return response;
    };

    public async unsubscribe(params: UnsubscribeQuery) {
        const response = await this.api.post(environment.docs, '/docs/projects/unsubscribe', params);
        
        if (response.ok) {
            for (let i = 0; i < this.data.length; i++) {
                if (this.data[i].projectId == params.projectId && params.email == this.localstorage.get('email')) {
                    this.data.splice(i, 1);
                    break;
                };
            };
        };

        return response;
    };

    public async updatesubscriber(params: UpdateSubscriberQuery) {
        return await this.api.post(environment.docs, '/docs/projects/updatesubscriber', params);
    };

}

export interface Project {
	'author'?: {
		'name'?: {
			'last'?:    string;
			'first'?:   string;
		};
		'email'?:   string;
		'number'?: 	string;
		'company'?: string;
	};
    'role'?:                number;
    'icon'?:	            string;
    'users'?:               User[];
    'projectId'?:	        string;
    'description'?:	        string;
    'organizationOnly'?:    number;
}

interface AddQuery {
    'author': {
		'name': {
			'last':     string;
			'first':    string;
		};
		'email':    string;
		'number': 	string;
		'company':  string;
	};
    'icon':             string;
    'description':      string;
    'organizationOnly': number;
}

interface GetQuery {
    'filter':       string[];
    'projectId':    string;
}

interface ListQuery {
    'sort'?:        any;
    'skip'?:        number;
    'limit'?:       number;
    'filter'?:      string[];
    'projectId'?:   any;
}

interface ShareQuery {
    'role':         number;
    'email':        string;
    'projectId':    string;
}

interface UpdateQuery {
    'author'?: {
		'name'?: {
			'last'?:    string;
			'first'?:   string;
		};
		'email'?:   string;
		'number'?:  string;
		'company'?: string;
	};
    'icon'?:                string;
    'projectId':            string;
    'description'?:         string;
    'organizationOnly'?:    number;
}

interface DeleteQuery {
    'projectId':    string;
}

interface UnsubscribeQuery {
    'email':        string;
    'projectId':    string;
}

interface UpdateSubscriberQuery {
    'role':         number;
    'email':        string;
    'projectId':    string;
}