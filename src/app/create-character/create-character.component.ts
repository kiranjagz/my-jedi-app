import { Component, OnInit } from '@angular/core';
import { StarWarsService } from '../star-wars.service';
import { ForceCharacter } from './ForceCharacter';

@Component({
  selector: 'app-create-character',
  templateUrl: './create-character.component.html',
  styleUrls: ['./create-character.component.css']
})
export class CreateCharacterComponent implements OnInit {
  availableSides = [
   {display: 'None', value: ''},
   {display: 'Light', value: 'light'},
   {display: 'Dark', value: 'dark'}
  ];
  private swService: StarWarsService;
  forceCharacter: ForceCharacter = new ForceCharacter();

  constructor(swService: StarWarsService) {
    this.swService = swService;
  }

  ngOnInit(): void {
  }

  onSubmit(form){
    if (form.invalid){
      return;
    }

    console.log(form);
    this.forceCharacter.Name = form.value.name;
    this.forceCharacter.Side = form.value.side;
    console.log(this.forceCharacter);

    this.swService.addCharacter(this.forceCharacter);
  }
}
