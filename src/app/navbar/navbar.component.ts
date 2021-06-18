import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VideoserviceService } from '../videoservice.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  searchv;
  constructor(private service:VideoserviceService,private router:Router) { }
 search(v){
  this.service.search=v;
  this.router.navigate(["search"]);
 }
  ngOnInit(): void {

  }

}
