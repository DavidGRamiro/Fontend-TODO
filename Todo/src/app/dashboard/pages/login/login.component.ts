import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, type OnInit } from '@angular/core';
import { UsuarioService } from '../../../services/usuario.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class LoginComponent implements OnInit {

  private _usuarioService = inject(UsuarioService)

  ngOnInit(): void { }

  formLogin = new FormGroup({
    username : new FormControl(),
    password : new FormControl()
  })

  loginUsuario(){
    console.log(this.formLogin)
    if(this.formLogin.valid){
      this._usuarioService.login(this.formLogin.value).subscribe({
        next: (data) => {
          console.log("ALTA", data)
        },
        error: (err) => {
          console.log("Error API", err)
        }
      })
    }

  }

}
