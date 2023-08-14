import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { Item, LivrosResultado } from '../models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class LivroService {

  // Conectando com a API Google Books solicitação GET
  // Na UL temos após volumes o parâmetro ?q=search+terms
  private readonly API = 'https://www.googleapis.com/books/v1/volumes';
  
  // Importar os métodos Http do Angular Get, Post, Put...
  constructor(private http: HttpClient) { }

  
  buscar(valorDigitado: string): Observable<Item[]>{
    // Quando o usuário digitar uma informação e clicar na lupa, o valor digitado será o parâmetro
    const params = new HttpParams().append('q', valorDigitado);
    // Chamando a API e passando o parâmetro
    // Tipando a Interface no método get<>()
    // Utilizando pipe para manipular as informações recebidas, como uma forma de canalizar os dados
    // O tap não modifca os dados, serve apenas para visualizá-los
    // O map sim, manipula o dado e traz o array de items definido na interface
    return this.http.get<LivrosResultado>(this.API, { 
      params }).pipe(
        //tap(retornoDadosAPI => console.log('Fluxo do tap: ', retornoDadosAPI)),
        map(resultado => resultado.items),
        //tap(resultado => console.log('Fluxo após o map: ', resultado))
      )
  }
}
