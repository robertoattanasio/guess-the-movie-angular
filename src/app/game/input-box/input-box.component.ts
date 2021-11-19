import { Component, OnInit } from '@angular/core';
// RXJS
import { map } from 'rxjs';
// STORE
import { Store } from '@ngrx/store';
import { checkLetter, checkWord } from '../game.actions';
// SELECTOR
import { gameSelector } from '../game.reducer';

@Component({
  selector: 'app-input-box',
  templateUrl: './input-box.component.html',
  styleUrls: ['./input-box.component.css'],
})
export class InputBoxComponent implements OnInit {
  constructor(private store: Store) {}

  ngOnInit(): void {}

  inputLetter: string;
  inputWord: string;

  gameData$ = this.store.select(gameSelector);
  answerInfo$ = this.gameData$.pipe(map((x) => x.infos));
  gameLocked$ = this.gameData$.pipe(map((x) => x.gameLocked));

  checkLetter(letter: string) {
    if (this.inputLetter) {
      this.store.dispatch(checkLetter({ letter }));
      this.inputLetter = '';
    }
  }
  checkWord(word: string) {
    if (this.inputWord) {
      this.store.dispatch(checkWord({ word }));
    }
  }
}
