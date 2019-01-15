export class Employee {
    employeeId: number;
    name: string;
    dob: string;
    salary: string;
    skills: string[];
    photo: string;

    constructor(person) {
        this.employeeId = person.employeeId;
        this.name = person.name;
        this.dob = person.dob;
        this.salary = person.salary;
        this.photo = person.photo;
        this.skills = [];
        if (typeof(person.skills) == 'string') {
            let employeeSkills = person.skills.split(',');
            employeeSkills.forEach(element => {
                this.skills.push(element);
            });
        }
    }
}
