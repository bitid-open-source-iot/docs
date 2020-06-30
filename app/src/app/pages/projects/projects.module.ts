import { NgModule } from '@angular/core';
import { ProjectsPage } from './projects.page';
import { CommonModule } from '@angular/common';
import { SearchModule } from 'src/app/components/search/search.module';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ProjectRoutesPage } from './routes/routes.page';
import { ProjectVersionsPage } from './versions/versions.page';
import { ProjectEndpointPage } from './endpoint/endpoint.page';
import { ProjectEndpointsPage } from './endpoints/endpoints.page';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ProjectsRoutingModule } from './projects-routing.module';

@NgModule({
    imports: [
        CommonModule,
        SearchModule,
        MatIconModule,
        MatMenuModule,
        MatTableModule,
        MatButtonModule,
        MatToolbarModule,
        MatProgressBarModule,
        ProjectsRoutingModule
    ],
    declarations: [
        ProjectsPage,
        ProjectRoutesPage,
        ProjectVersionsPage,
        ProjectEndpointPage,
        ProjectEndpointsPage
    ]
})

export class ProjectsModule {}