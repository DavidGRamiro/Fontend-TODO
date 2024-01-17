import { Component, Inject, OnInit, PLATFORM_ID, ViewChild, inject } from '@angular/core';
import { CommonModule, NumberFormatStyle, isPlatformBrowser } from '@angular/common';
import { UsuarioService } from '../../../services/usuario.service';
import { MenuItem, MessageService } from 'primeng/api';
import InfoPerfilComponent from './info-perfil/info-perfil.component';
import GridTareasComponent from '../../../tareas/grid-tareas/grid-tareas.component';
import TareasFormComponent from '../../../tareas/tareas-form/tareas-form.component';
import SubscripcionComponent from '../subscripcion/subscripcion.component';
import { Router } from '@angular/router';
import TareasComponent from '../../../tareas/tareas.component';
import { ToastModule } from 'primeng/toast';
import { ChipModule } from 'primeng/chip';
import { OverlayPanelModule } from 'primeng/overlaypanel';


@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, GridTareasComponent, TareasFormComponent,
            InfoPerfilComponent, SubscripcionComponent, TareasComponent,
            ToastModule, ChipModule, OverlayPanelModule],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.sass'
})
export default class PerfilComponent implements OnInit{

  @ViewChild('tareas') tareas : TareasComponent = new TareasComponent()

  public token_usuario : string = ''
  public usuario_loguado : any = null;
  private userService = inject(UsuarioService)

  // Control de estado
  public sidebarVisible: boolean = false;
  public bActualizarDatos : boolean = false;
  public bModalVisible : boolean = false
  public bMostrarGrid : boolean = false;
  public bMostrarSub : boolean = false

  // Definición del menú
  items: MenuItem[] | undefined;

  constructor(@Inject(PLATFORM_ID) private platformId: Object ,
              private _msgService: MessageService,
              private _router : Router){}

  ngOnInit(): void {
    this.obtenerToken();
    // Se abre de primera instancia el componente del grid principal
    this.bMostrarGrid = true
  }

  // Método para obtener el token de localstore y recuperación del usuario
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
        }
      },
      error: (err) => {
        this._msgService.add({ severity: 'error', detail: '', summary: 'No se han podido recuperar los datos del usuario' })
      }
    })
  }

   // Método para cerrar sesión y eliminar el token
  logout(){
    this.userService.logout().subscribe({
      next : (data) => {
        this._msgService.add({ severity: 'success', detail: '', summary:'Sesión cerrada' })
        setTimeout(() => {
          this._router.navigate([''])
          sessionStorage.removeItem('token')
        },1500)
    },
      error : (err) => {
        this._msgService.add({ severity: 'error', detail: 'Ha ocurrido un error', summary: err.message })
      }
    })
  }

  // Control entre pestañas
  mostrarGridTaks(){
    this.bActualizarDatos = false
    this.bMostrarSub = false
    this.bMostrarGrid = true
  }

  // Control entre pestañas
  editarUsuario(){
    this.bMostrarGrid = false
    this.bMostrarSub = false
    this.bActualizarDatos = true
  }

  // Control entre pestañas
  mostrarSub(){
    this.bActualizarDatos = false
    this.bMostrarGrid = false
    this.bMostrarSub = true
  }

  // Desplegar un menú
  clickAvatar(){
    console.log('Click avatar')
  }
}
