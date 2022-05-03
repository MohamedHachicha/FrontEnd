import { Component, ViewEncapsulation } from '@angular/core';
import { ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Conversation } from 'src/app/shared/model/conversation';
import { ConversationService } from 'src/app/shared/service/conversation.service';
import { Mail, MailboxService } from './mailbox.service';

@Component({
  selector: 'app-mailbox',
  templateUrl: './mailbox.component.html',
  styleUrls: ['./mailbox.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers:[ MailboxService ]
})
export class MailboxComponent {

  public mails: Array<any>;
  public mail: any;
  public newMail: boolean;
  public type:string = 'all';
  public searchText: string;

  public id!:any;
  listConvs:any;
  public listmsgs:any;
  public idconv:any;
  form : boolean = false;
   conv!: Conversation;
   closeResult! : string;
   public c: any;


  constructor(private mailboxService: MailboxService,private conversationService : ConversationService) { }

  ngOnInit() {
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
	    conversation_lastmessage!:null
         
  }
  }
  public getMails(){
      switch (this.type) {
          case 'all': 
              this.mails = this.mailboxService.getAllMails();
              break;
          case 'starred':
              this.mails =  this.mailboxService.getStarredMails();
              break;
          case 'sent':
              this.mails =  this.mailboxService.getSentMails();
              break;
          case 'drafts':
              this.mails =  this.mailboxService.getDraftMails();
              break;
          case 'trash':
              this.mails =  this.mailboxService.getTrashMails();
              break;
          default:
              this.mails =  this.mailboxService.getDraftMails();
      }  
  }

  public viewDetail(mail){
      this.mail = this.mailboxService.getMail(mail.id);    
      this.mails.forEach(m => m.selected = false);
      this.mail.selected = true;
      this.mail.unread = false;
      this.newMail = false;
  }
 
  public viewDetailconv(c,id){
    this.idconv=id;

 this.c = this.conversationService.getConversation(c.id); 
    console.log(this.idconv);
    this.conversationService.getmessages(id).subscribe(res => this.listmsgs = res);

    
}
  public compose(){
      this.mail = null;
      this.newMail = true;
  }

  public setAsRead(){
      this.mail.unread = false;
  }

  public setAsUnRead(){
      this.mail.unread = true;
  }

  public delete() {
      this.mail.trash = true;
      this.mail.sent = false;
      this.mail.draft = false; 
      this.mail.starred = false; 
      this.getMails(); 
      this.mail = null;
  }

  public changeStarStatus() {       
      this.mail.starred = !this.mail.starred;
      this.getMails(); 
  }

  public restore(){
      this.mail.trash = false;
      this.type = 'all';
      this.getMails();
      this.mail = null; 
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
//   this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
//     this.closeResult = `Closed with: ${result}`;
//   }, (reason) => {
//     this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
//   });
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
//   redirectTo(uri:string,id:Number){
//     this.route.navigateByUrl("msgs/"+id, {skipLocationChange: true}).then(()=>
//     this.route.navigate([uri]));
//  }
//   Afficher(id:Number)
//   {
//     this.idconv=id;
//     this.conversationService.getmessages(id).subscribe(res => this.listmsgs
//        = res)
 


//   }

}