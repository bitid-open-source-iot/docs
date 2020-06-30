import { NgModule } from '@angular/core';
import { AuthManager } from './services/account/account.manager';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        'path':         'signin',
        'loadChildren': () => import('./pages/signin/signin.module').then(m => m.SigninModule)
    },
    {
        'path':         '',
        'canActivate':  [AuthManager],
        'loadChildren': () => import('./pages/projects/projects.module').then(m => m.ProjectsModule)
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {}