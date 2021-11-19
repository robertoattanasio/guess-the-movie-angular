import { Component, OnInit } from '@angular/core';
// RXJS
import { map } from 'rxjs';
// NGRX
import { Store } from '@ngrx/store';
// ACTIONS
import { startGame, checkLetter } from './game.actions';
// REDUCERS
import { gameSelector } from './game.reducer';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})
export class GameComponent implements OnInit {
  constructor(private store: Store) {}
  ngOnInit(): void {
    this.store.dispatch(startGame());
  }

  movieData$ = this.store.select(gameSelector);

  movieName$ = this.movieData$.pipe(map((x) => x.movieName));
}
