import {Component, Input, TemplateRef} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Subject} from "rxjs";
import {ModalResult} from "./modal.service";

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {

  @Input() modalContent!: TemplateRef<any> | null;
  action = new Subject<ModalResult>();
}
