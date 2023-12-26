import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';

@Component({
    selector: 'app-sucripcion',
    standalone: true,
    imports: [
        CommonModule,
    ],
    templateUrl: './subscripcion.component.html',
    styleUrl: './subscripcion.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class SubscripcionComponent implements OnInit {

    ngOnInit(): void { }

}
