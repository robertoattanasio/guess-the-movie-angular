import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
// NGRX
import { StoreModule } from '@ngrx/store';
import { gameReducer } from './game/game.reducer';
// ROUTING MODULE
import { AppRoutingModule } from './app-routing.module';
// APP COMPONENT
import { AppComponent } from './app.component';
// HEADER COMPONENT
import { HeaderComponent } from './header/header.component';
// GAME COMPONENTS
import { GameComponent } from './game/game.component';
import { LetterBoxComponent } from './game/letter-box/letter-box.component';
import { InputBoxComponent } from './game/input-box/input-box.component';
import { ButtonBoxComponent } from './game/button-box/button-box.component';
import { HintBoxComponent } from './game/hint-box/hint-box.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    GameComponent,
    LetterBoxComponent,
    InputBoxComponent,
    ButtonBoxComponent,
    HintBoxComponent,
  ],
  imports: [
    StoreModule.forRoot({
      guessTheMovie: gameReducer,
    }),
    FormsModule,
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
