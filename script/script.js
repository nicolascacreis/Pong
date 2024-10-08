const canvas = document.getElementById('pongCanvas');
    const ctx = canvas.getContext('2d');

    canvas.width = 600;
    canvas.height = 400;

    // Config
    let ballSpeed = 2;
    const ballSpeedIncrease = 0.02; // 1% DE VELOCIDADE INICIAL
    let ballX = canvas.width / 2;
    let ballY = canvas.height / 2;
    let ballDeltaX = ballSpeed;
    let ballDeltaY = ballSpeed;
    const paddleWidth = 10;
    const paddleHeight = 100;
    let leftPaddleY = canvas.height / 2 - paddleHeight / 2;
    let rightPaddleY = canvas.height / 2 - paddleHeight / 2;
    const paddleSpeed = 2;
    let scorePlayer = 0;
    let scoreAI = 0;

    // Controle do paddle 
    document.addEventListener('mousemove', (event) => {
        leftPaddleY = event.clientY - paddleHeight / 2 - canvas.getBoundingClientRect().top;
    });

    // Bola voltar a o meio
    function resetBall() {
        ballSpeed = 2;
        ballX = canvas.width / 2;
        ballY = canvas.height / 2;
        ballDeltaX = -ballDeltaX;
        ballDeltaY = ballSpeed;
    }

    // Loop do pong
    function gameLoop() {
        // Movimento da bola
        ballX += ballDeltaX;
        ballY += ballDeltaY;

        // IA movimento do paddle
        rightPaddleY += (ballY - (rightPaddleY + paddleHeight / 2)) * 0.1;

        // Colisão da bola
        if (ballY <= 0 || ballY >= canvas.height) {
            ballDeltaY = -ballDeltaY;
        }

        // Colisão da bola com os paddles
        if (ballX <= paddleWidth && ballY > leftPaddleY && ballY < leftPaddleY + paddleHeight ||
            ballX >= canvas.width - paddleWidth && ballY > rightPaddleY && ballY < rightPaddleY + paddleHeight) {
            ballDeltaX = -ballDeltaX;
            ballSpeed *= 1 + ballSpeedIncrease; // Increase speed by 1%
            ballDeltaX = (ballDeltaX < 0 ? -1 : 1) * ballSpeed;
            ballDeltaY = (ballDeltaY < 0 ? -1 : 1) * ballSpeed;
        }

        // Pontuação
        if (ballX < 0) {
            scoreAI++;
            resetBall();
        } else if (ballX > canvas.width) {
            scorePlayer++;
            resetBall();
        }

        // Formato/tamanho dos objetos
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'white';
        ctx.fillRect(0, leftPaddleY, paddleWidth, paddleHeight);
        ctx.fillRect(canvas.width - paddleWidth, rightPaddleY, paddleWidth, paddleHeight);
        ctx.beginPath();
        ctx.arc(ballX, ballY, 10, 0, Math.PI*2);
        ctx.fill();

        // Pontuação
        ctx.font = "20px Arial";
        ctx.fillText(`Player: ${scorePlayer} | AI: ${scoreAI}`, 10, 20);

        requestAnimationFrame(gameLoop);
    }

    gameLoop();