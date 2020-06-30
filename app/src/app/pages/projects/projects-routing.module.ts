import { NgModule } from '@angular/core';
import { ProjectsPage } from './projects.page';
import { ProjectRoutesPage } from './routes/routes.page';
import { ProjectVersionsPage } from './versions/versions.page';
import { ProjectEndpointPage } from './endpoint/endpoint.page';
import { Routes, RouterModule } from '@angular/router';
import { ProjectEndpointsPage } from './endpoints/endpoints.page';

const routes: Routes = [
    {
        'path':         '',
        'component':    ProjectsPage
    },
    {
        'path':         ':description',
        'component':    ProjectVersionsPage
    },
    {
        'path':         ':description/:version',
        'component':    ProjectRoutesPage
    },
    {
        'path':         ':description/:version/:routeId',
        'component':    ProjectEndpointsPage
    },
    {
        'path':         ':description/:version/:routeId/:endpointId',
        'component':    ProjectEndpointPage
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class ProjectsRoutingModule {}