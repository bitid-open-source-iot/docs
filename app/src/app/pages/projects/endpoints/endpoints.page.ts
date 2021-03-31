import { MenuService } from 'src/app/services/menu/menu.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { ActivatedRoute } from '@angular/router';
import { SearchComponent } from 'src/app/components/search/search.component';
import { MatTableDataSource } from '@angular/material/table';
import { Documentation, DocumentationService } from 'src/app/services/documentation/documentation.service';
import { OnInit, Component, OnDestroy, ViewChild } from '@angular/core';

@Component({
    selector: 'app-project-endpoints',
    styleUrls: ['./endpoints.page.scss'],
    templateUrl: './endpoints.page.html'
})

export class ProjectEndpointsPage implements OnInit, OnDestroy {

    @ViewChild(SearchComponent, { 'static': true }) private search: SearchComponent;

    constructor(public menu: MenuService, private toast: ToastService, private route: ActivatedRoute, private service: DocumentationService) { };

    public columns: string[] = ['method', 'title', 'description'];
    public loading: boolean;
    public routeId: string;
    public version: string;
    public endpoints: any = new MatTableDataSource();
    public description: string;
    public documentation: Documentation = this.service.documentation.value;
    public subscriptions: any = {};

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
            'version': this.version,
            'description': this.description
        });

        this.loading = false;

        if (!response.ok) {
            this.toast.error('there was an issue loading docs!');
        };
    };

    ngOnInit(): void {
        this.subscriptions.route = this.route.params.subscribe(params => {
            this.routeId = params.routeId;
            this.version = params.version;
            this.description = params.description;
            if (typeof (this.documentation) != "undefined" && this.documentation != null) {
                if (this.documentation.version != this.version || this.documentation.project.description != this.description) {
                    this.get();
                };
            } else {
                this.get();
            };
        });

        this.subscriptions.search = this.search.change.subscribe(filter => {
            this.endpoints.filter = filter;
        });

        this.subscriptions.docs = this.service.documentation.subscribe(docs => {
            if (docs) {
                this.documentation = docs;
                for (let i = 0; i < docs.routes.length; i++) {
                    if (docs.routes[i].routeId == this.routeId) {
                        this.endpoints.data = docs.routes[i].endpoints;
                        break;
                    };
                };
            };
        });
    };

    ngOnDestroy(): void {
        this.subscriptions.route.unsubscribe();
        this.subscriptions.search.unsubscribe();
        this.subscriptions.docs.unsubscribe();
    };

}