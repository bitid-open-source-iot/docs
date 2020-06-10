import { Router, ActivatedRoute } from '@angular/router';
import { OnInit, Component, OnDestroy } from '@angular/core';
import { Document, DocumentationService } from 'src/app/services/documentation/documentation.service';

@Component({
    selector:       'app-project',
    styleUrls:      ['./project.component.scss'],
    templateUrl:    './project.component.html'
})

export class ProjectComponent implements OnInit, OnDestroy {

    constructor(private route: ActivatedRoute, private router: Router, private service: DocumentationService) {};

    public loading:         boolean;
    public project:         string;
    public documents:       Document[] = [];
    private subscriptions:  any = {};

    private async list() {
        this.loading = true;

        const response = await this.service.list({
            'project': this.project
        });
        
        this.loading = false;

        if (response.ok) {
            this.documents = response.result;
        } else {
            // show error
            this.router.navigate(['/']);
        };
    };

    ngOnInit() {
        this.subscriptions.route = this.route.params.subscribe(params => {
            this.project = params.project;

            this.list();
        });
    };

    ngOnDestroy() {
        this.subscriptions.route.unsubscribe();
    };

}