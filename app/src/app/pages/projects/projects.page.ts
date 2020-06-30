import { Router } from '@angular/router';
import { MenuService } from 'src/app/services/menu/menu.service';
import { ToastService } from 'src/app/services/toast/toast.service';
import { SearchComponent } from 'src/app/components/search/search.component';
import { MatTableDataSource } from '@angular/material/table';
import { Project, ProjectsService } from 'src/app/services/projects/projects.service';
import { OnInit, Component, OnDestroy, ViewChild } from '@angular/core';

@Component({
    selector:       'app-projects-page',
    styleUrls:      ['./projects.page.scss'],
    templateUrl:    './projects.page.html'
})

export class ProjectsPage implements OnInit, OnDestroy {

    @ViewChild(SearchComponent, {'static': true}) private search: SearchComponent;

    constructor(public menu: MenuService, private toast: ToastService, private router: Router, private service: ProjectsService) {};

    public sort:            any         = {
        'key':      'description',
        'reverse':  false
    };
    public columns:         string[]    = ['icon', 'description'];
    public loading:         boolean;
    public projects:        any         = new MatTableDataSource();
    public subscriptions:   any         = {};

    private async list() {
        this.loading = true;

        const response = await this.service.list({
            'sort': {
                [this.sort.key]: (this.sort.reverse ? -1 : 1)
            },
            'filter': [
                'icon',
                'author',
                'projectId',
                'description'
            ]
        });

        this.loading = false;

        if (response.ok) {
            this.projects.data = response.result;
        } else {
            this.projects.data = [];
        };
    };

    ngOnInit(): void {
        this.list();

        this.projects.filterPredicate = (app: Project, filter: string) => app.description.indexOf(filter) != -1;

        this.subscriptions.search = this.search.change.subscribe(filter => {
            this.projects.filter = filter;
        });
    };

    ngOnDestroy(): void {
        this.subscriptions.search.unsubscribe();
    };

}