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

  movieData$ = this.store.select(gameSelector);

  attempts$ = this.movieData$.pipe(map((x) => x.reaminingAttempt));

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
