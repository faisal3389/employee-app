import { Injectable } from '@angular/core';
import { MatFormFieldBase } from '@angular/material';
import { Employee } from './employee';

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
  public database = firebase.database();
  public isUserLoggedIn = false;
  public showSignInData = false;

  constructor() {
    // this.rootDBRef = this.database.ref().child('');
    this.employeeList = [];
    this.totalNumberOfEmployees = 0;
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
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in.
        this.isUserLoggedIn = true;
        this.showSignInData = true;
        user.getIdToken().then(function(accessToken) {
          console.log(accessToken);
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
    firebase.auth().signOut().then(() => {
      // Sign-out successful.
      this.isUserLoggedIn = false;
      this.showSignInData = true;
    }, function(error) {
      // An error happened.
      console.log(error);
    });
  }
}
