import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BranchComponent } from './branch/branch.component';
import {BranchService} from "./branch.service";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";

@NgModule({
  declarations: [
    AppComponent,
    BranchComponent
  ],
  imports: [
    BrowserModule,HttpModule, FormsModule
  ],
  providers: [BranchService],
  bootstrap: [AppComponent]
})
export class AppModule { }
