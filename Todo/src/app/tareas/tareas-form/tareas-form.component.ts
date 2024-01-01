import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, Output, type OnInit, EventEmitter, Input, ChangeDetectorRef } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { FormControl, FormControlName, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { ServerModule } from '@angular/platform-server';
import { serialize } from 'v8';
import { CategoriaModel, PrioridadesModelo, TareaModel } from '../../shared/models/tarea.modelo';
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
  // Recibe la tarea en modo de edición
  @Input() set editarTarea (_tarea: TareaModel){
    if(_tarea.id !== null ){
      this.tareaEdicion = _tarea
      this.fomatearDatosEntrada(this.tareaEdicion)
    }
  }
  @Input() isEditting : boolean = false;

  private _tareasService = inject(TaskService);
  public categorias : CategoriaModel[] = [];
  public prioridades : PrioridadesModelo[] = [ { tipo: 'Bajo', color : 'Green' },
                                { tipo: 'Media', color : 'Orange' },
                                { tipo: 'Alta', color : 'Red' }];

  public categoriaEntrante : CategoriaModel[] = []
  public prioridadEntrante : PrioridadesModelo[] = []
  public fechaEntrante : Date = new Date()

  public tarea : TareaModel = new TareaModel()
  public tareaEdicion : TareaModel = new TareaModel()
  public editar : boolean = false;
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

  // Control de formulario de actualización
  public formTaskEdit : FormGroup = new FormGroup({
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
        this._messageService.add({ severity: 'error', summary: 'UPS !', detail: 'No hemos podido recuperar tus categorias, inténtelo más tarde.' })
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
          this._messageService.add({ severity: 'error', summary: 'UPS !', detail: 'Parece que ha ocurrido un error, inténtalo más tarde.' })
        }
      })
    }
  }

  //Formatemaos los datos antes de mandarlos al backend en formato válido
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

  // Formateo de datos para el correcto renderizado de componentes en front
  fomatearDatosEntrada(data : TareaModel){
    // Obtener la categoría seleccionada
    this.categoriaEntrante = this.categorias.filter( element => element.categoria === data.categoria)
    // Obtener la prioridad de la tarea
    this.prioridadEntrante = this.prioridades.filter( element => element.tipo === data.severity)
    // Obtener la fecha y convertirla en un formato válido para el componente
    this.fechaEntrante =  new Date(data.fecha_estimada)
  }

  // Limpiar el formulario en el caso de que no queremos guardarlo
  limpiarForm(){
    this.formTask.reset()
  }

  // Actualización de la tarea por formulario de edición
  updateTarea(){
    if(this.formTaskEdit.valid){
      let actualizar_tarea = this.formTaskEdit.value
      let id_tarea = this.tareaEdicion.id
      this.formatearDatos(actualizar_tarea)
      this._tareasService.editarTarea(id_tarea!, actualizar_tarea).subscribe({
        next: (data) => {
          this._messageService.add({ severity: 'success', summary: 'Recibido !', detail: 'La tarea ha sido actualizada' })
          this.eventRes.emit(true)
          console.log(data)
        },
        error: (err) => {
          this.eventRes.emit(false)
          console.log(err)
        }
      })

    }
  }




}


