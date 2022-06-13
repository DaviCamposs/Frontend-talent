import { Component, OnInit } from '@angular/core';
import { PokemonSearchDTO } from '../../DTO/PokemonSearchDTO';
import { PokemonService } from '../../pokemon.service';

@Component({
  selector: 'app-main-page-pokemon',
  templateUrl: './main-page-pokemon.component.html',
  styleUrls: ['./main-page-pokemon.component.css']
})
export class MainPagePokemonComponent implements OnInit {

  pokemon: PokemonSearchDTO | null = null
  search: string = ''


  constructor(private pokemonService: PokemonService) { }

  ngOnInit(): void {
  }

  searchPokemon() {
    this.pokemonService.searchPokemon(this.search.toLowerCase()).subscribe(
      res => {
        this.pokemon = res
        console.log(this.pokemon)
      },
      error => this.pokemon = null
    )
  }

}
