import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Gif, SearchResponse } from '../interfaces/gifs.interface';

@Injectable({providedIn: 'root'})
export class GifsService {

  public gifList: Gif[] = [];

  private apiKey: string = 'ePlFW7Den6PN1B80z60l4jbYu66DzBYw';
  private serviceUrl: string = 'https://api.giphy.com/v1/gifs';

  private _tagsHistory: string[] = [];

  constructor(
    private http: HttpClient
  ) { }

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

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q', tag);


    this.http.get<SearchResponse>(`${this.serviceUrl}/search`, { params }).subscribe(rta => {
     this.gifList = rta.data;    
    });

  }

  // async getResponse(): Promise<void> {
  //   // #1 forma
  //   // fetch('https://api.giphy.com/v1/gifs/search?api_key=ePlFW7Den6PN1B80z60l4jbYu66DzBYw&q=valorant&limit=10')
  //   // .then( resp => resp.json())
  //   // .then( data => console.log(data));

  //   // #2 forma
  //   // const resp = await fetch('https://api.giphy.com/v1/gifs/search?api_key=ePlFW7Den6PN1B80z60l4jbYu66DzBYw&q=valorant&limit=10')
  //   // const data = await resp.json();    
  // }
  
}