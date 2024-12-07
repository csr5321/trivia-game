window.onload = function() {
    const QUIZ_TIME = 60; // 60 seconds for quiz
    
    const $quizCard = $('#quizCard');
    const $score = $('#score');
    const $submit = $('#submit');
    const $play = $('#play');
    const $timer = $('#timer');

    // Initial state
    $quizCard.hide();
    $score.hide();
    $submit.hide();
    $play.show();

    // Timer implementation
    const timer = {
        time: QUIZ_TIME,
        intervalId: null,
        isRunning: false,

        reset() {
            this.time = QUIZ_TIME;
            this.isRunning = false;
            if (this.intervalId) {
                clearInterval(this.intervalId);
            }
        },

        start() {
            if (!this.isRunning) {
                this.isRunning = true;
                this.intervalId = setInterval(() => this.count(), 1000);
            }
        },

        stop() {
            this.isRunning = false;
            clearInterval(this.intervalId);
        },

        count() {
            this.time--;
            const displayTime = this.timeConvert(this.time);
            $timer.html(displayTime);

            if (this.time <= 0) {
                this.stop();
                this.reset();
                $timer.html("Time's Up! Play Again.");
                endGame();
            }
        },

        timeConvert(seconds) {
            const mins = Math.floor(seconds / 60);
            const secs = seconds % 60;
            return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
        }
    };

    const quiz = {
        characters: [
            { name: "Arya Stark", fate: 1 },
            { name: "Daenerys Targaryen", fate: 1 },
            { name: "Jon Snow", fate: 0 },
            { name: "Sansa Stark", fate: 0 },
            { name: "Brandon Stark", fate: 0 },
            { name: "Cersei Lannister", fate: 0 },
            { name: "Jamie Lannister", fate: 1 },
            { name: "Tyrion Lannister", fate: 0 },
            { name: "Petyr Baelish", fate: 0 },
            { name: "The Hound", fate: 1 }
        ],

        populateQuestions() {
    $quizCard.empty();
    
    this.characters.forEach((character, index) => {
        const questionHtml = `
            <div class="question">
                <p class="mb-2"><strong>${index + 1}. ${character.name} dies this season.</strong></p>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="q${index}" value="1" id="q${index}true">
                    <label class="form-check-label" for="q${index}true">
                        True
                    </label>
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="radio" name="q${index}" value="0" id="q${index}false">
                    <label class="form-check-label" for="q${index}false">
                        False
                    </label>
                </div>
            </div>
        `;
        $quizCard.append(questionHtml);
    });
},

        calculateScore() {
            let correct = 0;
            
            this.characters.forEach((character, index) => {
                const selected = $(`input[name="q${index}"]:checked`).val();
                if (selected === character.fate.toString()) {
                    correct++;
                }
            });
            
            return correct;
        }
    };

    // Update show/hide methods to use Bootstrap classes
    function startGame() {
        quiz.populateQuestions();
        $quizCard.removeClass('d-none');
        $score.removeClass('d-none');
        $submit.removeClass('d-none');
        $play.addClass('d-none');
        timer.reset();
        timer.start();
    }

    function endGame() {
        $play.removeClass('d-none');
        $quizCard.addClass('d-none');
        $submit.addClass('d-none');
        timer.stop();
    }

    // Event Listeners
    $play.on('click', startGame);

    $submit.on('click', function() {
        const correct = quiz.calculateScore();
        const total = quiz.characters.length;
        $score.html(`You answered ${correct}/${total} questions correctly. No spoilers.`);
        endGame();
    });
};