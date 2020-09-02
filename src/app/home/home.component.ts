import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { LocalStorageService } from '../services/local-storage.service';
import { Constants } from './../constants'
import { SearchComponent } from '../search/search.component';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private localStorageService: LocalStorageService) { }

  zipCodes: Array<string>;

  ngOnInit(): void {
    console.log("home init")
    this.getZipCodes();
  }

  ngAfterViewInit() {
    console.log("home after view init")
  }

  getZipCodes() {
    this.zipCodes = this.localStorageService.getBean(Constants.ZIP_LIST);  
  }

  addNewZip($event) {
    this.getZipCodes();
  }

  deleteZip(zipCode:string) {
    var index = this.zipCodes.indexOf(zipCode);
    this.zipCodes.splice(index, 1);  
    this.localStorageService.addBean(Constants.ZIP_LIST, this.zipCodes);
    this.localStorageService.deleteBean(zipCode);
  }

}
