import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainPagePokemonComponent } from './main-page-pokemon.component';

describe('MainPagePokemonComponent', () => {
  let component: MainPagePokemonComponent;
  let fixture: ComponentFixture<MainPagePokemonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainPagePokemonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainPagePokemonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
