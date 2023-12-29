import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, Output, type OnInit, EventEmitter } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { FormControl, FormControlName, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { ServerModule } from '@angular/platform-server';
import { serialize } from 'v8';
import { TareaModel } from '../../shared/models/tarea.modelo';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-tareas-form',
    standalone: true,
    imports: [
        CommonModule, ButtonModule, InputTextModule, InputTextareaModule,
        DropdownModule, CalendarModule, FormsModule, ReactiveFormsModule
    ],
    templateUrl: './tareas-form.component.html',
    styleUrl: './tareas-form.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TareasFormComponent implements OnInit {

  // Emisión de respuesta a componente padre para cerrar el modal y refrescar el grid
  @Output() eventRes : EventEmitter<boolean> = new EventEmitter<boolean>()

  private _tareasService = inject(TaskService);
  public categorias : any[] = [];
  public prioridades :any[] = [ { tipo: 'Baja', color : 'Green' },
                                { tipo: 'Media', color : 'Orange' },
                                { tipo: 'Alta', color : 'Red' }];

  public tarea : TareaModel = new TareaModel()
  fechaSeleccionada! : Date;

  ngOnInit(): void {
    this.getCategorias();
  }

  constructor(private _messageService : MessageService){}

  // Control de formulario
  public formTask : FormGroup = new FormGroup({
    titulo : new FormControl(),
    descripcion : new FormControl(),
    texto: new FormControl(),
    severity : new FormControl(),
    fecha_comienzo : new FormControl(new Date()),
    fecha_estimada : new FormControl(),
    tiempo_restante : new FormControl(null),
    id_fk_usuario : new FormControl(null),
    id_fk_categoria : new FormControl(),
  });

  // Obtenemos de BBDD todas las categorias posibles
  getCategorias(){
    this._tareasService.obtenerCategorias().subscribe({
      next : (data) => {
        this.categorias = data;
      },
      error :(err) => {
        this._messageService.add({ severity: 'error', summary: 'UPS !', detail: 'No hemos podido recuperar tus tareas, inténtelo más tarde.' })
      }
    })
  }

  //Guardamos la tarea en BBDD
  guardarTarea(){
    this.tarea = this.formTask.value;
    if(this.formTask.valid){
      this.formatearDatos(this.tarea);
      this._tareasService.crearTarea(this.tarea).subscribe({
        next : (data) => {
          this._messageService.add({ severity: 'success', summary: 'Bravo !', detail: 'Tienes una nueva tarea !' })
          this.eventRes.emit(true)
        },
        error : (err) => {
          this._messageService.add({ severity: 'error', summary: 'UPS !', detail: 'Parece que no ha ocurrido un error, inténtalo más tarde.' })
        }
      })
    }
  }

  formatearDatos( data : any){
    // Formateamos la fecha para eliminar la parte de la Hora
    let fechaFormat  = data.fecha_estimada.toLocaleDateString().split('T')[0]
    let fcComienzoFormat : Date = data.fecha_comienzo.toLocaleDateString().split('T')[0]
    // Obtenemos descripción que queremos
    let cat = data.id_fk_categoria.id
    // Obtenemos el tipo
    let severity = data.severity.tipo

    data.fecha_estimada = fechaFormat
    data.fecha_comienzo = fcComienzoFormat
    data.id_fk_categoria = cat
    data.severity = severity
  }

  // Limpiar el formulario en el caso de que no queremos guardarlo
  limpiarForm(){
    this.formTask.reset()
  }




}


