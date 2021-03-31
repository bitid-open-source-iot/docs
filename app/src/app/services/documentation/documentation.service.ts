import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class DocumentationService {

    public data: Documentation[] = [];
    public documentation: BehaviorSubject<Documentation> = new BehaviorSubject<Documentation>(null);

    constructor(private api: ApiService) { };

    public async add(params) {
        const response = await this.api.post(environment.docs, '/docs/documentation/add', params);

        if (response.ok) {
            let document: Documentation = params;
            document.documentId = response.result.documentId;
            this.data.push(document);
        };

        return response;
    };

    public async get(params) {
        const response = await this.api.post(environment.docs, '/docs/documentation/get', params);

        if (response.ok) {
            this.documentation.next(response.result);
        };

        return response;
    };

    public async list(params) {
        const response = await this.api.post(environment.docs, '/docs/documentation/list', params);

        if (response.ok) {
            this.data = response.result;
        };

        return response;
    };

    public async update(params) {
        const response = await this.api.post(environment.docs, '/docs/documentation/update', params);

        if (response.ok) {
            for (let i = 0; i < this.data.length; i++) {
                if (this.data[i].documentId == params.documentId) {
                    Object.keys(params).map(key => {
                        this.data[i][key] = params[key];
                    });
                    break;
                };
            };
        };

        return response;
    };

    public async delete(params) {
        const response = await this.api.post(environment.docs, '/docs/documentation/delete', params);

        if (response.ok) {
            for (let i = 0; i < this.data.length; i++) {
                if (this.data[i].documentId == params.documentId) {
                    this.data.splice(i, 1);
                    break;
                };
            };
        };

        return response;
    };

}

export interface Documentation {
    'project'?: {
        'icon'?: string;
        'description'?: string;
    };
    'date'?: string;
    'routes'?: any[];
    'version'?: string;
    'documentId'?: string;
}