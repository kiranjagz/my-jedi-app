import { Component, OnInit } from '@angular/core';
import { StarWarsService } from '../star-wars.service';

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
    this.swService.addCharacter(form.value.name, form.value.side);
  }
}
