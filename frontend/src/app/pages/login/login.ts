import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {

  email = '';
  password = '';

  constructor(private auth: AuthService,private router: Router) {}

  login() {

    this.auth.login({
      email: this.email,
      password: this.password
    }).subscribe((res: any) => {

  localStorage.setItem('token', res.token);

  alert('Login successful');

  this.router.navigate(['/dashboard']);

}, () => {

  alert('Login failed');

});
  }
}