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
  percentage = 0;
  fileUploded = false;

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
      photoUrl: ['', Validators.compose([])],
    });
  }

  ngOnInit() {
    this.fileUploded = false;
    this.route.queryParams
      .subscribe(params => {
        console.log(params); 
        this.employeeId = params.employeeId;
        this.fillDataInForm();
      });
  }

  async fillDataInForm() {
    var foo = await this.gService.employeeListDBRef.once('value')
    var eData = foo.val();
    if (this.employeeId) {
      let id = <number>this.employeeId;
      this.employeeDetailsForm.controls['name'].setValue(eData[id].name);
      this.employeeDetailsForm.controls['dob'].setValue(eData[id].dob);
      this.employeeDetailsForm.controls['salary'].setValue(eData[id].salary);
      this.selectedSkills.setValue(eData[id].skills.split(','));
    }
  }

  async addEmployee() {
    if(this.employeeDetailsForm.valid && this.selectedSkills.valid) {
      this.employeeDetailsForm.controls['skills'].setValue(this.selectedSkills.value.join(','));
      await this.gService.getTotalEmployees();
      let keyForNextPush = this.gService.keyForNextPush;
      let formObj = this.employeeDetailsForm.value;
      formObj['employeeId'] = keyForNextPush;
      formObj['photoUrl'] = `https://firebasestorage.googleapis.com/v0/b/zetwork-4e2c1.appspot.com/o/employee_photos%2F${formObj.name}?alt=media&token=ac8e6d1d-870d-4726-9e1c-3fa09d48b1ce`;
      if (this.fileUploded) {
        await this.gService.database.ref('employee_list/'+keyForNextPush).set(formObj);
        await this.gService.updateTotalEmployees();
      }
    }
  }

  async editEmployee() {
    if(this.employeeDetailsForm.valid && this.selectedSkills.valid) {
      this.employeeDetailsForm.controls['skills'].setValue(this.selectedSkills.value.join(','));
      let formObj = this.employeeDetailsForm.value;
      formObj['employeeId'] = this.employeeId;
      await this.gService.database.ref('employee_list/'+this.employeeId).set(formObj);
    }
  }

  fileToUpload: any
  onFileChange($event) {
    if($event.target.files && $event.target.files.length > 0) {
      this.fileToUpload = $event.target.files[0];
    }
  }

  uploadFile() {
    if(!this.employeeDetailsForm.valid) {
      console.log('please fill the form');
      return;
    }
    // var firebase = firebase;
    var storageRef =  firebase.storage().ref('employee_photos/'+this.employeeDetailsForm.value.name);
    var task = storageRef.put(this.fileToUpload);

    task.on('state_changed',
      //progress callback
      (snapshot) => {
        this.percentage = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
      }, 
      function error(err) {
        console.log(err);
      },
      //complete callback
      () => {
        this.fileUploded = true;
      }
    )
  }

}
