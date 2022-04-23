import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { DragulaModule } from 'ng2-dragula';
import { ResizableModule } from 'angular-resizable-element';
import { DirectivesModule } from '../../theme/directives/directives.module';
import { BanksComponent } from './banks/banks.component';
import { AgentsComponent } from './agents/agents.component';
import { LoanSimulationsComponent } from './loan-simulations/loan-simulations.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { CreditsComponent } from './credits/credits.component';



export const routes = [
  { path: '', redirectTo: 'banks', pathMatch: 'full'},
  { path: 'banks', component: BanksComponent },
  { path: 'agents', component: AgentsComponent},
  { path: 'credits', component: CreditsComponent},
  { path: 'loansimulations', component: LoanSimulationsComponent },
  { path: 'transactions', component: TransactionsComponent } 
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    PerfectScrollbarModule,
    DragulaModule.forRoot(),
    ResizableModule,
    DirectivesModule
  ],
  declarations: [
    BanksComponent,
    AgentsComponent,
    CreditsComponent,
    LoanSimulationsComponent,
    TransactionsComponent,
  ]
})
export class ToolsModule { }
