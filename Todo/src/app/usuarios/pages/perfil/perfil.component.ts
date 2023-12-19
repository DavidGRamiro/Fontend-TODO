import { Component, Inject, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { CommonModule, NumberFormatStyle, isPlatformBrowser } from '@angular/common';
import { UsuarioService } from '../../../services/usuario.service';
import { MenuItem } from 'primeng/api';
import InfoPerfilComponent from './info-perfil/info-perfil.component';
import GridTareasComponent from '../../../tareas/grid-tareas/grid-tareas.component';
import TareasFormComponent from '../../../tareas/tareas-form/tareas-form.component';
import SucripcionComponent from '../subscripcion/subscripcion.component';
import SubscripcionComponent from '../subscripcion/subscripcion.component';


@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, GridTareasComponent, TareasFormComponent,
            InfoPerfilComponent, SubscripcionComponent],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.sass'
})
export default class PerfilComponent implements OnInit{

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

  constructor(@Inject(PLATFORM_ID) private platformId: Object){}

  ngOnInit(): void {
    this.obtenerToken();
    // this.cargarMenuDashboard();
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
          console.log(this.usuario_loguado)
        }
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  mostrarGridTaks(){
    this.bActualizarDatos = false
    this.bMostrarSub = false
    this.bMostrarGrid = true
  }

  editarUsuario(){
    this.bMostrarGrid = false
    this.bMostrarSub = false
    this.bActualizarDatos = true
  }

  mostrarSub(){
    this.bActualizarDatos = false
    this.bMostrarGrid = false
    this.bMostrarSub = true

  }

  logout(){
    this.userService.logout( this.token_usuario).subscribe({
      next : (data) => {
        console.log(data)
      },
      error : (err) => {
        console.log(err)
      }
    })
  }



  // Cargamos el menu de dashboard del usuario
  // cargarMenuDashboard(){
  //   this.items = [
  //     { label: 'Datos personales',
  //       items: [
  //         { label: 'Actualizar datos',  icon: 'pi pi-pencil',
  //           command: () => {
  //           this.actualizarDatos()}
  //         },
  //         { label: 'Cambiar avatar', icon: 'pi pi-user'},
  //         { label: 'Subscripción', icon: 'pi pi-cart-plus'},
  //         { label: 'Eliminar cuenta', icon: 'pi pi-trash'},
  //       ]
  //     },
  //     { label: 'Tareas',
  //       items: [
  //       { label: 'Todas las tareas', icon: 'pi pi-pencil' },
  //       { label: 'Tareas activas', icon: 'pi pi-user'},
  //       { label: 'Tareas pendientes', icon: 'pi pi-trash'},
  //       { label: 'Tareas completadas', icon: 'pi pi-cart-plus'},
  //       ]
  //     }
  //   ]
  // }

  // Abre el modal para actulizar los datos del usuario
  // actualizarDatos(){
  //   this.bModalVisible = true
  //   this.bActualizarDatos = true
  // }

  // getEmitter(event : any){
  //   this.bModalVisible = false
  // }



}
