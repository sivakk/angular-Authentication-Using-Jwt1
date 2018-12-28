import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from './student';
import { Http, Response, Headers } from "@angular/http";
import { map, filter, scan } from "rxjs/operators";
import { Router } from "@angular/router";

const BASE_URL = "http://localhost:3000/api/student";

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private HttpClient: HttpClient,private http: Http, private router: Router) { }
  getStudents(): Observable<Student[]> {
    return this.HttpClient.get<Student[]>(`${BASE_URL}/students`);
  }
 
  
  createStudent(body: Student) {
    let headers = new Headers();
   
    console.log(body);
    
    headers.append("Content-Type", "application/json");
   
    
    return this.http
      .post("http://localhost:3000/api/student/students", body, {
        headers: headers
      })
      .pipe(map(res => res.json()));
  }
  deleteStudent(id: string): Observable<Student> {
    return this.HttpClient.delete<Student>(`${BASE_URL}/students/${id}`)
  }
  getStudent(id: string): Observable<Student> {
    return this.HttpClient.get<Student>(`${BASE_URL}/students/${id}`)
  }
  updateStudent(id: string, body: Student) {
    return this.HttpClient.put<Student>(`${BASE_URL}/students/${id}`, body);
  }
}
