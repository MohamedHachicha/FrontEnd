import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Conversation } from 'src/app/shared/model/conversation';
import { ConversationService } from 'src/app/shared/service/conversation.service';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.scss']
})
export class ChatsComponent implements OnInit {

  id!:any;
  listConvs:any;
  listmsgs:any;
   idconv:any;
  form : boolean = false;
   conv!: Conversation;
   closeResult! : string;
   type!:string;
 
  constructor(private conversationService : ConversationService, private modalService:NgbModal ,private route: Router) { }

  ngOnInit(): void {
    this.getAllConversations();
    this.idconv=-1;
    this.conv = {
      conversation_id!:null,
      conversation_members!:null,
      conversation_nonmembers!:null,
      conversation_visibility!:null,
      conversation_type!:null,
      conversation_name!:null,
      conversation_image!:null,
      conversation_lastmessage!:null, 
    }
  }
  getAllConversations(){
    this.conversationService.getConv().subscribe(res => this.listConvs = res)
  }
  getConversation(id:Number){
    this.conversationService.getmessages(id).subscribe(res => this.listmsgs = res)
  }
  addconversation(p: Conversation){
    this.conversationService.addConversation(p).subscribe(() => {
      this.getAllConversations();
     // this.form = false;
    });
  }

  editConversation(conversation : Conversation){
    this.conversationService.editConversation(conversation).subscribe();
  }
  deleteConversation(idConversation : Number){
    this.conversationService.deleteConversation(idConversation).subscribe(() => this.getAllConversations())
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
  redirectTo(uri:string,id:Number){
    this.route.navigateByUrl("msgs/"+id, {skipLocationChange: true}).then(()=>
    this.route.navigate([uri]));
 }
  Afficher(id:Number)
  {
    this.idconv=id;
    this.conversationService.getmessages(id).subscribe(res => this.listmsgs
       = res)
 


  }
}
