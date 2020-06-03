import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})

export class EntryService {

  // entry service controller
  baseUrl: string = 'https://localhost:44317/api/entries' 

  constructor(private http:HttpClient) { 
   
  }

  // get entry
  getEntry(id){
    return this.http.get(this.baseUrl + '/'+ id);
  }
  // get all entries
  getAll(){
    return this.http.get(this.baseUrl);
  };
  // create entry
  createEntry(entry){
    return this.http.post(this.baseUrl, entry);
  };
   // update entry
  updateEntry(id, entry){
    return this.http.put(this.baseUrl + '/' + id, entry);
  }
  
  // delete entry
  deleteEntry(id){
    return this.http.delete(this.baseUrl + '/' + id);
  }



}
