import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { identityPasswordValidator } from 'src/app/validators/customValidators';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  signUpForm: FormGroup;

  @Output('goBack') goBackEvent = new EventEmitter<any>();
  @Output() registerError = new EventEmitter<any>();
  @Output() registerStart = new EventEmitter<any>();

  get signupEmail(): AbstractControl {
    return this.signUpForm.get('signupEmail');
  }

  get password(): AbstractControl {
    return this.signUpForm.get('password');
  }

  get signupPassword(): AbstractControl {
    return this.signUpForm.get('password.signupPassword');
  }

  get signupPasswordRepeat(): AbstractControl {
    return this.signUpForm.get('password.signupPasswordRepeat');
  }

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.setupForm();
  }

  ngOnInit() {
  }

  setupForm() {
    this.signUpForm = this.fb.group({
      signupEmail: ['', [Validators.required, Validators.email]],
      password: this.fb.group({
        signupPassword: ['', [Validators.required, Validators.minLength(6)]],
        signupPasswordRepeat: [''],
      }, { validators: [identityPasswordValidator] })
    });
  }

  signUp() {
    if (this.signUpForm.valid) {
      this.authService.doRegister(this.signUpForm.value.signupEmail, this.signUpForm.value.password.signupPassword)
      .catch(err => {
        console.error(err);
        this.registerError.emit();
      });
      this.registerStart.emit();
    } else {
      this.signupEmail.markAsTouched();
      this.signupPassword.markAsTouched();
      this.signupPasswordRepeat.markAsTouched();
    }
  }

  goBack() {
    this.goBackEvent.emit();
  }

}
