import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from './../employee';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { GlobalService } from './../global.service';

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
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private gService: GlobalService
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
        this.fillDataInForm();
      });
  }

  fillDataInForm() {
    
  }

  async addEmployee() {
    if(this.employeeDetailsForm.valid && this.selectedSkills.valid) {
      this.employeeDetailsForm.controls['skills'].setValue(this.selectedSkills.value.join(','));
      await this.gService.getTotalEmployees();
      let keyForNextPush = this.gService.keyForNextPush;
      await this.gService.database.ref('employee_list/'+keyForNextPush).set(this.employeeDetailsForm.value)
      await this.gService.updateTotalEmployees();
    }
  }

  editEmployee() {
    if(this.employeeDetailsForm.valid && this.selectedSkills.valid) {
      this.employeeDetailsForm.controls['skills'].setValue(this.selectedSkills.value.join(','));
      // this.router.navigate(['/home']);
    }
  }

}
