import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})

export class ProjectsService {

	constructor(private api: ApiService) {};

	public async get(params) {
		return await this.api.post(environment.docs, '/docs/projects/get', params);
	};

	public async list(params) {
		return await this.api.post(environment.docs, '/docs/projects/list', params);
	};

}