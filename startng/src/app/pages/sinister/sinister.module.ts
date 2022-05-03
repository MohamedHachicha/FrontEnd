import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {DirectivesModule} from '../../theme/directives/directives.module';
import {FormsModule} from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ListSinisterComponent} from './list-sinister/list-sinister.component';
import {UpdateSinisterComponent} from './update-sinister/update-sinister.component';
import {AddSinisterComponent} from './add-sinister/add-sinister.component';


export const routes = [
    {path: '', redirectTo: 'list-sinister', pathMatch: 'full'},
    {path: 'list-sinister', component: ListSinisterComponent},
    {path: 'add-sinister', component: AddSinisterComponent},
    {path: 'update-sinister', component: UpdateSinisterComponent}

];

@NgModule({
    imports: [
        NgbModule,
        CommonModule,
        DirectivesModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [

        ListSinisterComponent,
        AddSinisterComponent,
        UpdateSinisterComponent

    ]
})
export class SinisterModule {
}
