import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, type OnInit } from '@angular/core';
import { UsuarioService } from '../../../services/usuario.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {ProgressSpinnerMode, MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,ReactiveFormsModule, MatProgressSpinnerModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class LoginComponent implements OnInit {

  private _usuarioService = inject(UsuarioService)
  public usuario : any = null
  public spinnerActivo : boolean = false

  ngOnInit(): void { }

  constructor( private _router : Router){}

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
          this.usuario = data
          console.log(this.usuario)
          // FIXME: Redirigir a su panel de usuario
          setTimeout(()=>{
            this._router.navigate(['/home'])
          },1500)
        },
        error: (err) => {
          console.log("Error API", err)
        }
      })
    }
  }

}
