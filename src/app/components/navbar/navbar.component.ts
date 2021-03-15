import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  logeado:boolean= false;
  admin:boolean= false;

  constructor(private router: Router) {
    this.logeado=Boolean(localStorage.getItem('sesion'));
    console.log(this.logeado);

  }

  ngOnInit(): void {
    console.log("ESTE ES EL INIT");

  }

  cerrarSesion(){
    console.log("borrando localStoragae");

    localStorage.removeItem('nControl');
    localStorage.removeItem('sesion');
    this.router.navigateByUrl('/login');

  }


}
