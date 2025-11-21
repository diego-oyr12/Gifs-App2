import { Component, Input } from '@angular/core';
import { Gif } from '../../interfaces/gifs.interfaces';

@Component({
  selector: 'app-card-list',
  standalone: false,
  templateUrl: './card-list.component.html'
})
export class CardListComponent {
  @Input()
  public gifs: Gif[]=[];

  public selectedGif!:Gif;
  public showModal:boolean=false;

  openModal(gif:Gif):void{
    this.showModal=true;
    this.selectedGif = gif;
  }
  closeModal():void{
    this.showModal=false;
  }
}
