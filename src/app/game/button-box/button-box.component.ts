import { Component, OnInit } from '@angular/core';
// RXJS
import { map } from 'rxjs';
// NGRX
import { Store } from '@ngrx/store';
// GAME SELECTOR
import { gameSelector } from '../game.reducer';
// ACTIONS
import { giveUp, startGame, hint } from '../game.actions';

@Component({
  selector: 'app-button-box',
  templateUrl: './button-box.component.html',
  styleUrls: ['./button-box.component.css'],
})
export class ButtonBoxComponent implements OnInit {
  constructor(private store: Store) {}
  ngOnInit(): void {}

  // STOREs
  movieData$ = this.store.select(gameSelector);

  // PIPE DEI TENTATIVI
  attempts$ = this.movieData$.pipe(map((x) => x.remainingAttempt));
  // PIPE DEI TIPS
  tipsDisabled$ = this.movieData$.pipe(map((x) => x.tipsDisabled));
  // PIPE DEL GIVEUP
  giveUpDisabled$ = this.movieData$.pipe(map((x) => x.giveUpDisabled));

  newGameTrigger() {
    this.store.dispatch(startGame());
  }
  giveUpTrigger() {
    this.store.dispatch(giveUp());
  }
  hintTrigger() {
    this.store.dispatch(hint());
  }
}
