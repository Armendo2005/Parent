import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../services/firebase.service';
import { Router, Params } from '@angular/router';
import { MatDialog } from '@angular/material';
import {MatSidenav} from '@angular/material/sidenav';
import { EditUserComponent} from '../edit-user/edit-user.component';
import { NewUserComponent } from '../new-user/new-user.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  
  
  searchValue: string = "";
  items: Array<any>;
  item: any;
  

  constructor(
    public dialog: MatDialog,
    public firebaseService: FirebaseService,
    private router: Router
  ) { }
      
  

  openDialog(): void {
    let dialogRef = this.dialog.open(NewUserComponent, {
      width: '550px',
      
    });
  }

  openDialogE(): void {
    let dialogRef = this.dialog.open(EditUserComponent, {
      width: '550px',
      
    });
  }

  ngOnInit() {
    this.getData();
  }

  getData(){
    this.firebaseService.getUsers()
    .subscribe(result => {
      this.items = result;

    })
  }


  viewDetails(item){
    this.router.navigate(['/details/'+ item.payload.doc.id]);
  }

  capitalizeFirstLetter(value){
    return value.charAt(0).toUpperCase() + value.slice(1);
  }

 
  combineLists(a, b){
    let result = [];

    a.filter(x => {
      return b.filter(x2 =>{
        if(x2.payload.doc.id == x.payload.doc.id){
          result.push(x2);
        }
      });
    });
    return result;
  }

  delete(){
    this.firebaseService.deleteUser(this.item.id)
    .then(
      res => {
        this.router.navigate(['/home']);
      },
      err => {
        console.log(err);
      }
    )
  }

}


