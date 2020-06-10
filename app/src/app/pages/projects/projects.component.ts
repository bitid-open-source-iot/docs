import { ProjectsService } from 'src/app/services/projects/projects.service';
import { OnInit, Component, HostListener } from '@angular/core';

@Component({
    selector:       'app-projects',
    styleUrls:      ['./projects.component.scss'],
    templateUrl:    './projects.component.html'
})

export class ProjectsComponent implements OnInit {

    constructor(private service: ProjectsService) {};

    @HostListener('window:resize', ['$event']) doresize(event) {
        this.resize(window.innerWidth);
    };

    public cols:        number  = 5;
    public loading:     boolean;
    public projects:    any[]   = [];

    public go(url) {
        window.open(url, '_blank');
    };

    private async list() {
        this.loading = true;

        const response = await this.service.list({
            'filter': [
                'icon',
                'projectId',
                'description'
            ]
        });

        this.loading = false;

        if (response.ok) {
            this.projects = response.result;
        };
    };

    private resize(width) {
        if (width <= 350) {
            this.cols = 1;
        } else if (width > 350 && width <= 600) {
            this.cols = 2;
        } else if (width > 600 && width <= 900) {
            this.cols = 3;
        } else if (width > 900 && width <= 1200) {
            this.cols = 4;
        } else if (width > 1200 && width <= 1500) {
            this.cols = 5;
        } else {
            this.cols = 6;
        };
    };

    ngOnInit() {
        this.resize(window.innerWidth);

        this.list();
    };

}