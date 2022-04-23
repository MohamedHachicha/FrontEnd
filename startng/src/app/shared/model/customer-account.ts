import { Credit } from "./credit";
import { Fidelite } from "./fidelite";
import { LoanSimulation } from "./loan-simulation";
import { StatutCustomer } from "./statut-customer";

export class CustomerAccount {

    idCustomerAccount!: number; //clé primaire
	
	cin!:number;
	
	FirstNameCustomer!:string;
	
	LastNameCustomer!:string;
	
	emailAccount!:string;

	statutCustomer!:StatutCustomer;

	fidelite!:Fidelite;
    
    SalaryCustomer!:number;
    

	creditsCustomer!:Set<Credit>;
    
    loanSimulatorsListCustomer!:Set<LoanSimulation>;
    
}
