import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../models/user.model';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  @ViewChild('f') signupForm: NgForm;
  user: User = new User('', '', '', 0, '');

  constructor(private router: Router, private userService: UserService) { }

  onSubmit() {
    this.user.name = this.signupForm.value.name;
    this.user.gender = this.signupForm.value.gender;
    this.user.age = this.signupForm.value.age;
    this.user.taste = this.signupForm.value.taste;
    console.log(this.user);
    this.userService.createAndStoreUser(this.user);
    this.signupForm.reset();
    setTimeout(() => {
      alert("It's done!")
      this.router.navigate(['/home']);
    }, 2000);
  }

  onCancel() {
    if (confirm('Are you sure?')) {
      this.signupForm.reset();
      this.router.navigate(['/home']);
    }
  }
}
