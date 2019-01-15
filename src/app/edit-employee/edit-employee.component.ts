import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from './../employee';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit {
  employeeData: Employee;
  employeeId: null;
  employeeDetailsForm: FormGroup;
  selectedSkills = new FormControl('', Validators.compose([Validators.required]));
  skillsList  = [
    'Angular',
    'React',
    'Node',
    'Firebase',
    'Loopback',
    'Express',
    'Mongo',
    'Javascript',
    'python',
    'Java'
  ]

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
    this.employeeDetailsForm = this.formBuilder.group({
      name: ['', Validators.compose([Validators.required])],
      dob: ['', Validators.compose([Validators.required])],
      salary: ['',Validators.compose([Validators.required])],
      skills: ['', Validators.compose([])],
      photo: ['', Validators.compose([])],
    });
  }

  ngOnInit() {
    this.route.queryParams
      .subscribe(params => {
        console.log(params); 
        this.employeeId = params.employeeId;
      });
  }

  addEmployee() {

  }

  editEmployee() {
    if(this.employeeDetailsForm.valid && this.selectedSkills.valid) {
      this.employeeDetailsForm.controls['skills'].setValue(this.selectedSkills.value);
      // this.router.navigate(['/home']);
    }
  }

}
