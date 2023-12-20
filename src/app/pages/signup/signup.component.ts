import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  userData: FormGroup;

  constructor(private readonly authservie: AuthService) {
    this.userData = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.minLength(6)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }

  ngOnInit(): void {
      console.log("Страница загружена!");
  }
  onSubmit(): void {
    if(this.userData.valid) {
      console.log(this.userData.value)
      this.authservie.signUp(this.userData.value)
    }
    else {
      console.log('not valid')
    }
  }
}

