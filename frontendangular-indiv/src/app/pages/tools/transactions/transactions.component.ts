import { Component, OnInit } from "@angular/core";
import { TransactionCredit } from "src/app/shared/model/transaction-credit";
import { TransactionCreditService } from "src/app/shared/services/transaction-credit-service";
import { ModalDismissReasons, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Credit } from "src/app/shared/model/credit";
import { CreditService } from "src/app/shared/services/credit-service";
@Component({
  selector: "app-transactions",
  templateUrl: "./transactions.component.html",
  styleUrls: ["./transactions.component.scss"],
})
export class TransactionsComponent implements OnInit {
  transactionCredit: TransactionCredit = new TransactionCredit();
  tc: any;
  credit: Credit = new Credit();
  cr: any;
  closeResult = "";
  idrec: number;
  constructor(
    public transactionCreditService: TransactionCreditService,
    public creditService: CreditService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.transactionCreditService.retrieveAllTransactions().subscribe(
      (data) => {
        this.tc = data;
      },
      (err) => {
        console.log(err);
      }
    );
    this.creditService.retrieveAllCredits().subscribe(
      (data) => {
        this.cr = data;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  saveTransactionCredit(idCredit: number) {
    this.transactionCreditService
      .passerUnVirement(this.transactionCredit, idCredit)
      .subscribe(
        (data) => {
          console.log(data);
        },
        (err) => {
          console.log(err);
        }
      );
  }
  deleteTransactionCredit(id: number) {
    this.transactionCreditService.suppTransaction(id).subscribe(
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
  open2(content2, tc) {
    this.transactionCredit = tc;
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

  updateTransactionCredit() {
    this.transactionCreditService
      .updateTransaction(
        this.transactionCredit,
        this.transactionCredit.idTransaction
      )
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
