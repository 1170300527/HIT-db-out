// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

const query = require('./js/myQuery')
const app = new Vue({
    el: '#app',
    data: {
        stuId: '',
        stuIdChecked: false,
        classId: '',
        classIdChecked: false,
        stuName: '',
        stuNameChecked: false,
        department: '',
        departmentChecked: false,
        ageMin: '',
        ageMax: '',
        ageChecked: false,
        address: '',
        addressChecked: false,
        gender: '',
        genderChecked: false,
        sqlString: 'SELECT * FROM student',
        students: []
    },
    methods: {
        deleteInfo() {
            this.stuId = '';
            this.stuIdChecked = false;
            this.classId = '';
            this.classIdChecked = false;
            this.stuName = '';
            this.stuNameChecked = false;
            this.department = '';
            this.departmentChecked = false;
            this.ageMin = '';
            this.ageMax = '';
            this.ageChecked = false;
            this.address = '';
            this.addressChecked = false;
            this.gender = '',
            this.genderChecked = false;
            this.sqlString = '';
            this.students = [];
        },
        generate() {
            this.sqlString = 'SELECT * FROM student WHERE 1=1 ';
            if (this.stuIdChecked && this.stuId.trim().length > 0) {
                this.sqlString += 'AND Sid LIKE \'' + this.stuId.trim() + "\' ";
            }
            if (this.classIdChecked && this.classId.trim().length > 0) {
                this.sqlString += 'AND Sclass LIKE \'' + this.classId.trim() + "\' ";
            }
            if (this.stuNameChecked && this.stuName.trim().length > 0) {
                this.sqlString += 'AND Sname LIKE \'' + this.stuName.trim() + "\' ";
            }
            if (this.departmentChecked && this.department.trim().length > 0) {
                this.sqlString += 'AND Sdept LIKE \'' + this.department.trim() + "\' ";
            }
            if (this.ageChecked) {
                if (this.ageMin.trim().length > 0) {
                    this.sqlString += 'AND Sage>=' + this.ageMin.trim() + ' ';
                }
                if (this.ageMax.trim().length > 0) {
                    this.sqlString += 'AND Sage<=' + this.ageMax.trim() + ' ';
                }
            }
            if (this.addressChecked && this.address.trim().length > 0) {
                this.sqlString += 'AND Saddress LIKE \'' + this.address.trim() + "\' ";
            }
            if (this.genderChecked && this.gender.trim().length > 0) {
                this.sqlString += 'AND Ssex=\'' + this.gender.trim() + "\'";
            }
        },
        runMysql() {
            query.query(this.sqlString).then(results => {
                this.students = results;
            }).catch(error => {
                console.log("查询失败");
                console.log(error);
            })
        },
        generateAndRun() {
            this.generate();
            this.runMysql();
        }
    }
})
