import { Component, OnInit } from "@angular/core";
import { Credit } from "src/app/shared/model/credit";
import { CreditService } from "src/app/shared/services/credit-service";
import { ModalDismissReasons, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { TraitementCredit } from "src/app/shared/model/traitement-credit";
@Component({
  selector: "app-credits",
  templateUrl: "./credits.component.html",
  styleUrls: ["./credits.component.scss"],
})
export class CreditsComponent implements OnInit {
  credit: Credit = new Credit();
  cr: any;
  closeResult = "";
  idrec: number;
  idc = 1;
  public traitementCredit = TraitementCredit;
  constructor(
    public creditService: CreditService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.creditService.retrieveAllCredits().subscribe(
      (data) => {
        this.cr = data;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  saveCredit() {
    this.creditService.requestCreditCustomer(this.credit, this.idc).subscribe(
      (data) => {
        console.log(data);
      },
      (err) => {
        console.log(err);
      }
    );
  }
  deleteCredit(id: number) {
    this.creditService.suppCredit(id).subscribe(
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
  open2(content2, cr) {
    this.credit = cr;
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

  updateCredit() {
    this.creditService
      .refreshCredit(this.credit, this.credit.idCredit)
      .subscribe(
        (data) => {
          console.log(data);
        },
        (err) => {
          console.log(err);
        }
      );
  }
}
