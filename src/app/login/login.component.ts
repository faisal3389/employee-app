import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit(){
    // var ui = new firebaseui.auth.AuthUI(firebase.auth());
    let k = document.getElementById('firebaseui-auth-container');
    // var ui = ui;
    // var uiConfig = uiConfig;
    ui.start(k, uiConfig);
  }

}
