import {RouterModule, Routes} from '@angular/router';

// components
import { EntriesComponent } from './entries/entries.component';
import { NgModule } from '@angular/core';
import { NewEntryComponent } from './new-entry/new-entry.component';


// route 
const routes:Routes = [
    {path:'', component:EntriesComponent}, 
    {path:'entries', component:EntriesComponent},
    {path:'new-entry', component:NewEntryComponent},
]

@NgModule({
    imports:[RouterModule.forRoot(routes)],
    exports:[RouterModule]
})

export class AppRouterModule {}