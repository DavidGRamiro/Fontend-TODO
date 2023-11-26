import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import { UsuarioService } from '../../../services/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export default class RegisterComponent {

  constructor(private _router : Router){}

  private _usuarioService = inject(UsuarioService)

  registroForm = new FormGroup({
    name : new FormControl(''),
    username : new FormControl(''),
    email : new FormControl(''),
    password : new FormControl(''),
  });


  registroUsuario(){
    if(this.registroForm.valid){
      let new_user = this.registroForm.value;
      this._usuarioService.altaUsuario(new_user).subscribe({
        next: (data) => {
          console.log(data)
          this._router.navigate(['/dashboard/login'])
        },
        error : (err) => {
          console.log(err)
        }
      })
    }
  }



}
