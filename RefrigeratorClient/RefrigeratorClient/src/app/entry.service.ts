import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})

export class EntryService {

  // entry service controller
  baseUrl: string = 'https://localhost:44317/api/entries'

  constructor(private http:HttpClient) { }

  getAll(){
    return this.http.get(this.baseUrl);
  };

  createEntry(entry){
    return this.http.post(this.baseUrl, entry);
  };
}
