import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, type OnInit } from '@angular/core';
import { TareaModel } from '../../shared/models/tarea.modelo';
import { DividerModule } from 'primeng/divider';
import { ChipModule } from 'primeng/chip';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'app-info-task',
    standalone: true,
    imports: [
        CommonModule, DividerModule, ChipModule,
        ButtonModule
    ],
    templateUrl: './info-task.component.html',
    styleUrl: './info-task.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class InfoTaskComponent implements OnInit {

  // Recibimos la tarea desde el grid
  @Input() set task (_tarea: any){
    if(_tarea.id !== null){
      this.tareaRecibida = _tarea
      console.log("Input set",this.tareaRecibida)
    }
  }

  public tareaRecibida : TareaModel = new TareaModel();

  constructor(){}

  ngOnInit(): void { }

}
