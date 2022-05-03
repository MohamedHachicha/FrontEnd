import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IMultiSelectOption, IMultiSelectSettings, IMultiSelectTexts } from 'angular-2-dropdown-multiselect';
import { ToastrService } from 'ngx-toastr';
import { Sinister } from 'src/app/shared/model/sinister';
import { SinisterStatus } from 'src/app/shared/model/sinister-status';
import { SinisterService } from 'src/app/shared/services/sinister.service';
import { MenuService } from 'src/app/theme/components/menu/menu.service';
import { IPlace } from './place.interface';
import {cloneDeep} from 'lodash';

@Component({
  selector: 'app-sinisters',
  templateUrl: './sinisters.component.html',
  styleUrls: ['./sinisters.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [SinisterService, MenuService]
})
export class SinistersComponent implements OnInit {
  public place:Array<IPlace>=[ { id: 1, name: 'Tunis' },
  { id: 2, name: 'Gafsa ' },
  { id: 3, name: 'Ben arous ' },
  { id: 4, name: 'Nabeul ' },
  { id: 5, name: ' kassrine' },
  { id: 6, name: 'Mannouba ' },
  { id: 7, name: 'Ariana ' },
  { id: 8, name: 'Mednine ' },
  { id: 9, name: 'Tozeur' }
];
public placeId:number=1;


  formGroupEdit: FormGroup = new FormGroup({});
  formGroupAdd: FormGroup = new FormGroup({});
  public p: any;
  public searchText: string;
  submitted = Boolean;

  public SinisterStatusEnum = SinisterStatus;
  public sinsisterStatus = SinisterStatus;


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
      {id: 1, name: 'Option 1'},
      {id: 2, name: 'Option 2'},
      {id: 3, name: 'Option 3'}
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


  Sinister: { idSinister: any; sinisterStatus: any; sinisterPlace: any; declarationDate: any; sinisterDate: any; delaiDeclaration: any; IndemnisationDate: any; sinisterDescription: any; chargeSinister: any; causeRejet: any; sinisterType: any; sinisterIndemnity: any };
  idSinister!: any;
  listSinisters: any;

  sinister: Sinister = new Sinister();
  lat: number = 45.421530;
  lng: number = -75.697193;
  zoom: number = 7;
  closeResult!: string;


  constructor(private sinisterService: SinisterService,
              private fb: FormBuilder,
              private modalService: NgbModal,
              private router: Router,
              private toastrService: ToastrService
  ) {
  }

  ngOnInit(): void {


      this.formGroupEdit = this.fb.group({
          idSinister: [''],
          sinisterType: [''],
          sinisterStatus: [''],
          sinisterPlace: [''],
          declarationDate: [''],
          sinisterDate: [''],
          chargeSinister: ['']
      });

      this.sinisterService.getAllSinister().subscribe(res => {
          this.listSinisters = res;
      });

      // console.log(this.listSinisters);


  }

  public resetplace(){
      this.placeId=1;
  }

  getAllSinister() {
      this.sinisterService.getAllSinister().subscribe(res => this.listSinisters = res), console.log(this.listSinisters);
  }

  addSinister(s: any) {

      // let date = new Date(this.sinister.sinisterDate.getFullYear(), this.sinister.sinisterDate.getMonth(), this.sinister.sinisterDate.getDay());
      // this.sinister.sinisterDate = date;
      console.log(this.sinister);
      this.sinister.tempDeclarationDate = new Date(this.sinister.declarationDate).getTime().toString();
      this.sinister.tempSinisterDate = new Date(this.sinister.sinisterDate).getTime().toString();
      this.sinisterService.addSinister(this.sinister).subscribe(() => {
          this.getAllSinister();
          // this.form = false;

      });
  }


  get f() {
      return this.formGroupAdd.controls;
  }

  updateSinister() {

      // this.formGroup.controls['id'].setValue(sinister.idSinister);
      // this.formGroup.controls['sinisterType'].setValue(sinister.sinisterType);
      // this.formGroup.controls['sinisterPlace'].setValue(sinister.sinisterPlace);
      // this.formGroup.controls['declarationDate'].setValue(sinister.declarationDate);
      // this.formGroup.controls['sinisterDate'].setValue(sinister.sinisterDate);
      // this.formGroup.controls['chargeSinister'].setValue(sinister.chargeSinister);


      console.log(this.sinister);
      this.sinisterService.editSinister(this.sinister.idSinister, this.sinister).subscribe(res => {
              this.ngOnInit();
          },
          (err) => {
              this.ngOnInit();
          }
      );
  }

  deleteSinister(idSinister: any) {
      this.sinisterService.deleteSinister(idSinister).subscribe((data) => {
              console.log(true);
              this.ngOnInit();
          },
          (err) => {
              this.ngOnInit();
          }
      );
  }


  open(content: any) {
      this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
          this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
  }

  open1(content: any) {
      this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title1'}).result.then((result) => {
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
          return `with: ${reason}`;
      }
      return null;
  }

  closeForm() {

  }

  cancel() {
      // this.form = false;
  }

  // onSubmit() {
  //     this.submitted = true;
  //     if (this.formGroupAdd.invalid) {
  //         return;
  //     }
  //
  // }

  initUpdate(p) {
      this.sinister = cloneDeep(p);
  }
}