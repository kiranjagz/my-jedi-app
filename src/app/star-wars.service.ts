import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { LogService } from './log.service';

@Injectable()
export class StarWarsService{
  private characters = [
    { name: 'Luke Skywalker', side: ''},
    { name: 'Darth Vader', side: ''}
  ];
  private logService: LogService;
  charactersChanged = new Subject<void>();

  constructor(logService: LogService){
    this.logService = logService;
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
