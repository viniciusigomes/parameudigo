        let simSize = 1;
        const btnNao = document.getElementById('btnNao');
        const toggleImage = document.getElementById('toggleImage');
        const backgroundMusic = document.getElementById('backgroundMusic');
        const playPauseBtn = document.getElementById('playPauseBtn');

        const gifUrl = 'img/gatinhos.gif';
        const photoUrl = 'img/nós.jpeg';
        let showingGif = true;

        function aumentarSim(increment = 0.2) {
            simSize += increment;
            const simBtn = document.querySelector('.sim');
            simBtn.style.transform = `scale(${simSize})`;
            simBtn.style.fontSize = `${1.2 + simSize * 0.1}em`;

            if (simSize >= 2.2) {
                btnNao.style.transform = `translateX(-${simSize * 18}px)`;
            } else {
                btnNao.style.transform = `translateX(-${simSize * 20}px)`;
            }

            if (simSize > 2.8) {
                btnNao.style.display = 'none';
                simBtn.style.position = 'absolute';
                simBtn.style.zIndex = '1000';
            }
        }

        function tentarNao() {
            aumentarSim(0.2);
        }

        function clicarSim() {
            aumentarSim(0.1);
            aceitar();
            // Iniciar música
            if (backgroundMusic) {
                backgroundMusic.volume = 0.3;
                backgroundMusic.play().catch(e => console.log('Erro ao tocar música:', e));
                // Update button to pause
                if (playPauseBtn) {
                    playPauseBtn.innerHTML = '<img src="img/pause.png" alt="Pause">';
                }
            }
        }

        function aceitar() {
            // Cria corações flutuantes
            for (let i = 0; i < 20; i++) {
                setTimeout(() => {
                    criarCoracao();
                }, i * 100);
            }

            document.querySelector('.container').style.display = 'none';
            document.getElementById('successScreen').style.display = 'block';
            
            // Reset do botão sim
            const simBtn = document.querySelector('.sim');
            simBtn.style.transform = 'scale(1)';
            simBtn.style.fontSize = '1.2em';
        }

        function criarCoracao() {
            const heart = document.createElement('div');
            heart.innerHTML = '💖';
            heart.className = 'heart';
            heart.style.left = Math.random() * 100 + 'vw';
            document.body.appendChild(heart);
            
            setTimeout(() => {
                heart.remove();
            }, 5000);
        }

        function trocarImagem() {
            if (!toggleImage) return;

            toggleImage.classList.add('image-switch');
            setTimeout(() => {
                if (showingGif) {
                    toggleImage.src = photoUrl;
                    toggleImage.alt = 'foto especial';
                    toggleImage.title = 'Clique para voltar ao GIF';
                } else {
                    toggleImage.src = gifUrl;
                    toggleImage.alt = 'Gatinho dançando';
                    toggleImage.title = 'Clique para ver a foto';
                }
                showingGif = !showingGif;
                toggleImage.classList.remove('image-switch');
            }, 200);
        }

        if (toggleImage) {
            toggleImage.addEventListener('click', trocarImagem);
        }

        // Music player controls
        function togglePlayPause() {
            if (backgroundMusic.paused) {
                backgroundMusic.play().catch(e => console.log('Erro ao tocar música:', e));
                playPauseBtn.innerHTML = '<img src="img/pause.png" alt="Pause">';
            } else {
                backgroundMusic.pause();
                playPauseBtn.innerHTML = '<img src="img/play.png" alt="Play">';
            }
        }

        if (playPauseBtn) {
            playPauseBtn.addEventListener('click', togglePlayPause);
        }

 
