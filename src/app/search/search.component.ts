import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LocalStorageService } from '../services/local-storage.service';
import { Constants } from '../constants';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private localStorageService: LocalStorageService) { }

  public zipList: Array<string>;

  @Output() newZip = new EventEmitter<string>();

  ngOnInit(): void {
  }

  addLocation(zipValue: string){
    if(zipValue.length != 5){
      alert("Please insert a valid zip code.");
      return;
    }
    let zipListFromStorage = this.localStorageService.getBean(Constants.ZIP_LIST);
    if (typeof zipListFromStorage !== 'undefined' && zipListFromStorage) {
      this.zipList = <Array<string>> zipListFromStorage;
    }
    if(!this.zipList){
      this.zipList = new Array<string>();
    }
    if(!this.zipList.includes(zipValue)){
      this.zipList.push(zipValue);
      this.localStorageService.addBean(Constants.ZIP_LIST, this.zipList);
      this.newZip.emit(zipValue);
      return;
    }
    alert("Zipcode " + zipValue + " already here.");
  }

}
