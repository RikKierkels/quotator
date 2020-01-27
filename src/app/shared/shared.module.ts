import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimerComponent } from './timer/timer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from './button/button.component';

@NgModule({
  declarations: [TimerComponent, ButtonComponent],
  exports: [TimerComponent, ButtonComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule]
})
export class SharedModule {}
