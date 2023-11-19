import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class LogoutComponent implements OnInit {

  ngOnInit(): void { }

}
