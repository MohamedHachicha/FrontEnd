import { OfferCategorie } from "./offer-categorie";

export class Offer {
    offer_id!: Number;
    offer_description!:String;
    offer_expiration_date!:Date;
    offer_categorie!:OfferCategorie;
    Offer_visibility!:Boolean;
    expired!:Boolean;
    offer_price!:Number;
    //O_customerAccount:List<CustomerAccount>;
}
