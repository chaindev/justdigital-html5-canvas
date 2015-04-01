HTML5 Canvas - From zero to hero

Parte 2:

*Animações*

Para iniciar a linha de raciocínio, devemos nos perguntar:
_O que é uma animação?_

Uma animação é exatamente uma sequência de imagens, que, quando exibidas sequencialmente, formam um determinado movimento.

Utilizando o javascript como recurso, podemos simular um processo de sequência e desenhar (renderizar) o que queremos animar, por exemplo:

    //Declara a variável de contagem
    var c = 0;

    //função que executa o passo (step)
    var step = function(){
      //Aumenta o contador de steps
      c += 1;

      //Desenha o frame
      renderizarFrame(c);
    };

    //Coloca a função step para ser executada a cada 40 milissegundos
    setTimeout(step, 40);

Sim, já vimos essa regra no último tutorial, mas um pouco mais de explicações sobre esse assunto não vai fazer mal à ninguém.
Na nossa função de renderizar frame é onde vai ocorrer a mágica. Baseado no valor da variável *c*, colocaremos um quadrado em uma posição diferente, assim criando o efeito de movimentação:

    // Coloque esse código antes da função step
    // Define qual é a velocidade que o retângulo vai se movimentar
    var velocidade = 1.1;

    var renderizarFrame = function(c){
      // Limpa o canvas, para não desenhar um retângulo em cima do outro e causar o efeito de "borrão". Experimente comentar a linha abaixo caso esteja curioso
      ctx.clearRect(0,0,canvas.width,canvas.height);

      
      //desenha o retângulo, a variável c é usada 
      ctx.fillStyle = '#0000FF'; //a definição de fillStyle poderia ocorrer fora dessa função para melhorar a performance, mas e se tivéssemos dois quadrados, por exemplo?
      ctx.fillRect(c, 50, 100, 80);
    };

    //Altera a função step para utilizar a velocidade
    var step = function(){
      //Quando o browser estiver pronto para desenhar, executa o método step (ele mesmo)
      requestAnimFrame(step);
      
      //Aumenta o contador de steps
      c += velocidade;

      //Desenha o frame
      renderizarFrame(c);
    };

Ok, mas tem algo estranho. Nosso movimento parece estar "travando" em alguns momentos.
Isso ocorre por que quando o navegador usa o método setInterval, ele não se importa se o canvas terminou seu processamento, ele SEMPRE fará de tudo para atualizar a cada 40 milisegundos, custe o que custar. Isso sobrecarrega nosso motor de renderização.

Para solucionar esse problema, os browsers têm métodos para nos dizer quando eles estão prontos para desenhar novamente:

 - requestAnimationFrame //Browsers em suas últimas versões
 - webkitRequestAnimationFrame //Google chrome em versões não tão recentes
 - mozRequestAnimationFrame //Firefox
 - funcão declarada com setTimeout dentro //IEs antigos

Para suprir a necessidade de todos os browsers, vamos encapsular todos esses métodos em um método centralizado (coloque antes da definição de step):
  
    var requestAnimFrame = 
      window.requestAnimationFrame   ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame    ||
      function( callback ){
        //Tenta chamar o método callback 60 vezes por segundo
        window.setTimeout(callback, 1000/60); 
      };

    var step = ...

Agora não precisamos mais do antigo setInterval, mas precisamos iniciar nosso motor chamando o método step pela primeira vez:

    step();
    //Não utilizamos mais setInterval devido a nossa lógica de requestAnimationFrame
    //setInterval(step, 40);

Pronto. Agora temos um modelo funcional de animação suave.

Como transformar isso em um jogo?
O que difere uma animação de um jogo é a interatividade, então, vamos adicionar um pouco (só um pouco) de interatividade no nosso jogo. Colocaremos um acelerador de velocidade: a barra de espaço:
    
// Define a captura de eventos do teclado para usarmos a barra de espaço para aumentar a velocidade em 0.2
    document.onkeydown = function(e){
      //Caso seja barra de espaço
      if (e.keyCode === 32){
        //Aumenta a velocidade
        velocidade += 0.5;

        //retorna false pro browser não fazer o efeito
        return false;
      }
    }

Para facilitar seu teste, defina o valor inicial da variável velocidade para 0.
Agora que o retângulo não move, seria bom adicionar uma mensagem no método de desenho:


    var renderizarFrame = function(c){
      // Limpa o canvas, para não desenhar um retângulo em cima do outro e causar o efeito de "borrão". Experimente comentar a linha abaixo caso esteja curioso
      ctx.clearRect(0,0,canvas.width,canvas.height);

      // define a posição x do retângulo baseando-se no contador e na velocidade:
      var x = c;
      
      //desenha o retângulo
      ctx.fillStyle = '#0000FF'; //a definição de fillStyle poderia ocorrer fora dessa função para melhorar a performance, mas e se tivéssemos dois quadrados, por exemplo?
      ctx.fillRect(x, 50, 100, 80);

      //desenha a frase de ajuda
      ctx.font="20px Verdana";
      ctx.fillStyle="green";
      ctx.fillText("Pressione barra de espaços para acelerar",10,30);

    };

Na próxima parte, vamos melhorar (e muito) nosso sistema de controle (input) e também vamos usar alguns conceitos básicos de física pra dar mais realismo ao jogo.

Fontes:
http://www.cambiaresearch.com/articles/15/javascript-char-codes-key-codes
http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/
https://pt.wikipedia.org/wiki/Animação
