import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPagePokemonComponent } from './pages/main-page-pokemon/main-page-pokemon.component';
import { CoreModule } from 'src/app/core/core.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    MainPagePokemonComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    FormsModule
  ],
  exports: [MainPagePokemonComponent]
})
export class PokemonModule { }
