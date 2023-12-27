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



@Component({
  selector: 'app-grid-tareas',
  standalone: true,
  imports: [
      CommonModule, DialogModule, TareasFormComponent,
      ButtonModule, MatButtonModule, TableModule, ToolbarModule,
      SidebarModule
    ],
  templateUrl: './grid-tareas.component.html',
  styleUrl: './grid-tareas.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class GridTareasComponent implements OnInit {


  private _taskService = inject(TaskService)
  public aTareas: any = null;

  public showTable: boolean = false;
  public resumenTarea: boolean = false;
  public altaTarea : boolean = false;

  constructor( private cdRef: ChangeDetectorRef){}

  ngOnInit(): void {
    this.getTareas()
  }

  // Obtenemos todas las tareas que estan dadas de alta
  getTareas(){
    this._taskService.obtenerTareas().subscribe( {
      next: (data) => {
        setTimeout(() => {
          this.aTareas = data
          this.showTable = true
          this.cdRef.detectChanges();
        },200)
      }
    })
  }

  // Ver el detalle de una tarea a partir del id que recibe
  verDetalle(){
    this.resumenTarea = true
    console.log("Ver el detalle de una tarea")
  }

  // Añadir tarea. Abre formulario de alta
  addTarea(){
    this.altaTarea = true
  }

}
