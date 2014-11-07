HTML5 Canvas - Aprendendo o básico.

Olá, meu nome é Lucas Chain e sou desenvolvedor na Just Digital.

Os arquivos referentes a esse tutorial estão localizados no GitHub do projeto --LINK GITHUB--

O elemento Canvas no HTML5 funciona exatamente como uma tela de pintura: Um quadro onde você pode desenhar.

Para começar, crie um arquivo HTML e insira o seguinte código:
    CSS
    body{
      background-color: black;
    }
    #quadro{
      margin: 50px auto 0 auto;
      width: 640px;
      height: 480px;
    }

    HTML
    <canvas width="640" height="480" id="quadro"></canvas>

Até agora só temos um quadro branco em um fundo preto. O próximo passo é extrair o _contexto_ do nosso quadro para começar a desenhar.

O contexto gerencia tudo o que é colocado no quadro, portanto, sempre que formos desenhar 2d, precisaremos de um contexto 2d.

Para obter o contexto de um canvas, utilize a função createContext('2d'):

    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');

Antes de desenhar com o contexto, é preciso definir um estilo para ser utilizado, depois, utilizar o método de desenho, por exemplo:

1) Criar retângulo azul com o contexto:
    //Define o estilo do contexto (cor azul)
    ctx.fillStye = '#0000FF';

    /*
      Desenha um retângulo no canvas com as seguintes propriedades:
      posição x (lateral): 30
      posição y (vertical de cima para baixo): 50
      largura: 100
      altura: 80
    */
    ctx.fillRect(30, 50, 100, 80);

2) Criar um círculo com cor gradiente linear
    /*
      Define um gradiente linear com as seguintes propriedades:
      x inicial: 0
      y inicial: 0
      x final: 50
      y final: 60
    */
    var grd = ctx.createLinearGradient(0,0,50,60);
    
    //Define as cores do gradiente (do vermelho em 0% ao azul em 100%)
    grd.addColorStop(0, "red");
    grd.addColorStop(1, "blue");

    //Definindo o estilo do contexto com o gradiente que acabamos e criar
    ctx.fillStyle = grd;
    
    //Para criar o círculo, devemos fazer um PATH (caminho), o caminho vai fazer um arco de 360 graus para que seja preenchido depois.
    
    //Inicia o caminho com o contexto:
    ctx.beginPath();

    /*
      O caminho percorre um arco de 0 até 360 graus. O centro do arco fica na posição 100,75(x,y)
    */
    ctx.arc(100,75,50,0,2*Math.PI);

    // Preenchemos o circulo (com o estilo de gradiente préviamente definido)
    ctx.fill();

O conceito é o mesmo para animações, a diferença é que a animação será feita dentro de um laço que será repetido várias vezes num curto intervalo de tempo, como no exemplo:

3) Criar um círculo animado:
    
    //Criamos esse objeto que representa um círculo que será animado
    var circulo = {
      x: 0,
      y: 40,
      desenhar: function(ctx, canvas){
        //Limpa o canvas das posições 0 até o seu limite (largura e altura)
        ctx.clearRect(0,0,canvas.width,canvas.height);

        ctx.beginPath();
        ctx.arc(this.x, this.y, 30, 0, 2 * Math.PI);
        ctx.fill();
      }
      mover: function(){
        this.x += 10;
      }
    };

    setInterval(function(){
      circulo.mover();
      circulo.desenhar();
    }, 20);
