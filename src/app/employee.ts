export class Employee {
    employeeId: number;
    name: string;
    dob: string;
    salary: string;
    skills: string[];
    photoUrl: string;

    constructor(person) {
        this.employeeId = person.employeeId;
        this.name = person.name;
        this.dob = person.dob;
        this.salary = person.salary;
        this.getEmployeePhotoUrl(this, person.name);
        this.skills = [];
        if (typeof(person.skills) == 'string') {
            let employeeSkills = person.skills.split(',');
            employeeSkills.forEach(element => {
                this.skills.push(element);
            });
        }
    }

    getEmployeePhotoUrl(self, imgName) {
        if(imgName) {
            var storage = window["firebase"].storage();
            var imgRef = storage.ref(`employee_photos/${imgName}`);
            imgRef.getDownloadURL().then(data => {
                // console.log(data);
                self.photoUrl = data;
            }, err => {
                console.log(err);
            })
        }
        return ;
    }
}
