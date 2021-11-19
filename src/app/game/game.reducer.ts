import { Action, createReducer, createFeatureSelector, on } from '@ngrx/store';
import {
  startGame,
  checkLetter,
  giveUp,
  hint,
  checkWord,
} from './game.actions';

export interface Movie {
  name: string;
  hint: string;
}
export interface MovieState {
  movieList: Movie[];
  // Il nome del film verrà splittato in un'array di stringhe per poter ciclare con NgFor
  movieName: string[];
  movieHint: string;
  // Il numero del film nella lista, serve per effettuare alcuni check
  movieNumber: number;
  // La stringa del giocatore che all'inizio verrà riempita con asterischi e spazi vuoti
  movieNamePlayer: string[];
  remainingAttempt: number;
  insertLetterDisabled: boolean;
  insertWordDisabled: boolean;
  tipsDisabled: boolean;
  giveUpDisabled: boolean;
  infos: string;
}

const initialMovieState: MovieState = {
  movieList: [
    {
      name: 'Lord Of The Rings',
      hint: 'A meek Hobbit from the Shire and eight companions set out on a journey to destroy the powerful One Ring and save Middle-earth from the Dark Lord Sauron.',
    },
    {
      name: 'Extremely Loud And Incredibly Close',
      hint: 'A nine-year-old amateur inventor, Francophile, and pacifist searches New York City for the lock that matches a mysterious key left behind by his father, who died in the World Trade Center on September 11, 2001.',
    },
    {
      name: 'Gravity',
      hint: 'Two astronauts work together to survive after an accident leaves them stranded in space.',
    },
    {
      name: 'Kuch Kuch Hota Hai',
      hint: "During their college years, Anjali was in love with her best-friend Rahul, but he had eyes only for Tina. Years later, Rahul and the now-deceased Tina's eight-year-old daughter attempts to reunite her father and Anjali.",
    },
    {
      name: 'The Silence of The Lambs',
      hint: 'A young F.B.I. cadet must receive the help of an incarcerated and manipulative cannibal killer to help catch another serial killer, a madman who skins his victims.',
    },
    {
      name: 'The Wolf of Wall Street',
      hint: 'Based on the true story of Jordan Belfort, from his rise to a wealthy stock-broker living the high life to his fall involving crime, corruption and the federal government.',
    },
  ],
  movieName: [],
  movieHint: '',
  movieNumber: 0,
  movieNamePlayer: [],
  remainingAttempt: 7,
  insertLetterDisabled: false,
  insertWordDisabled: false,
  tipsDisabled: false,
  giveUpDisabled: false,
  infos: 'Please Enjoy!',
};

const reducer = createReducer(
  initialMovieState,
  // Inizio del gioco, richiamato sia da un NgOnInit sia da un bottone di restart
  on(startGame, (state) => {
    // Viene scelto un film casuale nella lista di film a disposizione
    let randomMovie = Math.floor(Math.random() * state.movieList.length);
    // Nel caso in cui uscisse il film precedente verrà cercato un altro film
    do {
      randomMovie = Math.floor(Math.random() * state.movieList.length);
    } while (randomMovie == state.movieNumber);
    // Conversione del nome del film da stringa ad array di stringhe(lettere) in UpperCase, questo perché ngFor cicla solo su stringhe
    let movieNameSplitted = state.movieList[randomMovie].name
      .toUpperCase()
      .split('');
    // Creazione dell'array del giocatore della stessa lunghezza di quello del film ma con tutti i campi vuoti
    let movieNamePlayer = [...movieNameSplitted];
    // Sostituzione di tutte le lettere in * e lasciando gli spazi vuoti come tali
    for (let c = 0; c < movieNamePlayer.length; c++) {
      if (movieNamePlayer[c] != ' ') {
        movieNamePlayer[c] = '*';
      }
    }
    // RITORNO DELL'OGGETTO PER INIZIARE A GIOCARE
    return {
      ...state,
      movieName: movieNameSplitted,
      movieHint: '',
      movieNumber: randomMovie,
      movieNamePlayer: movieNamePlayer,
      remainingAttempt: 7,
      insertLetterDisabled: false,
      insertWordDisabled: false,
      tipsDisabled: false,
      giveUpDisabled: false,
      infos: 'Please Enjoy!',
    };
  }),

  // Controllo della lettera
  on(checkLetter, (state, action) => {
    // Conversione della lettera ricevuta in Uppercase
    let receivedLetter = action.letter.toUpperCase();
    // Copia del nome del film originale e di quello attuale del giocatore per il check
    let movieToBeChecked = [...state.movieName];
    let movieNamePlayer = [...state.movieNamePlayer];
    // Creazione di una stringa per le informazioni da inviare all'utente riguardo l'esito
    let newInfo = "Nope, this movie doesn't include the letter you're asking.";
    // La lettera viene controllata in tutto l'array del film e se ci sono dei match verranno scritti in quello del giocatore
    for (let c = 0; c < movieToBeChecked.length; c++) {
      if (receivedLetter == movieToBeChecked[c].toUpperCase()) {
        movieNamePlayer[c] = receivedLetter;
        newInfo =
          'Oh yes, this movie contains the letter you asked for. Keep going!';
      }
    }
    let insertLetterDisabled = state.remainingAttempt - 1;
    // RITORNO DELL'OGGETTO CON RISPOSTE AGGIUNTE ED UN TENTATIVO IN MENO
    return {
      ...state,
      movieNamePlayer: movieNamePlayer,
      remainingAttempt: insertLetterDisabled,
      insertLetterDisabled: insertLetterDisabled == 0 ? true : false,
      infos: newInfo,
    };
  }),

  // Controllo della parola intera
  on(checkWord, (state, action) => {
    // Store del nome inserito in input dal giocatore
    let receivedWord = action.word.toUpperCase().split('');
    // Store del nome originale del film
    let movieToBeChecked = [...state.movieName];
    // Creazione di un contatore che servirà per il check dei due array
    let correctLetterCounter = 0;

    // Controllo primario se i nomi dei due film hanno la stessa lunghezza
    if (receivedWord.length == movieToBeChecked.length) {
      // Ciclo For per controllare se i valori nei due array sono esattamente uguali
      for (let c = 0; c < receivedWord.length; c++) {
        if (receivedWord[c] === movieToBeChecked[c]) {
          // Ogni volta che due lettere combaciano il contatore viene aggiornato sommando un 1
          correctLetterCounter++;
        }
      }
    }
    // Se la lunghezza dell'array del film e il numero del contatore sono uguali vuol dire che il nome inserito è identico a quello del film originale
    // e viene ritornato lo stato di vittoria mostrando la risposta esatta
    let hint = state.movieList[state.movieNumber].hint;
    if (movieToBeChecked.length == correctLetterCounter) {
      return {
        ...state,
        movieNamePlayer: state.movieName,
        infos: 'Congratulations, you got it!',
        movieHint: hint,
        tipsDisabled: true,
        insertLetterDisabled: true,
        insertWordDisabled: true,
        giveUpDisabled: true,
      };
    }
    // Se non fosse così viene ritornato l'oggetto con un tentativo disponibile in meno
    return {
      ...state,
      infos: "I'm sorry but you're wrong...",
    };
  }),

  // Metodo per chi decide di arrendersi
  on(giveUp, (state) => {
    let hint = state.movieList[state.movieNumber].hint;
    return {
      ...state,
      movieNamePlayer: state.movieName,
      movieHint: hint,
      reaminingAttempt: 0,
      insertWordDisabled: true,
      insertLetterDisabled: true,
      tipsDisabled: true,
      giveUpDisabled: true,
      infos: 'So sad that you gave up. There is the solution!',
    };
  }),

  // Metodo che mostra il suggerimento
  on(hint, (state) => {
    let hint = state.movieList[state.movieNumber].hint;
    return {
      ...state,
      movieHint: hint,
      tipsDisabled: true,
    };
  })
);

export function gameReducer(state: MovieState, action: Action) {
  return reducer(state, action);
}

export const gameSelector = createFeatureSelector<MovieState>('guessTheMovie');
