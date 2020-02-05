import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { NewUserComponent } from './new-user/new-user.component';

import { AuthenticationService } from './services';
import { User } from './_models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

 currentUser: User;


 constructor(
  private router: Router,
  private authenticationService: AuthenticationService,
   public dialog: MatDialog
   ) {}

  openDialog(): void {
    let dialogRef = this.dialog.open(NewUserComponent, {
      width: '550px',      
    });
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

}


