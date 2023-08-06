import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { LivroService } from 'src/app/service/livro.service';

@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css']
})
export class ListaLivrosComponent implements OnDestroy{

  listaLivros: [];
  campoBusca: string = ''
  subscription: Subscription;  // para tornar possível o desinscrever 
  // Injetando o service para possibilitar o uso dos recursos e métodos da API 
  constructor(private service: LivroService) { }

  buscarLivros(){
    this.subscription = this.service.buscar(this.campoBusca).subscribe(
      // forma depreciada
      // (retornoAPI) => console.log('Teste chamando API ', retornoAPI),
      // (error) => console.log('Teste chamando API ', error)
      {
        // a notificação next pode ser emitida várias vezes (traz os dados)
        next: retornoAPI => console.log('Teste chamando a API: ', retornoAPI),
        // a notificação error e complete só permite ser emitida apenas uma vez
        error: erro => console.log('Ocorreu o erro: ', erro), 
        complete: () => console.log('Observable completado!!')
      }
      )
  }

  ngOnDestroy(){
    // nao recebe argumentos, ele irá apenas encerrar o observable
    this.subscription.unsubscribe()
  }

}



