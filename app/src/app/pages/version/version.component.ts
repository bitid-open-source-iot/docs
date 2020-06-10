import { Router, ActivatedRoute } from '@angular/router';
import { OnInit, Component, OnDestroy } from '@angular/core';
import { Document, DOCUMENT_DEFAULTS, DocumentationService } from 'src/app/services/documentation/documentation.service';

@Component({
    selector:       'app-version',
    styleUrls:      ['./version.component.scss'],
    templateUrl:    './version.component.html'
})

export class VersionComponent implements OnInit, OnDestroy {

    constructor(private route: ActivatedRoute, private router: Router, private service: DocumentationService) {};

    public loading:         boolean;
    public version:         string;
    public project:         string;
    public document:        Document = DOCUMENT_DEFAULTS;
    private subscriptions:  any = {};

    private async get() {
        this.loading = true;

        const response = await this.service.get({
            'version':  this.version,
            'project':  this.project
        });
        
        this.loading = false;

        if (!response.ok) {
            // show error
            this.router.navigate(['/']);
        };
    };

    ngOnInit() {
        this.subscriptions.route = this.route.params.subscribe(params => {
            this.version    = params.version;
            this.project    = params.project;
            
            if (this.project !== this.service.document.value.project.description || this.version !== this.service.document.value.version) {
                this.get();
            };
        });

        this.subscriptions.document = this.service.document.subscribe(document => {
            this.document = document;
        });
    };

    ngOnDestroy() {
        this.subscriptions.route.unsubscribe();
        this.subscriptions.document.unsubscribe();
    };

}