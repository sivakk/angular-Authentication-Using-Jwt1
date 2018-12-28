import { StudentService } from './../student.service';
import { Student } from '../student';

import { Router } from '@angular/router';
import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef, AfterViewChecked } from '@angular/core';
import { MatSnackBar, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { remove } from 'lodash';




@Component({
  selector: 'app-studentlist',
  templateUrl: './studentlist.component.html',
  styleUrls: ['./studentlist.component.scss']
})
export class StudentlistComponent implements OnInit {

  constructor(public stud: StudentService,private router :Router,private snackBar:MatSnackBar) { }

  displayedColumns: string[] = ['StudentId', 'StudentName', 'Email', 'Class', 'EnrollementYear', 'City', 'Country','action'];
  dataSource: Student[] = [];

  editBtnHandler(id){
    console.log(id);
   // this.stud.updateStudent()._subscribe
   this.router.navigate(["/edit",id]);
    

  }
  deleteBtnHandler(id){
    this.stud.deleteStudent(id)
    .subscribe(data => {
      // remove(this.dataSource,(item)=>{
      //   return item.id===data._id
      // })
      this.dataSource=[...this.dataSource];
      this.snackBar.open('Invoice Deleted','sucess',{duration:2000})
      setTimeout(()=>{
     
        this.ngOnInit();

    },2000)
      }), err => this.errorHandleer(err,'Failed to get delete')
     
    }
  
  ngOnInit() {

    this.stud.getStudents().subscribe(data => {
      this.dataSource = data;
  
    },
      err => this.errorHandleer(err,'Failed to get Students')

    );
  }
  private errorHandleer(error,message)
  {this.snackBar.open(message,'Error',{duration:2000});

  }
  


}
