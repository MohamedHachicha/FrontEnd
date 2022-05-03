import { Component, OnInit } from "@angular/core";
import { Agent } from "src/app/shared/model/agent";
import { AgentService } from "src/app/shared/services/agent-service";
import { ModalDismissReasons, NgbModal, NgbModalRef } from "@ng-bootstrap/ng-bootstrap";
import { Bank } from "src/app/shared/model/bank";
import { BankService } from "src/app/shared/services/bank-service";
import { FormGroup } from "@angular/forms";
import { IMultiSelectSettings, IMultiSelectTexts } from "angular-2-dropdown-multiselect";

@Component({
  selector: "app-agents",
  templateUrl: "./agents.component.html",
  styleUrls: ["./agents.component.scss"],
})
export class AgentsComponent implements OnInit {
  agent: Agent = new Agent();
  bank: Bank = new Bank();
  bk: any;
  idrec: number;
  ag: any;
  closeResult = "";
  public searchText: string;
  public p:any;
  public type:string = 'grid';
  public modalRef: NgbModalRef;
  public form:FormGroup;
  constructor(
    public agentservice: AgentService,
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
    this.agentservice.getAllAgents().subscribe(
      (data) => {
        this.ag = data;
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
  saveAgent(id: number) {
    console.log(this.bk);
    console.log(this.agent);
    this.agentservice.addAgent(this.agent, id).subscribe(
      (data) => {
        console.log(data);
      },
      (err) => {
        console.log(err);
      }
    );
  }
  deleteAgent(id: number) {
    this.agentservice.deleteAgentById(id).subscribe(
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
  open2(content2, ag) {
    this.agent = ag;
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

  updateAgent() {
    this.agentservice.updateAgent(this.agent, this.agent.idAgent).subscribe(
      (data) => {
        console.log(data);
      },
      (err) => {
        console.log(err);
      }
    );
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
