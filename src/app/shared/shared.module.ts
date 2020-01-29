import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TimerComponent } from 'src/app/shared/timer/timer.component';
import { ButtonComponent } from 'src/app/shared/button/button.component';

@NgModule({
  declarations: [TimerComponent, ButtonComponent],
  exports: [TimerComponent, ButtonComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule]
})
export class SharedModule {}
