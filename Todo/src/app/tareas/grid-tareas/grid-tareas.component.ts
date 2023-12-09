import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';

@Component({
  selector: 'app-grid-tareas',
  standalone: true,
  imports: [
      CommonModule,
  ],
  templateUrl: './grid-tareas.component.html',
  styleUrl: './grid-tareas.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class GridTareasComponent implements OnInit {

  ngOnInit(): void { }

}
