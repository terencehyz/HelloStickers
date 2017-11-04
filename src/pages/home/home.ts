import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AudioPage } from "../audio/audio";
import { TextPage } from "../text/text";
import { VideoPage } from "../video/video";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  navToAudio(){
    this.navCtrl.push(AudioPage);
  }
  navToText(){
    this.navCtrl.push(TextPage);
  }
  navToVideo(){
    this.navCtrl.push(VideoPage);
  }

}
