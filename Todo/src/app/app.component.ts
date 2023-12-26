import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {  MessageService } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenService } from './services/token.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [MessageService,
  ]

})

export class AppComponent implements OnInit {

  constructor(private _primengConfig : PrimeNGConfig){}

  ngOnInit(): void {
    this._primengConfig.ripple = true;
  }

  // Control cuando se cierra la pestaña del navegador para eliminar el token
  @HostListener('window:beforeunload', ['$event'])
  checkControlToken(){
    localStorage.removeItem('token');
  }

}
