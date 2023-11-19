import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class LoginComponent implements OnInit {

  ngOnInit(): void { }

}
