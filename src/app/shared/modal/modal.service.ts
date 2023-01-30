import {ComponentRef, Injectable, TemplateRef, ViewContainerRef} from '@angular/core';
import {ModalComponent} from "./modal.component";
import {firstValueFrom} from "rxjs";

export enum ModalResult {
  Confirm = 'Confirm',
  Close = 'Close'
}

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private modal!: ComponentRef<ModalComponent>;

  constructor() {}

  openModal(viewContainerRef: ViewContainerRef, modalContent?: TemplateRef<any>): ModalComponent {
    this.modal = viewContainerRef.createComponent(ModalComponent);
    this.modal.instance.modalContent = modalContent ?? null;

    firstValueFrom(this.modal.instance.action).then(() => {
      // I actually do not need the modal result for anything
      this.modal.destroy();
    });

    return this.modal.instance;
  }
}
