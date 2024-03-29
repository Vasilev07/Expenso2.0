import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'expenso',
        pathMatch: 'full'
    },
    {
        path: 'user-settings',
        loadChildren: () => import('./user-settings/user-settings.module').then(m => m.UserSettingsModule)
    },
    {
        path: 'expenso',
        loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
        // canActivate: [AuthGuard]
    },
    {
        path: '**',
        redirectTo: 'expenso'
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {}
