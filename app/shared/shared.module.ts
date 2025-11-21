import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LazyimageComponent } from './components/lazyimage/lazy-image.component';
import { ModalComponent } from './components/modal/modal.component';



@NgModule({
  declarations: [
    SidebarComponent,
    LazyimageComponent,
    ModalComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SidebarComponent,
    LazyimageComponent,
    ModalComponent
  ]
})
export class SharedModule { }
