import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LivrosResultado } from '../models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class LivroService {

  // Conectando com a API Google Books solicitação GET
  // Na UL temos após volumes o parâmetro ?q=search+terms
  private readonly API = 'https://www.googleapis.com/books/v1/volumes';
  
  // Importar os métodos Http do Angular Get, Post, Put...
  constructor(private http: HttpClient) { }

  
  buscar(valorDigitado: string): Observable<LivrosResultado>{
    // Quando o usuário digitar uma informação e clicar na lupa, o valor digitado será o parâmetro
    const params = new HttpParams().append('q', valorDigitado);
    // Chamando a API e passando o parâmetro
    // Tipando a Interface no método get<>()
    return this.http.get<LivrosResultado>(this.API, { params })
  }
}
