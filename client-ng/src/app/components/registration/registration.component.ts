import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  registrationForm!: FormGroup;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.registrationForm = new FormGroup({
      email: new FormControl(null, [Validators.email, Validators.required]),
      password: new FormControl(null, [Validators.minLength(4), Validators.required])
    });
  }

  submitForm(): void {
    const credentials = this.registrationForm.value;
    this.authService.register(credentials).subscribe(
      data => console.log(data),
      error => console.log(error)
    );
    this.registrationForm.reset();
  }
}
