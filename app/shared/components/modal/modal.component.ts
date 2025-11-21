import { Component, Input } from '@angular/core';
import { Gif } from '../../../gifs/interfaces/gifs.interfaces';

@Component({
  selector: 'shared-modal',
  standalone: true,
  templateUrl: './modal.component.html'
})
export class ModalComponent {
  @Input() gif!:Gif;
}
