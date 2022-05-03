import { Component, OnInit } from "@angular/core";
import { Bank } from "src/app/shared/model/bank";
import { BankService } from "src/app/shared/services/bank-service";
import { ModalDismissReasons, NgbModal } from "@ng-bootstrap/ng-bootstrap";
@Component({
  selector: "app-banks",
  templateUrl: "./banks.component.html",
  styleUrls: ["./banks.component.scss"],
})
export class BanksComponent implements OnInit {
  bank: Bank = new Bank();
  bk: any;
  closeResult = "";
  idrec: number;
  constructor(
    public bankService: BankService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.bankService.getAllBanks().subscribe(
      (data) => {
        this.bk = data;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  saveBank() {
    console.log(this.bank);
    this.bankService.addBank(this.bank).subscribe(
      (data) => {
        console.log(data);
      },
      (err) => {
        console.log(err);
      }
    );
  }
  deleteBank(id: number) {
    this.bankService.deleteBankById(id).subscribe(
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
  open2(content2, bk) {
    this.bank = bk;
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
  updateBank() {
    console.log(this.bank);
    this.bankService.updateBank(this.bank, this.bank.idBank).subscribe(
      (data) => {
        console.log(data);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
