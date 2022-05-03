import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
import { IMultiSelectOption, IMultiSelectSettings, IMultiSelectTexts } from 'angular-2-dropdown-multiselect';
import { ToastrService } from 'ngx-toastr';
import { Sinister } from 'src/app/shared/model/sinister';
import { SinisterService } from 'src/app/shared/sinister.service';
import { MenuService } from 'src/app/theme/components/menu/menu.service';

@Component({
  selector: 'app-add-sinister',
  templateUrl: './add-sinister.component.html',
  styleUrls: ['./add-sinister.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [ SinisterService,MenuService ]
})
export class AddSinisterComponent implements OnInit {
  public form:FormGroup= new FormGroup({});
  public p:any;
  public searchText: string;
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

        { id: 1, name: 'Ariana'},
        { id: 2, name: 'Béja' },
        { id: 3, name: 'Ben Arous' },
        { id: 4, name: 'Bizerte' },
        { id: 5, name: 'Gabès'},
        { id: 6, name: 'Gafsa' },
        { id: 7, name: 'Jendouba' },
        { id: 8, name: 'Kairouan' },
        { id: 9, name: 'Kasserine' },
        { id: 10, name: 'Kébili' },
        { id: 11, name: 'Kef' },
        { id: 12, name: 'Mahdia' },
        { id: 13, name: 'Manouba' },
        { id: 14, name: 'Médenine' },
        { id: 15, name: 'Monastir' },
        { id: 16, name: 'Nabeul' },
        { id: 17, name: 'Sfax' },
        { id: 18, name: 'Sidi Bouzid' },
        { id: 19, name: 'Siliana' },
        { id: 20, name: 'Sousse' },
        { id: 21, name: 'Tataouine' },
        { id: 22, name: 'Tozeur' },
        { id: 23, name: 'Tunis' },
        { id: 24, name: 'Zaghouan ' },

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
      { id: 1, name: 'Ariana'},
      { id: 2, name: 'Béja' },
      { id: 3, name: 'Ben Arous' },
      { id: 4, name: 'Bizerte' },
      { id: 5, name: 'Gabès'},
      { id: 6, name: 'Gafsa' },
      { id: 7, name: 'Jendouba' },
      { id: 8, name: 'Kairouan' },
      { id: 9, name: 'Kasserine' },
      { id: 10, name: 'Kébili' },
      { id: 11, name: 'Kef' },
      { id: 12, name: 'Mahdia' },
      { id: 13, name: 'Manouba' },
      { id: 14, name: 'Médenine' },
      { id: 15, name: 'Monastir' },
      { id: 16, name: 'Nabeul' },
      { id: 17, name: 'Sfax' },
      { id: 18, name: 'Sidi Bouzid' },
      { id: 19, name: 'Siliana' },
      { id: 20, name: 'Sousse' },
      { id: 21, name: 'Tataouine' },
      { id: 22, name: 'Tozeur' },
      { id: 23, name: 'Tunis' },
      { id: 24, name: 'Zaghouan ' }

    ];
  Sinister: { idSinister: any; sinisterStatus: any; sinisterPlace: any; declarationDate: any; sinisterDate: any; delaiDeclaration: any; IndemnisationDate: any; sinisterDescription: any; chargeSinister: any; causeRejet: any; sinisterType: any;  sinisterIndemnity:any};
  idSinister!:any;
  listSinisters:any;
  
   sinister: Sinister = new Sinister();
   lat: number = 45.421530 ;
   lng: number = -75.697193;
   zoom: number = 7;
   closeResult! : string;
  submitted: boolean;

  constructor(private sinisterService : SinisterService, 
    private fb: FormBuilder,
    private modalService:NgbModal,
    public toastrService: ToastrService
    ) { }
  ngOnInit(): void {
    this.form = this.fb.group({
      prenom: ['', Validators.required],
      nom: ['', Validators.required],
      cin: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
      lieu_cin: ['', Validators.required],
      date_cin: ['', Validators.required],
     
    },
   );
   
     this.getAllSinister();
     //console.log(this.listSinisters);
     this.Sinister={
      idSinister: null ,
      sinisterStatus: null ,
      sinisterPlace: null ,
      declarationDate:null ,
      sinisterDate:null ,
  
      delaiDeclaration:null ,
      IndemnisationDate:null ,
      sinisterDescription:null ,
      chargeSinister:null ,
      causeRejet:null ,
      sinisterType:null ,
      sinisterIndemnity:null ,
     }

  

  }
  getAllSinister() {
    this.sinisterService.getAllSinister().subscribe(res => this.listSinisters = res), console.log(this.listSinisters);
  }
  addSinister(s:any){
    this.sinisterService.addSinister(s).subscribe(() => {this.getAllSinister(),
     // this.form = false;
    console.log(s)});
  }
 
  deleteSinister(idSinister : Number){
    this.sinisterService.deleteSinister(idSinister).subscribe(() => this.getAllSinister())
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
      //this.form = false;
    }
    onSubmit() {
      this.submitted = true;
      if (this.form.invalid) {
        return;
      }

}
}
  

  