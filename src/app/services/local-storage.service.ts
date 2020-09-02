import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
    
  getBean(key: string) {
    const value = window.localStorage.getItem(key);

    if (value && value !== 'undefined') {
      return JSON.parse(value);
    }
    
    return null;
  }

  addBean(key: string, value: object) {
    if (typeof (value) === 'string') {
      window.localStorage.setItem(key, value);
      return;
    }
    window.localStorage.setItem(key, JSON.stringify(value))
  }

  deleteBean(key: string) {
    window.localStorage.removeItem(key);
  }

}
