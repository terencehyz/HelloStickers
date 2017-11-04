import { Injectable } from '@angular/core';
import { Media, MediaObject} from "@ionic-native/media";
import 'rxjs/add/operator/map';

/*
  Generated class for the RecorderProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RecorderProvider {

  media: MediaObject;
  mediaList: MediaObject[]= [];

  constructor(private mediaplugin: Media) {
    const onStatusUpdate = (status) => console.log(status);
    const onSuccess = () => console.log('Action is successful.'); //Param2
    const onError = (error) => console.error(error.message);      //Param3
    this.media = this.mediaplugin.create('record.wav');
  }

  onStartRecord(){
    this.mediaList == null ? this.mediaList[0].release():[];
    this.media.startRecord();
  }

  onStopRecord(){
    this.media.stopRecord();
    this.mediaList.push(this.media);
    this.mediaList[0].getCurrentPosition().then((position)=>{alert(position);});
  }

  onPlay(){
    this.mediaList[0].play();
  }

  onPause(){
    this.mediaList[0].pause();
  }

  onStop(){
    this.mediaList[0].stop();
  }

}
