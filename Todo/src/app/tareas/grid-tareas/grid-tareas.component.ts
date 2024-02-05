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
import { MenuItem, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import InfoTaskComponent from '../info-task/info-task.component';
import { SpeedDialModule } from 'primeng/speeddial';
import { DropdownModule } from 'primeng/dropdown';
import { BreadcrumbModule } from 'primeng/breadcrumb';



@Component({
  selector: 'app-grid-tareas',
  standalone: true,
  imports: [
      CommonModule, DialogModule, TareasFormComponent,
      ButtonModule, MatButtonModule, TableModule, ToolbarModule,
      SidebarModule, ToastModule, InfoTaskComponent, SpeedDialModule,
      DropdownModule, BreadcrumbModule
    ],
  templateUrl: './grid-tareas.component.html',
  styleUrl: './grid-tareas.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class GridTareasComponent implements OnInit {


  private _taskService = inject(TaskService)

  public aTareas: TareaModel[] = [];
  public tareaSeleccionada : TareaModel = new TareaModel()
  public categorias : any[] = [];
  public selector : any = null;

  public resumenTarea: boolean = false;
  public altaTarea : boolean = false;
  public isEdditing : boolean = false;
  public hayTareas : boolean = true;

  public selection! : TareaModel;
  // Configuración de BreadCrumb.
  public itemsBread : MenuItem[] = [];
  public home : MenuItem | undefined;

  items: MenuItem[] = []

  constructor( private cdRef: ChangeDetectorRef,
              private _messageService : MessageService){}

  ngOnInit(): void {
    this.getCategorias();
    this.getTareas();
    this.cargarBreadCrumb();
    this.items = [
      {
          icon: 'pi pi-pencil',
          command: () => {
            this.editarTarea(this.selection);
          }
      },
      {
          icon: 'pi pi-trash',
          command: () => {
              this.eliminarTarea(this.selection);
          }
      },
      {
          icon: 'pi pi-info-circle',
          command: () => {
            this.verDetalle(this.selection);
          }
      }
  ];
  }


  // Inicializar el BreadCrumb
  cargarBreadCrumb(){
    this.itemsBread = [ { label: ' Tareas'}]
    this.home = { icon: 'pi pi-home', routerLink: '/'}
  }

  // Obtenemos todas las tareas que estan dadas de alta
  getTareas(){
    this._taskService.obtenerTareas().subscribe( {
      next: (data) => {
        debugger
        if(data.length > 0){
          this.hayTareas = true;
        }else{
          this.hayTareas = false;
        }
        this.ordenarLista(data)
        this.cdRef.detectChanges();
      },
      error: (err) => {
        this._messageService.add({ severity: 'error', detail: 'Ha ocurrido un error al intentar recuperar las tareas', summary:'Vaya !'  })
      }
    })
  }

  // Eliminamos una tarea del grid a partir del id de la selección
  eliminarTarea(tarea : any){
    if(this.selection !== undefined){
      this._taskService.eliminarTarea(tarea.id).subscribe({
        next : (data) =>{
          setTimeout(() => {
            this.getTareas()
            this._messageService.add({ severity: 'success', detail: '', summary: data.resultado })
          },1000)
        },
        error : (err) => {
          this._messageService.add({ severity: 'error', detail: '', summary: err.resultado })
        }
      })
    }else{
      this._messageService.add({ severity: 'warn', detail: '', summary: 'Selecciona una tarea para poder eliminarla' })
    }
  }

  // Ordenar lista de tareas por ID
  ordenarLista( tareas : any){
    if(this.selector === 'Todas' || this.selector === null){
      this.aTareas = tareas
    }else{
      this.aTareas = tareas.filter((tarea : any) => tarea.categoria === this.selector)
    }
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
    if(this.selection !== undefined){
      this.tareaSeleccionada = tarea
      this.resumenTarea = true
    }else{
      this._messageService.add({ severity: 'warn', detail: '', summary: 'Selecciona una tarea para poder ver el detalle' })
    }
  }

  // Edición de una tarea a partir del id recibido
  editarTarea(tarea : any){
    if(this.selection !== undefined){
      this.tareaSeleccionada = new TareaModel()
      this.tareaSeleccionada = tarea
      // Se abre el mismo modal y componente que para el alta de una tarea
      this.altaTarea = true
      this.isEdditing = true
    }else{
      this._messageService.add({ severity: 'warn', detail: '', summary: 'Selecciona una tarea para poder editarla' })
    }
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

  // Obtener todas las categorias existentes para aplicar al filtro
  getCategorias(){
    this._taskService.obtenerCategorias().subscribe({
      next : (data) => {
        this.categorias.push({ name: 'Todas', code: 0 })
        let cat = data.map(( cat : any) => this.categorias.push({ name: cat.categoria, code: cat.id }))

      },
      error : (err) => {
        this._messageService.add({ severity: 'error', detail: '', summary: 'Ha ocurrido un error al intentar recuperar las categorias' })
      }
    })
  }

  onChangeSelector(event : any){
    this.selector = event.value.name
    this.getTareas();
  }

}
