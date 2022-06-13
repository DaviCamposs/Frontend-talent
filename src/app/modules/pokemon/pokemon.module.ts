import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPagePokemonComponent } from './pages/main-page-pokemon/main-page-pokemon.component';



@NgModule({
  declarations: [
    MainPagePokemonComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [MainPagePokemonComponent]
})
export class PokemonModule { }
