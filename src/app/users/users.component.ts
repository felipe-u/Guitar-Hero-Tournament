import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../services/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit, OnDestroy {
  users: User[] = []
  private usersSubscription: Subscription;

  constructor(private router: Router, private http: HttpClient, private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe();
    this.usersSubscription = this.userService.getUsersSubject().subscribe(
      users => {
        this.users = users;
      }
    )
  }

  onDelete(user) {
    if (confirm('Are you sure?')) {
      this.userService.deleteUser(user.id);
      this.users = this.users.filter(u => u.id !== user.id);
    }
  }

  goBack() {
    this.router.navigate(['/home']);
  }

  ngOnDestroy(): void {
    this.usersSubscription.unsubscribe();
  }
}
