import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController, LoadingController,ActionSheetController } from 'ionic-angular';
import { Http } from "@angular/http";
import { MediaObject } from "@ionic-native/media";
import { RecorderProvider } from "../../providers/recorder/recorder";
import { PhotoLibrary } from '@ionic-native/photo-library';
/**
 * Generated class for the AudioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var cordova: any;
@IonicPage()
@Component({
  selector: 'page-audio',
  templateUrl: 'audio.html',
})
export class AudioPage {
  recMediaList: MediaObject[];
  recorded: boolean;
  AudioUrl: String;
  loading;
  defaultImg;
  isClicked:boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public loadingCtrl: LoadingController, public alertCtrl: AlertController, public actionSheetCtrl:ActionSheetController, public recorder: RecorderProvider) {
    this.recMediaList = this.recorder.mediaList;
    this.recorded = false;
    this.isClicked = false;
    this.defaultImg = "https://ws1.sinaimg.cn/large/77ce63b1ly1fl652p73krj205k05kzk6.jpg";
  }

  startRecording(){
    this.recorder.onStartRecord();
  }

  stopRecording(){
    this.recorder.onStopRecord();
    this.recMediaList = this.recorder.mediaList;
  }

  play(){
    this.recorder.onPlay();
  }

  pause(){
    this.recorder.onPause();
  }

  stop(){
    this.recorder.onStop();
  }

  record(){
    this.isClicked = !this.isClicked;
  }

  onHold(){
    var imgSrc = this.defaultImg;
    this.presentActionSheet(imgSrc);
  }

  presentActionSheet(imgUrl: String){
    let actionSheet = this.actionSheetCtrl.create({
      title: '存储表情包',
      buttons:[
        {
          text:'保存到本地',
          handler:()=>{
            this.saveImage(imgUrl);
            console.log('Destructive clicked');
          }
        },
        {
          text:'取消',
          role: 'cancel',
          handler:()=>{
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  saveImage(imgUrl) {
    cordova.plugins.photoLibrary.requestAuthorization(
      function () {
        // User gave us permission to his library, retry reading it!
        cordova.plugins.photoLibrary.getLibrary(
          function ({library}) {
            //var url = 'file:///...'; // file or remote URL. url can also be dataURL, but giving it a file path is much faster
            var album = 'HelloStickers';
            cordova.plugins.photoLibrary.saveImage(imgUrl, album,
              function (libraryItem) {
                alert("保存成功"+libraryItem);
              }, function (err) {
                alert('保存失败'+err);
              });
          },
          function (err) {
            if (err.startsWith('Permission')) {
              // call requestAuthorization, and retry
            }
            // Handle error - it's not permission-related
            console.log('权限'+err);

          }
        );
      },
      function (err) {
        // User denied the access
        alert('用户拒绝访问'+err);
      }, // if options not provided, defaults to {read: true}.
      {
        read: true,
        write: true
      }
    );

  }


  submit(){

  }

  getResult(){
    let url = '';
    this.loading = this.loadingCtrl.create({
      content: '正在为您生成中'
    });
    this.loading.present();
    this.http.post(url, {audioUrl:this.AudioUrl}).subscribe((res)=>{
      this.loading.dismiss();
      if(res.json().sucess){

      }
    })
  }


}
