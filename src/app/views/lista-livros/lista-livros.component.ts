import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Livro } from 'src/app/models/interfaces';
import { LivroService } from 'src/app/service/livro.service';

@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css']
})
export class ListaLivrosComponent implements OnDestroy{

  listaLivros: Livro[];
  campoBusca: string = ''
  subscription: Subscription;  // para tornar possível o desinscrever 
  livro: Livro;

  // Injetando o service para possibilitar o uso dos recursos e métodos da API 
  constructor(private service: LivroService) { }

  buscarLivros(){
    this.subscription = this.service.buscar(this.campoBusca).subscribe(
      // forma depreciada
      // (retornoAPI) => console.log('Teste chamando API ', retornoAPI),
      // (error) => console.log('Teste chamando API ', error)
      {
        // a notificação next pode ser emitida várias vezes (traz os dados)
        //next: retornoAPI => console.log('Teste chamando a API: ', retornoAPI),
        next: (items) =>{
          this.listaLivros = this.livrosResultadoParaLivros(items)
        },
        // a notificação error e complete só permite ser emitida apenas uma vez
        error: erro => console.log('Ocorreu o erro: ', erro)
        //complete: () => console.log('Observable completado!!')
      }
      )
  }

  // https://angular.io/guide/http-request-data-from-server#requesting-a-typed-response
  // Converter o objeto json para o tipo de dado necessário, podendo acessar as propriedades definidas na interface
  // Exemplo:
  //  .subscribe(data => this.config = {
  //  heroesUrl: (data as any).heroesUrl,
  //  textfile:  (data as any).textfile,
  //  });

  livrosResultadoParaLivros(items): Livro[] {
    // definir uma lista de livros e adicionar(push) cada livro na lista
    const livros: Livro[] = []

    // passar por cada livro e atribuir as propriedades
    items.forEach(item => {
      livros.push(this.livro = {
                title: item.volumeInfo?.title,
                authors: item.volumeInfo?.authors,
                publisher: item.volumeInfo?.publisher,
                publishedDate: item.volumeInfo?.publishedDate,
                description: item.volumeInfo?.description,
                previewLink: item.volumeInfo?.previewLink,
                thumbnail: item.volumeInfo?.imageLinks?.thumbnail
              })
    })
    return livros
  }

  ngOnDestroy(){
    // nao recebe argumentos, ele irá apenas encerrar o observable
    this.subscription.unsubscribe()
  }

}



