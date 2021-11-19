import { Component, OnInit } from '@angular/core';
// RXJS
import { map } from 'rxjs';
// NGRX
import { Store } from '@ngrx/store';
// GAME SELECTOR
import { gameSelector } from '../game.reducer';

@Component({
  selector: 'app-hint-box',
  templateUrl: './hint-box.component.html',
  styleUrls: ['./hint-box.component.css'],
})
export class HintBoxComponent implements OnInit {
  constructor(private store: Store) {}

  ngOnInit(): void {}

  movieData$ = this.store.select(gameSelector);

  hint$ = this.movieData$.pipe(map((x) => x.movieHint));
}
