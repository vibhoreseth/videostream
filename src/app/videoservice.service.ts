import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VideoserviceService {
  search;
  constructor(private http:HttpClient) { }
   
   getVideoList(){
     return this.http.get('http://localhost:3000/videolist');
   }

   getsearch(){
     return this.http.post('http://localhost:3000/search',{name:this.search});
   }
}
