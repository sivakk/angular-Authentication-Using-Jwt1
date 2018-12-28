import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";
import { formatDate } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { MatNativeDateModule } from "@angular/material";
import { BrowserModule } from "@angular/platform-browser";
import {
    FormGroup,
    FormsModule,
    FormControl,
    AbstractControl,
    Validators
} from "@angular/forms";

import { AuthService } from "../auth.service";
import { UsernameValidators } from "./validator";

@Component({
    templateUrl: "./signup.component.html",
    styleUrls: ["./signup.component.scss"]
})
export class SignupComponent {
    isLoading = false;
    isSubmit: boolean;
    validationForm: FormGroup;


    constructor(public authService: AuthService,private router: Router) { }
    ngOnInit() {


        this.validationForm = new FormGroup({
            username: new FormControl('', {
                validators: [Validators.required, Validators.minLength(3),
                UsernameValidators.cannotContainSpace
                ]
            }),
            lastname: new FormControl('', {
                validators: [Validators.required, Validators.minLength(3), UsernameValidators.cannotContainSpace1
                ]
            }),
            middlename: new FormControl('', {
                validators: [Validators.minLength(3), UsernameValidators.cannotContainSpace2
                ]
            }),
            phoneNumber: new FormControl('', {
                validators: [Validators.minLength(10), Validators.maxLength(10)]
            }),
            email: new FormControl('', { validators: [Validators.required, Validators.email] }),
            password: new FormControl('', {
                validators: [Validators.required, Validators.minLength(6), Validators.maxLength(16)]
            }),
            confirm_password: new FormControl('', {
                validators: [Validators.required, Validators.minLength(6), Validators.maxLength(16)]
            }),
            //password: ['', [Validators.required, Validators.minLength(6)]]

        }, this.pwdMatchValidator)
    }
    pwdMatchValidator(frm: FormGroup) {
        return frm.get('password').value === frm.get('confirm_password').value ? null : { 'mismatch': true };
    }


    get username() {
        return this.validationForm.get('username');

    }
    get lastname() {
        return this.validationForm.get('lastname');

    }
    get middlename() {
        return this.validationForm.get('middlename');

    }
    get phoneNumber() {
        return this.validationForm.get('phoneNumber');

    }
    get email() {
        return this.validationForm.get('email');

    }
    get password() {
        return this.validationForm.get('password');
    }
    get confirm_password() {
        return this.validationForm.get('confirm_password');
    }

 
    onSubmit(formvalue): boolean {
        this.isSubmit = true;
        
        if (this.validationForm.invalid) {

            return false;
        } 
            
        this.isLoading=true;
        console.log(this.validationForm.value.email);
        setTimeout(()=>{
            this.authService.createUser(this.validationForm.value.email, this.validationForm.value.password);
            this.router.navigate(["/login"]);
            return true;
        },2000)
        
       
        
    }
}
