$(document).ready(function() {
    const words = [
        { word: 'apple', translation: 'яблуко' },
        { word: 'dog', translation: 'собака' },
        { word: 'fruit', translation: 'фрукт' },
        { word: 'down', translation: 'вниз' },
        { word: 'doctor', translation: 'доктор' },
        { word: 'key', translation: 'ключ' },
        { word: 'time', translation: 'час' },
        { word: 'year', translation: 'рік' },
        { word: 'seven', translation: 'сім' },
        { word: 'last', translation: 'останній' },
        { word: 'night', translation: 'ніч' }
    ];
    let currentStep = 0;
    let correctCount = 0;
    let incorrectCount = 0;
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
    function displayWord() {
        const currentWord = words[currentStep];
        $('#card-container').text(currentWord.word);
        $('#translation-input').val('');
    }
    function updateProgress() {
        $('#word-count').text(currentStep + 1);
        $('#correct-count span').text(correctCount);
        $('#incorrect-count span').text(incorrectCount);
    }
    function updateWordLists() {
        $('#correct-words').empty();
        $('#incorrect-words').empty();
        words.forEach((word, index) => {
            const listItem = $('<div>' + word.word + ' - ' + word.translation + '</div>');
            if (index < currentStep) {
                if (word.isCorrect) {
                    $('#correct-words').append(listItem);
                } else {
                    $('#incorrect-words').append(listItem);
                }
            }
        });
    }
    function showModal() {
        const knowledgeLevel = calculateKnowledgeLevel();
        $('#knowledge-level').text(`Ваш рівень знань: ${knowledgeLevel}`);
        $('#modal').show();
    }
    function calculateKnowledgeLevel() {
        const percentage = (correctCount / words.length) * 100;
        if (percentage === 100) {
            return 'Відмінно! Ви знаєте мову на 100%';
        } else if (percentage >= 70) {
            return 'Добре! Ваші знання мови на високому рівні';
        } else if (percentage >= 50) {
            return 'Задовільно. Продовжуйте вчитися';
        } else {
            return 'Погано. Вам потрібно більше вчитися';
        }
    }
    $('#check-btn').click(function() {
        const currentWord = words[currentStep];
        const userTranslation = $('#translation-input').val().trim().toLowerCase();

        if (userTranslation === currentWord.translation.toLowerCase()) {
            correctCount++;
            currentWord.isCorrect = true;
        } else {
            incorrectCount++;
            currentWord.isCorrect = false;
        }
        currentStep++;
        if (currentStep < words.length) {
            displayWord();
            updateProgress();
        } else {
            showModal();
            currentStep = 0;
            shuffleArray(words); 
        }
        updateWordLists();
    });
    $('#show-results-btn').click(function() {
        showModal();
    });
    $('.close').click(function() {
        $('#modal').hide();
    });
    shuffleArray(words);
    displayWord();
    updateProgress();
});
