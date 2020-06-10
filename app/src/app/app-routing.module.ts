/* --- PAGES --- */
import { RouteComponent } from './pages/route/route.component';
import { SigninComponent } from './pages/signin/signin.component';
import { SignupComponent } from './pages/signup/signup.component';
import { VerifyComponent } from './pages/verify/verify.component';
import { ProjectComponent } from './pages/project/project.component';
import { VersionComponent } from './pages/version/version.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { EndpointComponent } from './pages/endpoint/endpoint.component';

/* --- MODULES --- */
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* --- SERVICES --- */
import { AuthManager } from './services/auth/auth.manager';

const routes: Routes = [
    {
        'path':         'signin',
        'component':    SigninComponent
    },
    {
        'path':         'signup',
        'component':    SignupComponent
    },
    {
        'path':         'verify',
        'component':    VerifyComponent
    },
    {
        'path':         ':project',
        'component':    ProjectComponent,
        'canActivate':  [AuthManager]
    },
    {
        'path':         ':project/:version',
        'component':    VersionComponent,
        'canActivate':  [AuthManager]
    },
    {
        'path':         ':project/:version/:route',
        'component':    RouteComponent,
        'canActivate':  [AuthManager]
    },
    {
        'path':         ':project/:version/:route/:endpoint',
        'component':    EndpointComponent,
        'canActivate':  [AuthManager]
    },
    {
        'path':         '**',
        'component':    ProjectsComponent,
        'canActivate':  [AuthManager]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {}