let calcular = document.querySelector('#calcular');
      let limpar = document.querySelector('#limpar');
      let configurar = document.querySelector('.config');
      let salvarUm = document.querySelector('#salvarUm');
      let salvarDois = document.querySelector('#salvarDois');
      let voltarUm = document.querySelector('#voltarUm');
      let voltarDois = document.querySelector('#voltarDois');
      let fechar = document.querySelector('#fechar');
      let modalUm = document.querySelector('.dialogUm');
      let modalDois = document.querySelector('.dialogDois');
      let modalTres = document.querySelector('.dialogTres');
      let modalPoly = document.querySelector('.poly');
      let modalEspu = document.querySelector('.espu');
      let select = document.getElementById('tamanho');
      let res = document.querySelector('#res');
      let polyester = document.getElementById('polyester');
      let espumada = document.getElementById('espumada');
      let option = select.options[select.selectedIndex];
      let pesoBobina = document.getElementById('peso');
      let polyMenorVaziaLocal = window.localStorage.getItem('polyMenorVazia');
      let polyMenorCheiaLocal = window.localStorage.getItem('polyMenorCheia');
      let polyMaiorVaziaLocal = window.localStorage.getItem('polyMaiorVazia');
      let polyMaiorCheiaLocal = window.localStorage.getItem('polyMaiorCheia');
      let espuVaziaLocal = window.localStorage.getItem('espuVazia');
      let espuCheiaLocal = window.localStorage.getItem('espuCheia');
      let polyMenorVazia = document.querySelector('#polyMenorVazia');
      let polyMenorCheia = document.querySelector('#polyMenorCheia');
      let polyMaiorVazia = document.querySelector('#polyMaiorVazia');
      let polyMaiorCheia = document.querySelector('#polyMaiorCheia');
      let espuVazia = document.querySelector('#espuVazia');
      let espuCheia = document.querySelector('#espuCheia');
      let pesoFita = (polyMenorCheiaLocal - polyMenorVaziaLocal);

      polyMenorVazia.value = polyMenorVaziaLocal;
      polyMenorCheia.value = polyMenorCheiaLocal;
      polyMaiorVazia.value = polyMaiorVaziaLocal;
      polyMaiorCheia.value = polyMaiorCheiaLocal;
      espuVazia.value = espuVaziaLocal;
      espuCheia.value = espuCheiaLocal;
  
      //Desabilitar a opção "300mm" caso a opção "Espumada" esteja marcada
      document.onchange = function() {
        if (espumada.checked) {
          document.getElementById('bobinaMenor').disabled = true;
          select.value = 400;
        } else {
          document.getElementById('bobinaMenor').disabled = false;
        }
      }

      //Botões
      calcular.onclick = function() {
          let pesoBobina = document.getElementById('peso');
          let valorLinear = (pesoBobina.value - polyMenorVaziaLocal) / ((polyMaiorCheiaLocal - polyMenorVaziaLocal) / 50);
          let valorQuadrado = (pesoBobina.value - polyMenorVaziaLocal) / ((polyMaiorCheiaLocal - polyMenorVaziaLocal) / 15);
          let valorLinearDois = (pesoBobina.value - polyMaiorVaziaLocal) / ((polyMaiorCheiaLocal - polyMaiorVaziaLocal) / 50);
          let valorQuadradoDois = (pesoBobina.value - polyMaiorVaziaLocal) / ((polyMaiorCheiaLocal - polyMaiorVaziaLocal) / 20);
          let valorLinearTres = (pesoBobina.value - espuVaziaLocal) / ((espuCheiaLocal - espuVaziaLocal) / 50);
          let valorQuadradoTres = (pesoBobina.value - espuVaziaLocal) / ((espuCheiaLocal - espuVaziaLocal) / 20);

          if (pesoBobina.value == "") {
              alert("Preencha todos os campos.");
          } else if (pesoBobina.value > 0) {
                if (select.value == 300 && polyester.checked) {
                    res.value = valorQuadrado.toFixed(3) + " Metros quadrados\n" + valorLinear.toFixed(3) + " Metros linear";
                } else if (select.value == 400 && polyester.checked) {
                    res.value = valorQuadradoDois.toFixed(3) + " Metros quadrados\n" + valorLinearDois.toFixed(3) + " Metros linear";
                } else if (espumada.checked && select.value == 400) {
                    res.value = valorQuadradoTres.toFixed(3) + " Metros quadrados\n" + valorLinearTres.toFixed(3) + " Metros linear";
                } else if (espumada.checked && select.value == 300) {
                    res.value = "Esta informação ainda não está disponível."
                } else { 
                    res.value = "";
                    alert("Escolha um tamanho de fita."); 
                }   
          } else {
              alert("O valor deve ser POSITIVO.");
          }

          valorMinimo();
      }

      limpar.onclick = function() {
          select.value = "";
          res.value = "";
          pesoBobina.value = "";
          optionCheck.length;
          optionCheck[0].checked = true;
      }

      configurar.onclick = function() {
          modalUm.showModal();
      }

      modalPoly.onclick = function() {
          modalDois.showModal();
      }

      modalEspu.onclick = function() {
          modalTres.showModal();
      }

      fechar.onclick = function() {
          modalUm.close();
      }

      salvarUm.onclick = function() {
                  
          if (polyMenorVazia.value == "" || polyMenorCheia.value == "" || polyMaiorVazia.value == "" || polyMaiorCheia.value == "") {
              alert("Preencha todos os campos.");
          } else {
              window.localStorage.setItem("polyMenorVazia", polyMenorVazia.value);
              window.localStorage.setItem("polyMenorCheia", polyMenorCheia.value);
              window.localStorage.setItem("polyMaiorVazia", polyMaiorVazia.value);
              window.localStorage.setItem("polyMaiorCheia", polyMaiorCheia.value);
          }
      }

      salvarDois.onclick = function() {
                  
          if (espuVazia.value == "" || espuCheia.value == "") {
              alert("Preencha todos os campos.");
          } else {
              window.localStorage.setItem("espuVazia", espuVazia.value);
              window.localStorage.setItem("espuCheia", espuCheia.value);
          }
      }

      voltarUm.onclick = function() {
          modalDois.close();
      }

      voltarDois.onclick = function() {
          modalTres.close();
      }

      //Número mínimo
      alerta = function() {
            res.value = "O peso não pode ser menor que o valor da bobina vazia.";
      }

      valorMinimo = function() {
        if (select.value == 300 && polyester.checked) {
            if (pesoBobina.value < polyMenorVaziaLocal) {
                alerta();
            }
        } else if (select.value == 400 && polyester.checked) {
            if (pesoBobina.value < polyMaiorVaziaLocal) {
                alerta();
            }
        } else {
            if (pesoBobina.value < espuVaziaLocal) {
                alerta();
            }
        }
      }