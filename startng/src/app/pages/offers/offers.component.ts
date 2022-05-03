import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Offer } from 'src/app/shared/model/offer';
import { OfferService } from 'src/app/shared/service/offer.service';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.scss']
})
export class OffersComponent implements OnInit {

  id!:any;
  listOffers:any;
  form : boolean = false;
   offer!: Offer;
   closeResult! : string;
   type!:string;
 
  constructor(private offerService : OfferService, private modalService:NgbModal) { }

  ngOnInit(): void {
    this.getAllOffers();
    this.offer = {
      offer_id!: null,
      offer_description!:null,
      offer_expiration_date!:null,
      offer_categorie!:null,
      Offer_visibility!:null,
      expired!:null,
      offer_price!:null,
      offer_name!:null,
    offer_image!:null
    }
  }
  getAllOffers(){
    this.offerService.getAllOffers().subscribe(res => this.listOffers = res)
  }
  addoffer(p: Offer){
    this.offerService.addOffer(p).subscribe(() => {
      this.getAllOffers();
     // this.form = false;
    });
  }

  editOffer(offer : Offer){
    this.offerService.editOffer(offer).subscribe();
  }
  deleteOffer(idOffer : Number){
    this.offerService.deleteOffer(idOffer).subscribe(() => this.getAllOffers())
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
