import { Component, OnInit } from '@angular/core';
// RXJS
import { map } from 'rxjs';
// NGRX
import { Store } from '@ngrx/store';
// GAME SELECTOR
import { gameSelector } from '../game.reducer';

@Component({
  selector: 'app-letter-box',
  templateUrl: './letter-box.component.html',
  styleUrls: ['./letter-box.component.css'],
})
export class LetterBoxComponent implements OnInit {
  constructor(private store: Store) {}
  ngOnInit(): void {}

  movieData$ = this.store.select(gameSelector);

  movieNamePlayer$ = this.movieData$.pipe(map((x) => x.movieNamePlayer));
}
