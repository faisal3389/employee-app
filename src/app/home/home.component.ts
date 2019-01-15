import { Component, OnInit } from '@angular/core';
import { Employee } from './../employee';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  employees: any[];
  isLoaded = false;
  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    this.employees = [];
    let dbRefObj = firebase.database().ref().child('employee_list');
    dbRefObj.on('value', snap => {
      let employeeList = snap.val();

      Object.keys(employeeList).forEach((key,index) => {
        this.employees.push(new Employee(employeeList[key]));
      });
      this.isLoaded = true;
    })
  }

  goToAddEditPage(data) {
    if (data) {
      this.router.navigate(['/employee'], { queryParams: { employeeId: data.employeeId } });
    } else {
      this.router.navigate(['/employee'], { queryParams: { employeeId: null } });
    }
  }

  deleteEmployee(data) {
    console.log(data);
  }

}
