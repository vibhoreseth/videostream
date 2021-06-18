import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VideoserviceService } from '../videoservice.service';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit {
  videosrc=" ";
  constructor(private vs:VideoserviceService,private route:ActivatedRoute) {
   
  }


  ngOnInit(): void {
    this.videosrc="http://localhost:3000/video/"+this.route.snapshot.params.url;
    console.log(this.videosrc);
   }
  }


