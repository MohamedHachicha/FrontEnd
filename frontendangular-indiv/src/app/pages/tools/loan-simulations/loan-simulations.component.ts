import { Component, OnInit } from "@angular/core";
import { LoanSimulation } from "src/app/shared/model/loan-simulation";
import { LoanSimulationService } from "src/app/shared/services/loan-simulation-service";
import { ModalDismissReasons, NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { Bank } from "src/app/shared/model/bank";
import { BankService } from "src/app/shared/services/bank-service";
import { FormGroup } from "@angular/forms";
import { IMultiSelectSettings, IMultiSelectTexts } from "angular-2-dropdown-multiselect";
@Component({
  selector: "app-loan-simulations",
  templateUrl: "./loan-simulations.component.html",
  styleUrls: ["./loan-simulations.component.scss"],
})
export class LoanSimulationsComponent implements OnInit {
  loanSimulation: LoanSimulation = new LoanSimulation();
  ls: any;
  idrec: number;
  nameBank: string;
  nbrAnnee: number;
  salaire: number;
  closeResult = "";
  bank: Bank = new Bank();
  bk: any;
  public searchText: string;
  public p:any;
  public type:string = 'grid';
  public modalRef: NgbModalRef;
  public form:FormGroup;
  constructor(
    public loanSimulationService: LoanSimulationService,
    private modalService: NgbModal,
    public bankservice: BankService
  ) {}


  public menuSelectSettings: IMultiSelectSettings = {
    enableSearch: true,
    checkedStyle: 'fontawesome',
    buttonClasses: 'btn btn-secondary btn-block',
    dynamicTitleMaxItems: 0,
    displayAllSelectedText: true,
    showCheckAll: true,
    showUncheckAll: true
};
public menuSelectTexts: IMultiSelectTexts = {
    checkAll: 'Select all',
    uncheckAll: 'Unselect all',
    checked: 'menu item selected',
    checkedPlural: 'menu items selected',
    searchPlaceholder: 'Find menu item...',
    defaultTitle: 'Select menu items for user',
    allSelected: 'All selected',
};


  ngOnInit(): void {
    this.loanSimulationService.getAllSimulations().subscribe(
      (data) => {
        this.ls = data;
      },
      (err) => {
        console.log(err);
      }
    );
    this.bankservice.getAllBanks().subscribe(
      (data) => {
        this.bk = data;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  saveLoanSimulation(nameBank: string, nbrAnnee: number, salaire: number) {
    this.loanSimulationService
      .addSimulation(1, 1, nameBank, nbrAnnee, salaire)
      .subscribe(
        (data) => {
          console.log(data);
        },
        (err) => {
          console.log(err);
        }
      );
  }
  deleteLoanSimulation(id: number) {
    this.loanSimulationService.deleteSimulationById(id).subscribe(
      (data) => {
        console.log(true);
        this.ngOnInit();
      },
      (err) => {
        console.log(err);
      }
    );
  }
  open(content) {
    this.modalService
      .open(content, { ariaLabelledBy: "modal-basic-title" })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }
  open2(content2, ls) {
    this.loanSimulation = ls;
    this.modalService
      .open(content2, { ariaLabelledBy: "modal-basic-title" })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return `with: ${reason}`;
    }
  }
  public toggle(type){
    this.type = type;
  }

  public openMenuAssign(event){
    let parent = event.target.parentNode;
    while (parent){
      parent = parent.parentNode;
      if(parent.classList.contains('content')){
        parent.classList.add('flipped');
        parent.parentNode.parentNode.classList.add('z-index-1');
        break;
      }
    }
  }

  public closeMenuAssign(event){
    let parent = event.target.parentNode;
    while (parent){
      parent = parent.parentNode;
      if(parent.classList.contains('content')){
        parent.classList.remove('flipped');
        parent.parentNode.parentNode.classList.remove('z-index-1');
        break;
      }
    }
  }


  

  public closeModal(){
    this.modalRef.close();
  }
}
