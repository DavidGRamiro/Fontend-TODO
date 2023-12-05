import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import { UsuarioService } from '../../../services/usuario.service';
import { Router } from '@angular/router';
import { MessagesModule } from 'primeng/messages';
import { ToastModule } from 'primeng/toast';
import { Message, MessageService } from 'primeng/api';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MessagesModule, ToastModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',

})
export default class RegisterComponent {


  private _usuarioService = inject(UsuarioService)

  registroForm = new FormGroup({
    name : new FormControl(''),
    username : new FormControl(''),
    email : new FormControl(''),
    password : new FormControl(''),
  });

  constructor(private _router : Router , private _messageService : MessageService){}

  // Una vez que el usuario se ha registrado lo mandamos al login
  registroUsuario(){
    if(this.registroForm.valid){
      let new_user = this.registroForm.value;
      this._usuarioService.altaUsuario(new_user).subscribe({
        next: (data) => {
          // TODO: Redirigir a su panel de usuario
          if(data.cod === 200){
            this._router.navigate(['/dashboard/login'])
          }else{
            this._messageService.add({ severity: 'error', detail: "", summary: data.resultado})
          }
        },
        error : (err) => {
          console.log(err)
        }
      })
    }
  }



}
