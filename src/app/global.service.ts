import { Injectable } from '@angular/core';
import { Employee } from './employee';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  public employeeList: any[];
  public totalNumberOfEmployees: number;
  public keyForNextPush: number;

  public employeeListDBRef: any;
  public employeeTotalDBRef: any;
  public rootDBRef: any;
  public database;
  public isUserLoggedIn = false;
  public showSignInData = false;

  constructor(
    private router: Router
  ) {
    // this.rootDBRef = this.database.ref().child('');
    this.employeeList = [];
    this.totalNumberOfEmployees = 0;
    // var firebase = firebase;
    this.database = firebase.database();
    this.employeeListDBRef = this.database.ref().child('employee_list');
    this.employeeTotalDBRef = this.database.ref().child('number_of_employees');
  }

  populateEmployeeList() {
    this.employeeListDBRef.on('value', snap => {
      let employeeList = snap.val();
      Object.keys(employeeList).forEach((key,index) => {
        this.employeeList.push(new Employee(employeeList[key]));
      });
    })
  }

  async getTotalEmployees() {
    let num = await this.employeeTotalDBRef.once('value')
    this.totalNumberOfEmployees = num.val();
    this.keyForNextPush = this.totalNumberOfEmployees + 1;
    return this.totalNumberOfEmployees;
  }

  async updateTotalEmployees(isIncrease = true) {
    let total = this.totalNumberOfEmployees;
    if(isIncrease) {
      await this.database.ref('number_of_employees').set(++total);
    } else {
      await this.database.ref('number_of_employees').set(--total);
    }
  }

  async deleteEmployeeFromDB(eId) {
    await this.database.ref('employee_list/'+eId).set(null);
  }

  isLoggedIn() {
    // var firebase = firebase;
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in.
        this.isUserLoggedIn = true;
        this.showSignInData = true;
        user.getIdToken().then(function(accessToken) {
          // console.log(accessToken);
        });
      } else {
        // User is signed out.
        this.isUserLoggedIn = false;
        this.showSignInData = true;
      }
    }, (error) => {
      this.isUserLoggedIn = false;
      this.showSignInData = true;
      console.log(error);
    });
  }

  logout() {
    // var firebase = firebase;
    firebase.auth().signOut().then(() => {
      // Sign-out successful.
      this.isUserLoggedIn = false;
      this.showSignInData = true;
      this.router.navigate(['/home']);
    }, function(error) {
      // An error happened.
      console.log(error);
    });
  }
}
