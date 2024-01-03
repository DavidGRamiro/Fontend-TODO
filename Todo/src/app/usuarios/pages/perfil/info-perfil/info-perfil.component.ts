import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { UsuarioService } from '../../../../services/usuario.service';
import { ToastModule } from 'primeng/toast';
import { PasswordModule } from 'primeng/password';
import { DividerModule } from 'primeng/divider';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { AvatarService } from '../../../../services/avatar.service';
import { CarouselModule } from 'primeng/carousel';


@Component({
    selector: 'app-info-perfil',
    standalone: true,
    imports: [
        CommonModule, ReactiveFormsModule, FormsModule, InputTextModule,
        ButtonModule, ToastModule, PasswordModule, DividerModule,
        AvatarModule, AvatarGroupModule, CarouselModule

    ],
    templateUrl: './info-perfil.component.html',
    styleUrl: './info-perfil.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class InfoPerfilComponent implements OnInit {

  @Output() eventRes : EventEmitter<any> = new EventEmitter<any>()
  @Input() set usuarioLogueado(_usuario : any){
    if(_usuario !== undefined || null){
      this.user = _usuario;
    }
  }

  public user : any = {}
  public password_similar : boolean = false;
  public password_coincide : boolean = true;
  public avatares : any[] = []
  public responsiveOptions: any[] | undefined;
  public avatarsName : any[] = []

  public formData : FormGroup = new FormGroup({
    username : new FormControl( ),
    password : new FormControl( ),
    email : new FormControl( ),
    name : new FormControl( ),
    password_nueva : new FormControl(),
    password_confirmacion : new FormControl()
  })

  // Servicios
  private _userService = inject(UsuarioService);
  private _avatarService = inject(AvatarService)

  constructor( private _messageService : MessageService){}

  ngOnInit(): void {
    this.cargarAvatares();
    this.responsiveOptions = [
      {
          breakpoint: '1199px',
          numVisible: 1,
          numScroll: 1
      },
      {
          breakpoint: '991px',
          numVisible: 2,
          numScroll: 1
      },
      {
          breakpoint: '767px',
          numVisible: 1,
          numScroll: 1
      }
    ];
  }


  // Actualizar los datos del usuario
  actualizarDatos(){
    if(this.formData.valid){

      const password_actual = this.user.password
      const password_formulario = this.formData.get('password_nueva')?.value
      const password_confirmacion = this.formData.get('password_confirmacion')?.value

      if(password_actual === password_formulario){
        this.password_similar = true
        this._messageService.add({ severity:'error', detail:'La constraseña no puede ser igual a la actual', summary:'Error en contraseña' })
      }else if (password_confirmacion !== password_formulario){
          this.password_coincide = false
          this._messageService.add({ severity:'error', detail:'Las contraseñas no coinciden', summary:'Revise los datos' })
      }else{
        // Actualización de los datos de un usuario
        const usuario = { id: this.user.id,
                          id_fk_rol : this.user.id_fk_rol,
                          username: this.formData.get('username')?.value ,
                          name : this.formData.get('name')?.value,
                          password : password_confirmacion,
                          email: this.formData.get('email')?.value}

        this._userService.updateUsuario(usuario).subscribe({
          next: (data) => {
            this._messageService.add({ severity:'success', detail:'', summary:'Datos actualizados' })
            setTimeout(() => {
              // Emitimos el cierre del modal de update de datos
              this.eventRes.emit(false)
              // Formateo de los valores del formulario
              this.formData.reset()
            },1700)
          },
          error : (err) => {
            this._messageService.add({ severity:'error', detail:'', summary:'ha ocurrido un error, inténtelo más tarde' })
          },
        })
      }
    }else{
      console.log('Entra en no valido')
      this._messageService.add({ severity:'error', detail:'Complete los campos necesarios', summary:'Datos inválidos' })
    }
  }

  // Cancelar la actualización de datos
  limpiarForm(){
    this.formData.reset()
  }

  // Cargamos todos los avatares que tenemos predefinidos
  cargarAvatares(){
    this.avatares = this._avatarService.getTodosAvatares()
    for(let av of this.avatares){
      this.avatarsName.push( {'name': av.name, img: av.img} )
    }
  }

  // Se establece como avatar de usuario
  // Pensar si se guarda la ruta en BBDD para recuperarla cuando se inicia sesión
  setAvatar(){
    console.log("Eligiendo avatar")
  }
}




