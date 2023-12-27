import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { FormControl, FormControlName, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

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

  ngOnInit(): void { }

  constructor(){}

  // Control de formulario
  public formTask : FormGroup = new FormGroup({
    titulo : new FormControl(),
    descripcion : new FormControl(),
    prioridad : new FormControl(),
    fc_estimada : new FormControl(),
    categoria : new FormControl(),
    texto: new FormControl()
  })

  //Guardamos la tarea en BBDD
  guardarTarea(){
    let data = this.formTask.value
    console.log(data)
  }

  // Limpiar el formulario en el caso de que no queremos guardarlo
  limpiarForm(){
    this.formTask.reset()
  }



}
