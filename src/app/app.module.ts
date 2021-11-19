import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// ROUTING MODULE
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// HEADER COMPONENT
import { HeaderComponent } from './header/header.component';
import { GameComponent } from './game/game.component';
import { LetterBoxComponent } from './game/letter-box/letter-box.component';
import { InputBoxComponent } from './game/input-box/input-box.component';
import { ButtonBoxComponent } from './game/button-box/button-box.component';

@NgModule({
  declarations: [AppComponent, HeaderComponent, GameComponent, LetterBoxComponent, InputBoxComponent, ButtonBoxComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
