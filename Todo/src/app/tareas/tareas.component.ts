import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, OnInit, ViewChild, inject } from "@angular/core";
import GridTareasComponent from "./grid-tareas/grid-tareas.component";
import { TaskService } from "../services/task.service";



@Component({
  selector: 'app-tareas',
  standalone: true,
  imports: [
      CommonModule, GridTareasComponent
  ],
  templateUrl: './tareas.component.html',
  styleUrl: './tareas.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TareasComponent implements OnInit {


  ngOnInit(): void {

  }


}
