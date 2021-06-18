import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VideoserviceService } from '../videoservice.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  videos;
  play(v){
    var url="/video/"+v.url;
    this.router.navigate([url]);
  }
  constructor(private serv:VideoserviceService,private router:Router){}
  ngOnInit(): void{
   this.serv.getVideoList().subscribe((res)=>{
     console.log(res);
     this.videos=res;
   });
  }
}
