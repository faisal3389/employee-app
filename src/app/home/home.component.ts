import { Component, OnInit } from '@angular/core';
import { Employee } from './../employee';
import { Router } from '@angular/router';
import { GlobalService } from './../global.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  employees: any[];
  isLoaded = false;
  constructor(
    private router: Router,
    private gService: GlobalService
  ) { }

  ngOnInit() {
    this.employees = [];
    this.gService.employeeListDBRef.on('value', snap => {
      let employeeList = snap.val();
      if (employeeList) {
      this.employees = [];
        Object.keys(employeeList).forEach((key,index) => {
          if (employeeList[key]) {
            this.employees.push(new Employee(employeeList[key]));
          }
        });
      }
      this.isLoaded = true;
    })
    this.gService.isLoggedIn();
  }

  goToAddEditPage(data) {
    if (!this.gService.isUserLoggedIn) {
      this.router.navigate(['/login']);
    } else {
      if (data) {
        this.router.navigate(['/employee'], { queryParams: { employeeId: data.employeeId } });
      } else {
        this.router.navigate(['/employee'], { queryParams: { employeeId: null } });
      }
    }
  }

  async deleteEmployee(data) {
    console.log(data);
    if (!this.gService.isUserLoggedIn) {
      this.router.navigate(['/login']);
    } else {
      await this.gService.deleteEmployeeFromDB(data.employeeId);
    }
  }

  async getEmployeePhotoUrl(data) {
    if(data) {
      // var firebase = firebase;
      // var storageRef = firebase.storage().ref();
      // return await storageRef.child('employee_photos/faisal.png').getDownloadURL();
      // return 1;
      // var storage = firebase.storage();
      // var imgRef = storage.ref('employee_photos/faisal.png');
      // imgRef.getDownloadURL().then(data => {
      //   console.log(data);
      // }, err => {
      //   console.log(err);
      // })
    }
  }

}
