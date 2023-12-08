import { Component, Inject, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { SidebarModule } from 'primeng/sidebar';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, SidebarModule],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.sass'
})
export default class PerfilComponent implements OnInit{

  public token_usuario : string = ''
  public usuario_loguado : any = null;
  private userService = inject(UsuarioService)

  constructor(@Inject(PLATFORM_ID) private platformId: Object){}

  ngOnInit(): void {
    this.obtenerToken()
  }


  obtenerToken(){
    if (isPlatformBrowser(this.platformId)) {
      let tokenJson : any = localStorage.getItem('token')
      this.token_usuario = JSON.parse(tokenJson)
      if(this.token_usuario){
        this.obtenerDataUser(this.token_usuario)
      }
    }
  }

  // A traves del token, recuperamos los datos del usuario
  obtenerDataUser( token : any){

    this.userService.getInfoToken(token).subscribe({
      next : (data) => {
        if(data){
          this.usuario_loguado = data.data;
          console.log(this.usuario_loguado)
        }
      },
      error: (err) => {
        console.log(err)
      }
    })
  }


}
