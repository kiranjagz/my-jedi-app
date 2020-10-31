import { Injectable } from '@angular/core';
import { LogService } from './log.service';
import { Injectable } from '@angular/core';

@Injectable()
export class StarWarsService{
  private logService: LogService;

  constructor(logService: LogService){
    this.logService = logService;
  }

  private characters = [
    { name: 'Luke Skywalker', side: ''},
    { name: 'Darth Vader', side: ''}
  ];

  getCharacters(chosenList){
    if (chosenList === 'all'){
      return this.characters.slice();
    }
    return this.characters.filter((char) => {
      return char.side === chosenList;
    })
  }

  onSideChosen(charinfo: { name: string; side: string; }){
    //console.log(charinfo);
    const pos = this.characters.findIndex((char) => {
      return char.name === charinfo.name;
    })
    //console.log(pos);
    this.characters[pos].side = charinfo.side;
    this.logService.writeLog('Changed side of: ' + charinfo.name + ', new side: ' + charinfo.side);
  }
}
