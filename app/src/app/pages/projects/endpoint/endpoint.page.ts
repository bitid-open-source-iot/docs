import { MenuService } from 'src/app/services/menu/menu.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { ActivatedRoute } from '@angular/router';
import { OnInit, Component, OnDestroy } from '@angular/core';
import { Documentation, DocumentationService } from 'src/app/services/documentation/documentation.service';

@Component({
    selector:       'app-project-endpoint',
    styleUrls:      ['./endpoint.page.scss'],
    templateUrl:    './endpoint.page.html'
})

export class ProjectEndpointPage implements OnInit, OnDestroy {
    
    constructor(public menu: MenuService, private toast: ToastService, private route: ActivatedRoute, private service: DocumentationService) {};

    public loading:         boolean;
    public routeId:         string;
    public version:         string;
    public endpoint:        any;
    public endpointId:      string;
    public description:     string;
    public documentation:   Documentation   = this.service.documentation.value;
    public subscriptions:   any             = {};

    public copy(json) {
        const input         = document.createElement("input");
        input.value         = JSON.stringify(json);
        input.style.opacity = '0';
        document.body.appendChild(input);
        input.select();
        document.execCommand("copy");
        document.body.removeChild(input);
    };

    private async get() {
        this.loading = true;

        const response = await this.service.get({
            'filter': [
                'date',
                'routes',
                'version',
                'project',
                'documentId'
            ],
            'version':      this.version,
            'description':  this.description
        });

        this.loading = false;

        if (!response.ok) {
            this.toast.error('there was an issue loading documentation!');
        };
    };

    ngOnInit(): void {
        this.subscriptions.route = this.route.params.subscribe(params => {
            this.routeId        = params.routeId;
            this.version        = params.version;
            this.endpointId     = params.endpointId;
            this.description    = params.description;
            if (typeof(this.documentation) != "undefined" && this.documentation != null) {
                if (this.documentation.version != this.version || this.documentation.project.description != this.description) {
                    this.get();
                };
            } else {
                this.get();
            };
        });

        this.subscriptions.documentation = this.service.documentation.subscribe(documentation => {
            if (documentation) {
                let found = false;
                this.documentation = documentation;
                for (let a = 0; a < documentation.routes.length; a++) {
                    if (documentation.routes[a].routeId == this.routeId) {
                        for (let b = 0; b < documentation.routes[a].endpoints.length; b++) {
                            if (documentation.routes[a].endpoints[b].endpointId == this.endpointId) {
                                found = true;
                                this.endpoint = documentation.routes[a].endpoints[b];
                                break;
                            };
                        };
                        break;
                    };
                };
                if (!found) {
                    this.toast.error('could not find this endpoint!');
                };
            };
        });
    };

    ngOnDestroy(): void {
        this.subscriptions.route.unsubscribe();
        this.subscriptions.documentation.unsubscribe();
    };

}