// will create a menu driven app using prompts that allows one to manage staff and staff on departments
// to start we need classes for staff and departments
class Staff {
    constructor(name, job) {
        this.name = name;
        this.job = job;
    }
    describe() {
        return `${this.name} works in this ${this.job},` 
    }
}   

class Department {
    constructor(name) {
        this.name = name;
        this.staffMembers = [];
    }

    addStaffmembers(staff) {
        if (staff instanceof Staff) {
            this.staffMembers.push(staff);
           
        } else {
            throw new Error(`You can only add an instance of Staff. Argument is not staff: ${staff}.`);
        }
    }

    describe() {
        return `${this.name} has ${this.staffMembers.length} staff members.`;
    }
}

class Menu {
    constructor() {
        this.departments = [];
        this.selectedDepartment = null;
    }

    start() {
        let selection = this.showMainMenuOptions();

        while (selection !=0 ) {
            switch (selection) {
                case '1':
                  this.createDepartment();
                  break;
                case `2`:
                  this.viewDepartment();
                  break;
                case `3`:
                  this.deleteDepartment();
                  break;
                case `4`:
                  this.displayDepartment();
                  break;
                default:
                    selection =0;
            }
            // while boolean is true
            selection = this.showMainMenuOptions();
            // boolean is false exit out of loop
        }

        alert(`Goodbye!`);
    }


// now program these methods in our application

showMainMenuOptions() {
    return prompt(`
     0) exit
     1) create new department
     2) view department
     3) delete department
     4) display all departments
    `);
}

showDepartmentMenuOptions(departmentInfo){
    return prompt(`
    0) back
    1) create staff
    2) delete staff
    ---------------
    ${departmentInfo}
   `);
}

displayDepartment(){
    let departmentstring = '';
    for (let i = 0; i< this.departments.length; i++){
        departmentstring += i + ')' + this.departments[i].name + '\n';

    }
    alert(departmentstring);
}

createDepartment(){
    let name = prompt('Enter name for a new department:');
       this.departments.push(new Department(name));
}


viewDepartment() {
    let index = prompt("Enter the index of the Department you wish to view:");
    if (index > -1 && index < this.departments.length) {
        this.selectedDepartment = this.departments[index];
        let description = "Department Name:" + this.selectedDepartment.name + '\n';

        for (let i = 0; i < this.selectedDepartment.staffMembers.length; i++) {
            description += i + ')' + this.selectedDepartment.staffMembers[i].name+ '-'
            + this.selectedDepartment.staffMembers[i].job + '\n';
        }  

        let selection = this.showDepartmentMenuOptions(description);
        switch (selection) {
            case '1':
                this.createStaff();
                break;
            case '2':
                this.deleteStaff();

        }
     }
    }

    deleteDepartment(){
        let index = prompt('Enter the index of the Department you want to delete');
        if (index > -1 && index < this.selectedDepartment.staffMembers.length){
            this.departments.splice(index, 1);
        }
    }
    createStaff(){
        let name = prompt('Enter name for new staff:');
        let job = prompt('Enter job for new staff:');
        this.selectedDepartment.staffMembers.push(new Staff(name, job));
            }
    deleteStaff(){
        let index = prompt('Enter the index of the player you wish to delete');
        if (index > -1 && index < this.selectedDepartment.staffMembers.length){
            this.selectedDepartment.staffMembers.splice(index, 1);
            // the 1 just stays to remove one
        }
    }
}
// now we need to create a new instances of our menu

let menu = new Menu();
menu.start();