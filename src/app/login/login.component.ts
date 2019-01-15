import { Component, OnInit } from '@angular/core';
import { GlobalService } from './../global.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private gService: GlobalService
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit(){
    // var ui = new firebaseui.auth.AuthUI(firebase.auth());
    let k = document.getElementById('firebaseui-auth-container');
    // var ui = ui;
    // var uiConfig = uiConfig;
    var uiConfig = {
      signInSuccessUrl: 'home',
      signInOptions: [
        // Leave the lines as is for the providers you want to offer your users.
        this.gService.firebase.auth.PhoneAuthProvider.PROVIDER_ID,
      ],
      // tosUrl and privacyPolicyUrl accept either url string or a callback
      // function.
      // Terms of service url/callback.
      tosUrl: 'home',
      // Privacy policy url/callback.
      privacyPolicyUrl: function() {
        window.location.assign('home');
      }
    };
    // var ui = new firebaseui.auth.AuthUI(firebase.auth());
    window['ui'].start(k, uiConfig);
  }

}
