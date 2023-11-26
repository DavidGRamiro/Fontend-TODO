import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsuariosComponent implements OnInit {

  ngOnInit(): void { }

}
