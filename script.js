        //Botão CALCULAR
        function calcular() {
            let pesoBobina = document.getElementById('peso');
            let select = document.getElementById('tamanho');
            let res = document.querySelector('#res');
            let polyester = document.getElementById('polyester');
            let espumada = document.getElementById('espumada');
            let option = select.options[select.selectedIndex];
            let bobinaVazia300 = window.localStorage.getItem('bobinaVazia');

            let valorLinear = (pesoBobina.value - bobinaVazia300) / 0.07384;
            let valorQuadrado = (pesoBobina.value - 1.472) / 0.246128;
            let valorLinearDois = (pesoBobina.value - 1.984) / 0.09868;
            let valorQuadradoDois = (pesoBobina.value - 1.984) / 0.2467;
            
            if (pesoBobina.value == "") {
                    alert("Preencha todos os campos.");
            } else if (pesoBobina.value > 0) {
                if (option.value == 300 && polyester.checked) {
                    res.value = valorQuadrado.toFixed(3) + " Metros quadrados\n" + valorLinear.toFixed(3) + " Metros linear";
                } else if (option.value == 400 && polyester.checked) {
                    res.value = valorQuadradoDois.toFixed(3) + " Metros quadrados\n" + valorLinearDois.toFixed(3) + " Metros linear";;
                } else if (espumada.checked) {
                    res.value = "Sinto muito, este dado ainda não está disponível.";
                } else {
                    res.value = "";
                    alert("Escolha um tamanho de fita."); 
                }
            } else {
                alert("O valor deve ser POSITIVO.");
            }
        }

        //Botão RESETAR
        function resetar() {
            let select = document.getElementById('tamanho');
            let res = document.getElementById('res');
            let pesoBobina = document.getElementById('peso');
            let option = select.options[select.selectedIndex];
            let optionCheck = document.getElementsByName("tipoFita");

            select.value = "";
            res.value = "";
            pesoBobina.value = "";
            optionCheck.length;
            optionCheck[0].checked = true;
        }

        //Botão Salvar
        function salvar() {
            let bobinaVazia = document.querySelector('.bobinaVazia').value;
            let bobinaCheia = document.querySelector('.bobinaCheia').value;
            window.localStorage.setItem("bobinaVazia", bobinaVazia);
            window.localStorage.setItem("bobinaCheia", bobinaCheia);

            let bobinaVaziaLocal = window.localStorage.getItem('bobinaVazia');
            let bobinaCheiaLocal = window.localStorage.getItem('bobinaCheia');
            
            if (bobinaVaziaLocal == null || bobinaCheiaLocal == null || bobinaVaziaLocal == "" || bobinaCheiaLocal == "") {
                alert("Preencha todos os campos.");
            }
        }

        function fechar() {
            let config = document.querySelector('.caixaConfig');
            let botaoConfig = document.querySelector('.config');
            let caixa = document.querySelector('.caixa');
            let body = document.querySelector('body');

            config.style.cssText = 
            'scale: 0;';
            botaoConfig.style.cssText = 
            'scale: 1;';
            caixa.style.cssText = 
            'opacity: 1;';
            body.style.cssText = 
            'background-image: linear-gradient(to right, #3039b7, #636475);';
        }

        function configurar() {
            let config = document.querySelector('.caixaConfig');
            let botaoConfig = document.querySelector('.config');
            let caixa = document.querySelector('.caixa');

            botaoConfig.style.cssText = 
            'scale: 0;';
            config.style.cssText = 
            'scale: 1;';
            caixa.style.cssText = 
            'opacity: .2;';


            setTimeout(function(){ 
                let body = document.querySelector('body');

                body.style.cssText = 
                'background-image: linear-gradient(to right, #25284e, #000000);';
        }, 300);
        }

        //Carregar os inputs do modal já com o valor salvo no LocalStorage
        setTimeout(function(){ 
            let nome = window.localStorage.getItem('nome');
            let idade = window.localStorage.getItem('idade');
            let bobinaVazia = document.querySelector('.bobinaVazia');
            let bobinaCheia = document.querySelector('.bobinaCheia');

            bobinaVazia.value = bobinaVaziaLocal;
            bobinaCheia.value = bobinaCheiaLocal;
        }, 500);


        //Permitir um valor mínimo
        numeroMinimo(document.querySelector("#peso"));

        function numeroMinimo(input)
        {
            input.addEventListener('input', handler);
            input.addEventListener('blur', handler);

            let running = false;

            function handler() {
                let bobinaVazia = window.localStorage.getItem('bobinaVazia');

                if (running) return;
        
                running = true;

                let max = parseFloat(bobinaVazia);
                
                if (parseFloat(this.value) < max) this.value = max;
                
                running = false;
            };
        }