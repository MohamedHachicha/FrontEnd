import { Component, OnInit } from "@angular/core";
import { Agent } from "src/app/shared/model/agent";
import { AgentService } from "src/app/shared/services/agent-service";
import { Router } from "@angular/router";
@Component({
  selector: "app-agents",
  templateUrl: "./agents.component.html",
  styleUrls: ["./agents.component.scss"],
})
export class AgentsComponent implements OnInit {
  agent: Agent = new Agent();
  ag: any;
  constructor(public agentservice: AgentService, public router: Router) {}

  ngOnInit(): void {
    this.agentservice.getAllAgents().subscribe(
      (data) => {
        this.ag = data;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  saveAgent(idbank: number) {
    this.agentservice.addAgent(this.agent, idbank).subscribe(
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
  onUpdateAgent(id: number) {
    this.agentservice.updateAgent(this.agent, id).subscribe(
      (data) => {
        console.log(data);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
