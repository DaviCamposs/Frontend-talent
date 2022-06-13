import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { PokemonSearchDTO } from './DTO/PokemonSearchDTO';
import { PokemonNotFoundError } from './errors/pokemonNotFoundError';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private base_url: string = 'https://pokeapi.co/api/v2/pokemon/'

  constructor(private http: HttpClient) { }

  searchPokemon(name: string): Observable<PokemonSearchDTO> {
    return this.http.get<PokemonSearchDTO>(this.base_url+ name)
      .pipe(
        catchError(this.handlerError)
      )
  }

  handlerError(error: HttpErrorResponse) {
    return throwError(() => new PokemonNotFoundError());
  }
}
