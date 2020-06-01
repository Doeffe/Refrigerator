import {RouterModule, Routes} from '@angular/router';
import { NgModule } from '@angular/core';

// components
import { EntriesComponent } from './entries/entries.component';
import { NewEntryComponent } from './new-entry/new-entry.component';
import { DeleteEntryComponent } from './delete-entry/delete-entry.component';
import { RegistreComponent } from './registre/registre.component';
import { LoginComponent } from './login/login.component';
import { IndexComponent } from './index/index.component';


// route 
const routes:Routes = [
    {path:'', component:IndexComponent}, 
    {path:'entries', component:EntriesComponent},
    {path:'new-entry', component:NewEntryComponent},
    {path:'delete-entry/:id', component:DeleteEntryComponent},
    {path:'registre', component:RegistreComponent},
    {path:'login', component:LoginComponent},
]

@NgModule({
    imports:[RouterModule.forRoot(routes)],
    exports:[RouterModule]
})

export class AppRouterModule {}