/*import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-claims',
  templateUrl: './claims.component.html',
  styleUrls: ['./claims.component.scss']
})
export class ClaimsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}*/
import { Component, OnInit } from '@angular/core';
import { Claim } from 'src/app/shared/model/claim';
import { ClaimService } from 'src/app/shared/services/claim-service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IMultiSelectOption, IMultiSelectSettings, IMultiSelectTexts } from 'angular-2-dropdown-multiselect';

@Component({
  selector: 'app-claims',
  templateUrl: './claims.component.html',
  styleUrls: ['./claims.component.scss']
})

export class ClaimsComponent implements OnInit {
  listClaims:any;
  form : boolean = false;
   claim!: Claim;
   lat: number = 45.421530 ;
   lng: number = -75.697193;
   zoom: number = 7;
   closeResult! : string;
   public firstControlModel: number[];
    public firstControlOptions: IMultiSelectOption[] = [
        { id: 1, name: 'Option 1' },
        { id: 2, name: 'Option 2' },
        { id: 3, name: 'Option 3' }
    ];

    public secondControlModel: number[];
    public secondControlSettings: IMultiSelectSettings = {
        checkedStyle: 'fontawesome',
        buttonClasses: 'btn btn-secondary btn-block',
        dynamicTitleMaxItems: 3,
        displayAllSelectedText: true,
        showCheckAll: true,
        showUncheckAll: true
    };
    public secondControlTexts: IMultiSelectTexts = {
        checkAll: 'Select all',
        uncheckAll: 'Unselect all',
        checked: 'item selected',
        checkedPlural: 'items selected',
        searchPlaceholder: 'Find',
        defaultTitle: 'Select countries',
        allSelected: 'All selected',
    };
    public secondControlOptions: IMultiSelectOption[] = [
      //automobile,vie,Habitation,epargne,Retraite,Chefdefamille,Santé,avenirdemesenfants,materielinformatique;

        { id: 1, name: 'Automobile'},
        { id: 2, name: 'Vie' },
        { id: 3, name: 'Habitation' },
        { id: 4, name: 'Epargne' },
        { id: 5, name: 'Retraite'},
        { id: 6, name: 'Chefdefamille' },
        { id: 7, name: 'Santé' },
        { id: 8, name: 'Avenir de mes enfants' },
        { id: 9, name: 'Materiel informatique' }

    ];


    public thirdControlModel: number[];
    public thirdControlSettings: IMultiSelectSettings = {
        enableSearch: true,
        checkedStyle: 'checkboxes',
        buttonClasses: 'btn btn-secondary btn-block',
        dynamicTitleMaxItems: 3,
        displayAllSelectedText: true
    };
    public thirdControlTexts: IMultiSelectTexts = {
        checkAll: 'Select all',
        uncheckAll: 'Unselect all',
        checked: 'item selected',
        checkedPlural: 'items selected',
        searchPlaceholder: 'Find...',
        defaultTitle: 'Select contract type',
        allSelected: 'All selected',
    };
    public thirdControlOptions: IMultiSelectOption[] = [
      { id: 1, name: 'Automobile'},
      { id: 2, name: 'Vie' },
      { id: 3, name: 'Habitation' },
      { id: 4, name: 'Epargne' },
      { id: 5, name: 'Retraite'},
      { id: 6, name: 'Chefdefamille' },
      { id: 7, name: 'Santé' },
      { id: 8, name: 'Avenir de mes enfants' },
      { id: 9, name: 'Materiel informatique' }
    ];
  constructor(private claimService : ClaimService, private modalService:NgbModal) { }

  ngOnInit(): void {
    this.getAllClaims();

    this.claim = {
      claim_id!:null,
    claim_description!:null,
    claim_state!:null,
    claim_type!:null,
    claim_contrat_type!:null,
    claim_visibility!:null,
    claim_date!:null,
    }
  }
  addProduct(p: any){
    this.claimService.addClaim(p).subscribe(() => {
      this.getAllClaims();
      this.form = false;
    });
  }
  getAllClaims(){
    this.claimService.getAllClaims().subscribe(res => this.listClaims = res)
  }
  editClaim(claim : Claim){
    this.claimService.editClaim(claim).subscribe();
  }
  deleteClaim(idClaim : any){
    this.claimService.deleteClaim(idClaim).subscribe(() => this.getAllClaims())
  }
  open(content: any) {
  this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
    this.closeResult = `Closed with: ${result}`;
  }, (reason) => {
    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  });
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
    return null;
  }
  closeForm(){

  }
  cancel(){
    this.form = false;
  }
}

 
