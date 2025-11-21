import { Component, HostListener } from '@angular/core';
import { GifsService } from '../../../gifs/services/gifs.service';

@Component({
  selector: 'shared-sidebar',
  standalone: false,
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  constructor(
    private gifsService: GifsService
  ){}

  public isSidebarVisible: boolean = true;
  public isMobile: boolean = window.innerWidth <= 600;

  get tagHistory(){
    return this.gifsService.tagsHistory;
  }
  searhTag(tag:string){
    this.gifsService.searchTag(tag);
  }

  toggleSidebar(): void {
    this.isSidebarVisible = true;
  }

  closeSidebar(): void {
    this.isSidebarVisible = false;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    const width = event.target.innerWidth;
    this.isMobile = width <= 600;

    const sidebar:HTMLElement = document.getElementById('sidebar')!;
    // Esto de aqui muestra el sidebar al cambiar el tamaño de la ventana
    if (!this.isMobile) {
      this.isSidebarVisible = true;
      sidebar.style.position='static';
    }
  }
}
