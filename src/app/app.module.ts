import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { NgFor } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import { UserComponent } from './user/user.component';
import { FormsModule } from '@angular/forms';
import { ListComponent } from './list/list.component';

@NgModule({
  declarations: [AppComponent, UserComponent, ListComponent],
  imports: [BrowserModule, AppRoutingModule, RouterModule, FormsModule],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent],
})
export class AppModule {}