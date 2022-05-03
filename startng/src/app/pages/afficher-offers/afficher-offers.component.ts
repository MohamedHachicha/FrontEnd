import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Offer } from 'src/app/shared/model/offer';
import { OfferService } from 'src/app/shared/service/offer.service';

@Component({
  selector: 'app-afficher-offers',
  templateUrl: './afficher-offers.component.html',
  styleUrls: ['./afficher-offers.component.scss']
})
export class AfficherOffersComponent implements OnInit {

  
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
      offer_image!:null,
      offer_name!:null
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

}
