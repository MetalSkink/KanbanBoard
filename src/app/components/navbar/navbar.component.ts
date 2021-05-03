import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '../../services/token.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {


  admin:boolean= false;
  isLogged = false;

  roles:string[];
  isAdmin: boolean = false;


  constructor(private tokenService:TokenService,
              private router:Router) { }

  ngOnInit(): void {
    if(this.tokenService.getToken()){
      this.isLogged=true;
    }else{
      this.isLogged=false;
    }
    this.roles = this.tokenService.getAuthorities();
    this.roles.forEach(rol =>{
      if(rol === "ROLE_ADMIN"){
        this.isAdmin=true;
      }
    })
  }

  OnLogOut():void{
    this.tokenService.logOut();
    this.isLogged=false;
    //window.location.reload();
    this.router.navigate(["/login"]);
  }


}
