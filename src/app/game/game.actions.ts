import { createAction, props } from '@ngrx/store';

export const startGame = createAction('Game/startGame');
export const checkLetter = createAction(
  'GAME/checkLetter',
  props<{ letter: string }>()
);
export const checkWord = createAction(
  'GAME/checkWord',
  props<{ word: string }>()
);
export const giveUp = createAction('GAME/giveUp');
export const hint = createAction('GAME/hint');
