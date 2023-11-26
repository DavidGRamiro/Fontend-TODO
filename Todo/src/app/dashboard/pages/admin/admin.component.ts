import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AdminComponent implements OnInit {

  ngOnInit(): void { }

}
