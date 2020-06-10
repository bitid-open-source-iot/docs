import { DocumentationService } from 'src/app/services/documentation/documentation.service';
import { Router, ActivatedRoute } from '@angular/router';
import { OnInit, Component, OnDestroy } from '@angular/core';

@Component({
    selector:       'app-endpoint',
    styleUrls:      ['./endpoint.component.scss'],
    templateUrl:    './endpoint.component.html'
})

export class EndpointComponent implements OnInit, OnDestroy {

    constructor(private route: ActivatedRoute, private router: Router, private service: DocumentationService) {};

    public loading:         boolean;
    public endpoint:        any = {
        'scopes': []
    };
    public version:         string;
    public project:         string;
    private routeId:        string;
    private endpointId:     string;
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
            this.routeId    = params.route;
            this.endpointId = params.endpoint;
            
            if (this.project !== this.service.document.value.project.description || this.version !== this.service.document.value.version) {
                this.get();
            };
        });

        this.subscriptions.document = this.service.document.subscribe(document => {
            if (document.version) {
                let found: boolean;

                document.routes.map(route => {
                    if (route.routeId.toLocaleLowerCase() == this.routeId) {
                        route.endpoints.map(endpoint => {
                            if (endpoint.endpointId.toLocaleLowerCase() == this.endpointId) {
                                found = true;
                                this.endpoint = endpoint;
                            };
                        });
                    };
                });

                if (!found) {
                    this.router.navigate(['/']);
                };
            };
        });
    };

    ngOnDestroy() {
        this.subscriptions.route.unsubscribe();
        this.subscriptions.document.unsubscribe();
    };

}