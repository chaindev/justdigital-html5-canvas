// O código aqui foi escrito com finalidades didáticas, por isso, não se apegue a arquitetura e nem às nomenclaturas

//Declara o canvas e o contexto
var canvas = document.getElementById('quadro');
var ctx = canvas.getContext('2d');


//Declara a variável de contagem
var c = 0;
// define qual é a velocidade que o retângulo vai se movimentar
var velocidade = 0;

//função que desenha o quadrado se movimentando
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

//Para suprir a necessidade de todos os browsers, vamos encapsular todos os métodos de requestAnimationFrame em um só luga
var requestAnimFrame = 
    window.requestAnimationFrame   ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame    ||
    function( callback ){
      //Tenta chamar o método callback 60 vezes por segundo
      window.setTimeout(callback, 1000/60); 
    };

//função que executa o passo (step)
var step = function(){
  //Quando o browser estiver pronto para desenhar, executa o método step (ele mesmo)
  requestAnimFrame(step);
  
  //Aumenta o contador de steps
  c += velocidade;

  //Desenha o frame
  renderizarFrame(c);
};

step();

// Não utilizamos mais setInterval devido a nossa lógica de requestAnimationFrame
// setInterval(step, 40);

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
//Acima, eu podería ter colocado a função renderizarFrame direto dentro do método setTimeout, porém, quero ilustrar que a maioria (ou todos) os motores de animação separam a lógica de step (onde ocorre a contagem dos frames ou qualquer outra lógica relacionada a tempo e contagem) fica separada da camada de renderização (no nosso caso é a função renderizarFrame)
