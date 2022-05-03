import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { PerfectScrollbarModule } from "ngx-perfect-scrollbar";
import { DragulaModule } from "ng2-dragula";
import { ResizableModule } from "angular-resizable-element";
import { DirectivesModule } from "../../theme/directives/directives.module";
import { BanksComponent } from "./banks/banks.component";
import { AgentsComponent } from "./agents/agents.component";
import { LoanSimulationsComponent } from "./loan-simulations/loan-simulations.component";
import { TransactionsComponent } from "./transactions/transactions.component";
import { CreditsComponent } from "./credits/credits.component";
import { Ng2SmartTableModule } from "ng2-smart-table";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { MultiselectDropdownModule } from "angular-2-dropdown-multiselect";
import { NgxPaginationModule } from "ngx-pagination";
import { PipesModule } from "src/app/theme/pipes/pipes.module";

export const routes = [
  { path: "banks", component: BanksComponent },
  { path: "agents", component: AgentsComponent },
  { path: "credits", component: CreditsComponent },
  { path: "loansimulations", component: LoanSimulationsComponent },
  { path: "transactions", component: TransactionsComponent },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    PerfectScrollbarModule,
    DragulaModule.forRoot(),
    ResizableModule,
    DirectivesModule,
    Ng2SmartTableModule,
    ReactiveFormsModule,
    NgbModule,
    MultiselectDropdownModule,
    NgxPaginationModule,
    PipesModule
  ],
  declarations: [
    BanksComponent,
    AgentsComponent,
    CreditsComponent,
    LoanSimulationsComponent,
    TransactionsComponent,
  ],
})
export class ToolsModule {}
