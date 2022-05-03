import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { id } from '@swimlane/ngx-charts';
import { ConversationService } from 'src/app/shared/service/conversation.service';

@Component({
  selector: 'app-msgs',
  templateUrl: './msgs.component.html',
  styleUrls: ['./msgs.component.scss']
})
export class MsgsComponent implements OnInit {
 @Input() public listmsgs:any;
  listmsg:any;
@Input() idconv:any;
constructor(private conversationService : ConversationService,   private route: ActivatedRoute,
  private modalService:NgbModal) { }
  // this.route.snapshot.params.id
  ngOnInit(): void {
    this.getmessages(this.route.snapshot.params.id)

  }
  getmessages(id:Number){
    this.conversationService.getmessages(id).subscribe(res => this.listmsgs = res)
    console.log(id);
  }
}
