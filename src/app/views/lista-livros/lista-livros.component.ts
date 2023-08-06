import { Component } from '@angular/core';
import { LivroService } from 'src/app/service/livro.service';

@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css']
})
export class ListaLivrosComponent {

  listaLivros: [];
  campoBusca: string = ''

  // Injetando o service para possibilitar o uso dos recursos e métodos da API 
  constructor(private service: LivroService) { }

  buscarLivros(){
    this.service.buscar(this.campoBusca).subscribe(
      (retornoAPI) => console.log('Teste chamando API ', retornoAPI),
      (error) => console.log('Teste chamando API ', error)
      )
  }
}



