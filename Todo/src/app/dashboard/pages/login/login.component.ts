import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, type OnInit } from '@angular/core';
import { UsuarioService } from '../../../services/usuario.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {ProgressSpinnerMode, MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,ReactiveFormsModule, MatProgressSpinnerModule,
    ToastModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class LoginComponent implements OnInit {

  private _usuarioService = inject(UsuarioService)
  public usuario : any = null
  public spinnerActivo : boolean = false
  public autenticado : boolean = false
  private _token : string = ''

  ngOnInit(): void { }

  constructor( private _router : Router,
              private _cdr : ChangeDetectorRef,
              private _message : MessageService){}

  formLogin = new FormGroup({
    username : new FormControl(),
    password : new FormControl()
  })

  // Hacer login de usuario
  loginUsuario(){
    this.spinnerActivo = true
    if(this.formLogin.valid){
      this._usuarioService.login(this.formLogin.value).subscribe({
        next: (data) => {

          // Obtenemos el token de la respuesta
          this._token = data.token
          let token_json = JSON.stringify(this._token)
          sessionStorage.setItem('token', token_json)

          setTimeout(()=>{
            this._router.navigate(['/usuarios/perfil'])
            this.spinnerActivo = false
          },1500)
        },
        error: (err) => {
          this.spinnerActivo = false
          setTimeout(() => {
            // Forzamos la deteccion de cambios
            this._cdr.detectChanges()
            this._message.add({
              severity: 'error', detail:'', summary:'Credenciales incorrectas'
            })
          },200)
        }
      })
    }else{
      this.spinnerActivo = false
      this._cdr.detectChanges()
    }
  }

}
