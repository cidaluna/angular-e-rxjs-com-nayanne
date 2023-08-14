import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, filter, map, switchMap, tap } from 'rxjs';
import { Item } from 'src/app/models/interfaces';
import { LivroVolumeInfo } from 'src/app/models/livroVolumeInfo';
import { LivroService } from 'src/app/service/livro.service';

const PAUSA = 300;
@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css']
})
export class ListaLivrosComponent{

  campoBusca = new FormControl();

  // Injetando o service para possibilitar o uso dos recursos e métodos da API 
  constructor(private service: LivroService) { }

  livrosEncontrados$ = this.campoBusca.valueChanges   // retorna um Observable
  .pipe(
    debounceTime(PAUSA),
    filter((valorDigitado) => valorDigitado.length >= 3),
    tap(() => console.log("Fluxo inicial")),
    switchMap((valorDigitado) => 
      this.service.buscar(valorDigitado)
    ),
    tap(() => console.log("Requisição ao servidor")),
    map((items) => this.livrosResultadoParaLivros(items))
  ) 

  // https://angular.io/guide/http-request-data-from-server#requesting-a-typed-response
  // Converter o objeto json para o tipo de dado necessário, podendo acessar as propriedades definidas na interface
  // Exemplo:
  //  .subscribe(data => this.config = {
  //  heroesUrl: (data as any).heroesUrl,
  //  textfile:  (data as any).textfile,
  //  });

  livrosResultadoParaLivros(items: Item[]): LivroVolumeInfo[] {
    // refatorado, criado a classe livroVolumeInfo
    return items.map(item => {
      return new LivroVolumeInfo(item)
    })
  }

}



