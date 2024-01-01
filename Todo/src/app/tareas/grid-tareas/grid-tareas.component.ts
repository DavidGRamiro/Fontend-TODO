import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, Input, ViewChild, type OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { TaggedTemplateExpr } from '@angular/compiler';
import { ChangeDetectorRef } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import TareasFormComponent from '../tareas-form/tareas-form.component';
import { ButtonModule } from 'primeng/button';
import {MatButtonModule} from '@angular/material/button';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { SidebarModule } from 'primeng/sidebar';
import { TareaModel } from '../../shared/models/tarea.modelo';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import InfoTaskComponent from '../info-task/info-task.component';





@Component({
  selector: 'app-grid-tareas',
  standalone: true,
  imports: [
      CommonModule, DialogModule, TareasFormComponent,
      ButtonModule, MatButtonModule, TableModule, ToolbarModule,
      SidebarModule, ToastModule, InfoTaskComponent
    ],
  templateUrl: './grid-tareas.component.html',
  styleUrl: './grid-tareas.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class GridTareasComponent implements OnInit {


  private _taskService = inject(TaskService)
  public aTareas: TareaModel[] = [];
  public tareaSeleccionada : TareaModel = new TareaModel()

  public resumenTarea: boolean = false;
  public altaTarea : boolean = false;
  public isEdditing : boolean = false;

  constructor( private cdRef: ChangeDetectorRef,
              private _messageService : MessageService){}

  ngOnInit(): void {
    this.getTareas()
  }

  // Obtenemos todas las tareas que estan dadas de alta
  getTareas(){
    this._taskService.obtenerTareas().subscribe( {
      next: (data) => {
        setTimeout(() => {
          this.ordenarLista(data)
          this.cdRef.detectChanges();
        },200)
      },
      error: (err) => {
        this._messageService.add({ severity: 'error', detail: 'Ha ocurrido un error al intentar recuperar las tareas', summary:'Vaya !'  })
        console.log(err)
      }
    })
  }

  // Eliminamos una tarea del grid a partir del id
  eliminarTarea(tarea : any){
    this._taskService.eliminarTarea(tarea.id).subscribe({
      next : (data) =>{
        this._messageService.add({ severity: 'success', detail: '', summary: data.resultado })
        setTimeout(() => {
          this.getTareas()
        },1000)
      },
      error : (err) => {
        this._messageService.add({ severity: 'error', detail: '', summary: err.resultado })
      }
    })
  }

  // Ordenar lista de tareas por ID
  ordenarLista( tareas : any){
    this.aTareas = tareas
    if(this.aTareas && this.aTareas.length > 0){
      this.aTareas.sort((a,b) =>{
        if(a.id !== null && b.id !== null){
          return a.id - b.id
        }
        return 0
      })
    }
  }

  // Ver el detalle de una tarea a partir del id que recibe
  verDetalle( tarea : any){
    this.tareaSeleccionada = tarea
    this.resumenTarea = true
  }

  // Edición de una tarea a partir del id recibido
  editarTarea(tarea : any){
    this.tareaSeleccionada = new TareaModel()
    this.tareaSeleccionada = tarea
    // Se abre el mismo modal y componente que para el alta de una tarea
    this.altaTarea = true
    this.isEdditing = true
  }

  // Añadir tarea. Abre formulario de alta
  addTarea(){
    this.altaTarea = true
    this.isEdditing =  false
  }

  // Recibimos la respuesta del formulario de tareas, para refrescar el grid y cerrar el modal
  getEmitterForm(event : any){
    if(event){
      this.altaTarea = false
      this.getTareas()
    }else{
      this.altaTarea = true
    }
  }

  // Recoge el evento de cerrar el modal de edición o de alta
  cerrarModal(){
    this.isEdditing = false;
    this.altaTarea = false;
  }

}
