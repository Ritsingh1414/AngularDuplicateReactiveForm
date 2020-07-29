import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import {  FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PasswordStrengthValidator } from '../password-strength';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  submitted = false;
  registerForm: FormGroup;
  
  constructor(private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      user: this.fb.array([]),
    });

  }

  ngOnInit() {
    this.addCreds()
  }


   register() {
    this.submitted = true;
     if (this.registerForm.valid) {
      alert('Form Submitted succesfully!!!\n Check the values in browser console.');
      console.table(this.registerForm.value);
    }else {
      alert('Please Fill all the fields for submit.');
    }
   }

   get registerFormControl() {
    return this.registerForm.controls;
  }
  
	get users(): FormArray {
		return this.registerForm.get('user') as FormArray;
	}

   addCreds() {
    const creds = this.registerForm.controls.user as FormArray;
    creds.push(this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      phone: ['',[Validators.required, Validators.minLength(10),Validators.maxLength(10) ]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, PasswordStrengthValidator, ]],
      confirmPassword: ['', [Validators.required, PasswordStrengthValidator]]
    },
    {
      validator: this.passwordMatchValidator
    }

    ));
  }
  passwordMatchValidator(frm: FormGroup): { mismatch: boolean } {
    return frm.controls['password']?.value === frm.controls['confirmPassword']?.value ? null : {'mismatch': true};
  }

}
