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
        this.photoUrl = person.photoUrl;
        this.skills = [];
        if (typeof(person.skills) == 'string') {
            let employeeSkills = person.skills.split(',');
            employeeSkills.forEach(element => {
                this.skills.push(element);
            });
        }
    }
}
