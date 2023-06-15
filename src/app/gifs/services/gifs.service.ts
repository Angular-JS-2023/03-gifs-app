import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class GifsService {

  private _tagsHistory: string[] = [];

  constructor() { }

  get tagsHistory() {
    // Quitar la referencia del arreglo principal
    return [...this._tagsHistory];
  }

  private organizeHistory(tag: string) {
    tag = tag.toLowerCase();

    if (this._tagsHistory.includes(tag)) {
      this._tagsHistory = this._tagsHistory.filter((oldTag) => oldTag !== tag);
    }

    this._tagsHistory.unshift(tag); // insertar al inicio
    this._tagsHistory = this._tagsHistory.splice(0, 10); // Mantener 10 elementos en arreglo
  }

  searchTag(tag: string): void {
    if (tag.trim().length === 0) return;
    this.organizeHistory(tag);
  }
  
}