import { Component, OnInit, NgZone } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

// Reference 
// https://stackoverflow.com/questions/35296704/angular2-how-to-call-component-function-from-outside-the-app/39280942

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  title = 'my-app';
  imagePath: SafeResourceUrl;
  demoText : string = "";
  constructor(private _sanitizer: DomSanitizer, private _ngZone: NgZone) { 
    window['angularComponentRef'] = {
      zone: this._ngZone, 
      bindImageWithParams: (value) => this.bindImageWithParams(value), 
      bindImageWithoutParams : () => this.bindImageWithoutParams(),
      bindImage: (base64Image) => this.bindImage(base64Image),
      component: this
    };
  }

  ngOnInit() {
  }
  

  openCamera(){
    // alert('Camera code need to be added.');
    // this.bindImage(this.imageBase64);
  }

  bindImage(base64Image: string) {
    this._ngZone.run(() => {
      alert("Image Received : "+ base64Image.length + " -- "+ base64Image);
      if(base64Image) {
        this.imagePath = this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' + base64Image);
      }
      return "Got your image";
    })
    return "Got your image";
  }

  bindImageWithParams(data: string) {
    this._ngZone.run(() => {
      this.demoText = data;
      return "Got your data";
    })
    return "Got your data";
  }

  bindImageWithoutParams() {
    this._ngZone.run(() => {
      this.demoText = "Bind Image with params function is called";
      return "Got your data";
    })
    return "Got your data";
  }

}
