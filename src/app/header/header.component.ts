import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  private iuserSub: Subscription;

  constructor(private authService: AuthService) {}
  
  ngOnInit(): void {
    this.iuserSub = this.authService.iuser.subscribe(
      iuser => {
        this.isAuthenticated = !!iuser;
      }
    )
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.iuserSub.unsubscribe();
  }
}
