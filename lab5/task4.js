"use strict";

class Person {
    constructor(name, email) {
        this.name = name;
        this.email = email;
    }

    introduce() {
        return "Name: " + this.name + ", Email: " + this.email;
    }
}

class Student extends Person {
    constructor(name, email, rollNo, marks) {
        super(name, email);
        this.rollNo = rollNo;
        this.marks = marks;
    }

    introduce() {
        return super.introduce() + ", Roll No: " + this.rollNo;
    }

    getResult() {
        return this.marks >= 50 ? "Pass" : "Fail";
    }
}

class FacultyMember extends Person {
    constructor(name, email, employeeId, department) {
        super(name, email);
        this.employeeId = employeeId;
        this.department = department;
    }

    introduce() {
        return super.introduce() + ", Employee ID: " + this.employeeId +
            ", Department: " + this.department;
    }
}

const student1 = new Student("Ali", "ali@university.edu", 101, 82);
const student2 = new Student("Sara", "sara@university.edu", 102, 45);

const faculty1 = new FacultyMember("Ahmed", "ahmed@university.edu", 201, "CS");
const faculty2 = new FacultyMember("Hina", "hina@university.edu", 202, "AI");

const users = [student1, student2, faculty1, faculty2];

users.forEach(user => console.log(user.introduce()));

console.log(student1.getResult());

console.log(student1 instanceof Student);
console.log(student1 instanceof Person);

const guest = {
    name: "Dr. Ahmed",
    email: "ahmed@example.com"
};

console.log(Person.prototype.introduce.call(guest));

const fn = student1.introduce;

try {
    console.log(fn());
} catch (error) {
    console.log("Detached method error");
}

const boundFn = student1.introduce.bind(student1);
console.log(boundFn());