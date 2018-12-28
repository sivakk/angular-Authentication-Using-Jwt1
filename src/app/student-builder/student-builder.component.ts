import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators ,ReactiveFormsModule} from '@angular/forms';
import { StudentService } from '../student.service';
import { MatSnackBar, ICON_REGISTRY_PROVIDER } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { Student } from '../student';


@Component({
  selector: 'app-student-builder',
  templateUrl: './student-builder.component.html',
  styleUrls: ['./student-builder.component.scss']
})


export class StudentBuilderComponent implements OnInit {
  private student: Student;
  studentForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private  StudentService:  StudentService,
    public snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.createForm();
    this.setstudentToForm();
  }
  onSubmit() {
   
    if (this.student) {
      this. StudentService.updateStudent(this.student._id, this.studentForm.value)
        .subscribe(data => {
          this.snackBar.open('Student updated', 'Success', {
            duration: 2000
          });
        //  this.router.navigate(['dashboard', 'students']);
        }, err => this.errorHandler(err, 'Failed to update student'));
    }
    else {
      this. StudentService.createStudent(this.studentForm.value).subscribe(
        data => {
          this.snackBar.open('Student created!', 'Success', {
            duration: 2000
          });
          this.studentForm.reset();
         this.router.navigate(['list']);
        },
        err => this.errorHandler(err, 'Failed to create Student')
      );
    }
  }
  private setstudentToForm() {
    //get the id of the student
    this.route.params
      .subscribe(params => {
        let id = params['id'];
        console.log(id);
        
        if (!id) {
          return;
        }
        this. StudentService.getStudent(id)
          .subscribe(student => {
            this.student = student;
            this.studentForm.patchValue(this.student);

          }, err => this.errorHandler(err, 'Failed to get Student'));
      })

  }

  private createForm() {
    this.studentForm = this.fb.group({
      StudentId: ['', Validators.required],
      StudentName: ['', Validators.required],
      Email:['' ,{ validators: [Validators.required, Validators.email] }] ,
      Class: ['', Validators.required],
      EnrollementYear: ['', Validators.required],
      City: ['', Validators.required],
      Country:['', Validators.required],

    });
  }
  private errorHandler(error, message) {
    console.error(error);
    this.snackBar.open(message, 'Error', {
      duration: 2000
    });
  }
}