import {Component, OnInit, TemplateRef} from '@angular/core';
import {Customer} from "./customer";
import {CustomerService} from "./customers.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {error} from "protractor";

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {
  listCustomers: any;
  form: boolean =false;
  customer!: Customer;
  closeResult!: string;
  public colorScheme = {
    domain: ['#2F3E9E', '#D22E2E', '#378D3B', '#0096A6', '#F47B00', '#606060']
  };
  public single: any[]=[]
  constructor(private customerService: CustomerService, private modalService: NgbModal) {

  }
  public onSelect(event) {
    console.log(event);
  }
  ngOnInit(): void {

    this.getAllCustomers();
    this.getStatique()

  }

  public getAllCustomers() {
    this.customerService.showCustomers().subscribe(res=> {
      this.listCustomers = res

    })
  }
  getStatique(){
    this.customerService.customerscorestat().subscribe(res=> {
      console.log("ressss",res)
      res.forEach(element =>{
        this.single.push({"name":element.scoreTypeName,"value":element.percent})
      })
      console.log("this.single",this.single)
    })
  }
  public editCustomer(customer: TemplateRef<any>){
    this.customerService.editCustomer(customer).subscribe();
  }
  update(e){
    console.log("update ",e)
    let param =e.oldData
    if(e.newData.birthDate) param.birthDate=e.newData.birthDate
    if(e.newData.firstName) param.firstName=e.newData.firstName
    if(e.newData.lastName) param.lastName=e.newData.lastName
    if(e.newData.phoneNumber) param.phoneNumber=e.newData.phoneNumber
    if(e.newData.cin) param.cin=e.newData.cin
    if(e.newData.gender) param.gender=e.newData.gender
    if(e.newData.monthlyIncome) param.monthlyIncome=e.newData.monthlyIncome
    if(e.newData.job) param.job=e.newData.job
    if(e.newData.governorate) param.governorate=e.newData.governorate
    if(e.newData.email) param.email=e.newData.email
    this.customerService.editCustomer(param).subscribe(res=>{
      console.log("ok")
    }),error=>{
        console.log("error")
    }


  }
  add(e){
    console.log("add ",e)
    this.customerService.registrationCustomer(e.data).subscribe(res=>{
      console.log("ok")
    }),error=>{
      console.log("error")
    }
  }
  delete(e){

  }
}
2
