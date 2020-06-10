import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
	providedIn: 'root'
})

export class DocumentationService {

	public document: BehaviorSubject<Document> = new BehaviorSubject<Document>(DOCUMENT_DEFAULTS);

	constructor(private api: ApiService) {};

	public async get(params) {
		const response = await this.api.post(environment.docs, '/docs/documentation/get', params);

		if (response.ok) {
			this.document.next(response.result);
		};

		return response;
	};

	public async list(params) {
		return await this.api.post(environment.docs, '/docs/documentation/list', params);
	};

}

export interface Route {
	'title': 		string;
	'routeId': 		string;
	'endpoints': 	Endpoint[];
	'description': 	string;
}

export interface Document {
	'project': {
		'projectId': 	string;
		'description': 	string;
	};
	'routes': 		Route[];
	'version': 		string;
	'documentId': 	string;
	
}

export interface Endpoint {
	'title': 		string;
	'scopes': 		number[];
	'endpointId': 	string;
}

export const DOCUMENT_DEFAULTS = {
	'project': {
		'projectId': 	null,
		'description': 	null
	},
	'routes': 		[],
	'version': 		null,
	'documentId': 	null
}