import { MenuService } from 'src/app/services/menu/menu.service';
import { ActivatedRoute } from '@angular/router';
import { SearchComponent } from 'src/app/components/search/search.component';
import { MatTableDataSource } from '@angular/material/table';
import { DocumentationService } from 'src/app/services/documentation/documentation.service';
import { OnInit, Component, OnDestroy, ViewChild } from '@angular/core';

@Component({
    selector:       'app-project-versions',
    styleUrls:      ['./versions.page.scss'],
    templateUrl:    './versions.page.html'
})

export class ProjectVersionsPage implements OnInit, OnDestroy {
    
    @ViewChild(SearchComponent, {'static': true}) private search: SearchComponent;

    constructor(public menu: MenuService, private route: ActivatedRoute, private service: DocumentationService) {};

    public sort:            any         = {
        'key':      'version',
        'reverse':  false
    };
    public columns:         string[]    = ['version', 'date'];
    public loading:         boolean;
    public versions:        any         = new MatTableDataSource();
    public description:     string;
    public subscriptions:   any         = {};

    private async list() {
        this.loading = true;

        const response = await this.service.list({
            'sort': {
                [this.sort.key]: (this.sort.reverse ? -1 : 1)
            },
            'filter': [
                'date',
                'version',
                'project',
                'documentId'
            ],
            'description': this.description
        });

        this.loading = false;

        if (response.ok) {
            this.versions.data = response.result;
        } else {
            this.versions.data = [];
        };
    };

    ngOnInit(): void {
        this.subscriptions.route = this.route.params.subscribe(params => {
            this.description = params.description;
            this.list();
        });

        this.subscriptions.search = this.search.change.subscribe(filter => {
            this.versions.filter = filter;
        });
    };

    ngOnDestroy(): void {
        this.subscriptions.route.unsubscribe();
        this.subscriptions.search.unsubscribe();
    };

}