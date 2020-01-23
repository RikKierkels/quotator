import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { Environment } from 'src/app/shared/environment';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule],
  providers: [{ provide: Environment, useValue: environment }],
  bootstrap: [AppComponent]
})
export class AppModule {}
