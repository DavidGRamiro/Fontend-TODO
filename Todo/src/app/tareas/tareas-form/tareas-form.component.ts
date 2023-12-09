import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';

@Component({
    selector: 'app-tareas-form',
    standalone: true,
    imports: [
        CommonModule,
    ],
    templateUrl: './tareas-form.component.html',
    styleUrl: './tareas-form.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TareasFormComponent implements OnInit {

    ngOnInit(): void { }

}
