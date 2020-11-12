import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { LogService } from './log.service';
import { map } from 'rxjs/operators';
import {Observable} from "rxjs";

@Injectable()
export class StarWarsService{
  private characters = [
    { name: 'Luke Skywalker', side: ''},
    { name: 'Darth Vader', side: ''}
  ];
  private logService: LogService;
  charactersChanged = new Subject<void>();
  http: HttpClient;

  constructor(logService: LogService, http: HttpClient){
    this.logService = logService;
    this.http = http;
  }

  fetchCharacters(){
    this.http.get('https://swapi.dev/api/people/')
    .pipe(map(res =>
      {
        const data = JSON.parse(JSON.stringify(res));
        const names = data.results;
        const chars = names.map((char: { name: any; }) => {
          return {name: char.name, side: ''}
        });
        console.log(data);
        console.log(names);
        console.log(chars);
        return chars;
      }))
    .subscribe(result => {
      console.log(result);
      this.characters = result;
      this.charactersChanged.next();
    });
  }

  getCharacters(chosenList){
    if (chosenList === 'all'){
      return this.characters.slice();
    }
    return this.characters.filter((char) => {
      return char.side === chosenList;
    })
  }

  onSideChosen(charinfo: { name: string; side: string; }){
    const pos = this.characters.findIndex((char) => {
      return char.name === charinfo.name;
    })
    this.characters[pos].side = charinfo.side;
    this.charactersChanged.next();
    this.logService.writeLog('Changed side of: ' + charinfo.name + ', new side: ' + charinfo.side);
  }

  addCharacter(name: string, side: string){
    const pos = this.characters.findIndex((char) => {
      return char.name === name;
    })
    if (pos !== -1){
      return;
    }

    const newChar = { name: name, side: side};
    this.characters.push(newChar);
  }
}
