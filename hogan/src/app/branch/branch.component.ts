import { Component, OnInit } from '@angular/core';
import {BranchService} from "../branch.service";
import {OAuth} from "../API/OAuth";
import {Transactions} from "../API/Transactions";

@Component({
  selector: 'ho-branch',
  templateUrl: './branch.component.html',
  styleUrls: ['./branch.component.css']
})
export class BranchComponent implements OnInit {

  private isBusy = true;
  private oauthCards:OAuth;
  private oauthDeposits:OAuth;

  constructor(private branchService: BranchService) { }

  ngOnInit() {
  }

  onBranches(){
    this.branchService.getBranches(this.oauthDeposits, 94523)
        .subscribe(
          (data) => {
            console.log(JSON.stringify(data));
          },
          e => {
            console.log(e);

          },
          () => this.isBusy = false);
  }

  onGetTransactions(){

    var account = "1234560002895";
    this.branchService.getTransactions(this.oauthCards, account)
        .subscribe(
          (data: Transactions) => {
            //console.log(JSON.stringify(data));
            console.log(`accountName: ${data.standardAccountInfo.accountName} transactionInfo: ${JSON.stringify(data.transactionInfo)} `);
          },
          e => {
            console.log(e);

          },
          () => this.isBusy = false);
  }

  onOauth(oauth:string){
    this.branchService.getOAuth(oauth)
        .subscribe(
          (data: OAuth) => {
            console.log(JSON.stringify(data));
            if(oauth === "CARDS"){
              this.oauthCards = data;
            }
            else {
              this.oauthDeposits = data;
            }
          },
          e => {
            console.log(e);

          },
          () => this.isBusy = false);
  }


}
