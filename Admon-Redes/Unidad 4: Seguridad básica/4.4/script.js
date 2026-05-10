function checkAnswer(button, isCorrect) {
    const parent = button.parentElement;
    const buttons = parent.querySelectorAll('button');
    
    // Disable all buttons in this question once an answer is chosen
    buttons.forEach(btn => {
        btn.disabled = true;
        btn.style.cursor = 'not-allowed';
    });

    if (isCorrect) {
        button.classList.add('correct');
        button.innerHTML += ' ✅ ¡Correcto!';
    } else {
        button.classList.add('incorrect');
        button.innerHTML += ' ❌ Incorrecto';
        
        // Find and highlight the correct answer
        buttons.forEach(btn => {
            if (btn.getAttribute('onclick').includes('true')) {
                btn.classList.add('correct');
            }
        });
    }
}
