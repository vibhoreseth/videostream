import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VideoserviceService } from '../videoservice.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  videos;
  play(v){
    var url="/video/"+v.url;
    this.router.navigate([url]);
  }
  constructor(private serv:VideoserviceService,private router:Router){}
  ngOnInit(): void{
   this.serv.getsearch().subscribe((res)=>{
     console.log(res);
     this.videos=res;
   });
  }
}

