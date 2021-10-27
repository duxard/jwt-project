import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.email, Validators.required]),
      password: new FormControl(null, [Validators.required])
    });
  }

  submitForm(): void {
    const credentials = this.loginForm.value;
    this.authService.login(credentials).subscribe(
      res => {
        console.log(res);
        localStorage.setItem('token', res.token);
      },
      error => console.log(error)
    );
    this.loginForm.reset();
  }
}
