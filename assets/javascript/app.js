window.onload = function() {

  $('#quizCard').hide();
  $('#score').hide();
  $('#submit').hide();
  $('#play').show();

  $('#play').on("click", function () {
    $('#quizCard').show();
    $('#score').show();
    $('#submit').show();
    $('#play').hide();
    timer.start();

  })

    var intervalId;
    var clockRunning = false;
    var timer = {
      time: 3600,

      reset: function () {
        timer.time = 3600;
      },

      start: function() {
        if (!clockRunning) {
          intervalId = setInterval(timer.count, 10)
        }
      },

      stop: function() {
        clearInterval(intervalId);
      },

      count: function() {
        timer.time--;

        displayTime = timer.timeConvert(timer.time);
        $('#timer').html(displayTime);

        if (timer.time === 00) {
          timer.stop();
          timer.reset();
          $('#timer').html("Too Slow! Play Again.")
          $('#play').show();
          $('#quizCard').hide();
          $('#submit').hide();
        }
      },

      timeConvert: function(t) {
        var seconds = Math.floor(t/60);
        var fracSeconds = t - (seconds * 60);
          if (fracSeconds < 10) {
            fracSeconds = "0" + fracSeconds;
          }

          if (seconds === 0) {
            seconds = "00";
          }

          return seconds + ":" + fracSeconds;
      }
    }

    var question;
    var correctAnswer = 0;
    var incorrectAnswer = 0;
    var score;
    var quiz = {

        characters: [
            {
                name: "Arya Stark",
                fate: 1
            },

            {
                name: "Daenerys Targaryen",
                fate: 1
            },

            {
                name: "Jon Snow",
                fate: 0
            },

            {
                name: "Sansa Stark",
                fate: 0

            },

            {
                name: "Brandon Stark",
                fate: 0
            },

            {
                name: "Cersei Lannister",
                fate: 0
            },

            {
                name: "Jamie Lannister",
                fate: 1
            },

            {
                name: "Tyrion Lannister",
                fate: 0
            },

            {
                name: "Petyr Baelish",
                fate: 0
            },

            {
                name: "The Hound",
                fate: 1
            }
        ],

        populateQ: function() {
            for (var i = 0; i < quiz.characters.length; i++) {
                question = quiz.characters[i].name + " dies this season."
                // console.log("Question #" + [i + 1] + ": " + question);
                $('#quizCard').append("<div><b>" + [i + 1] + ". " + question + "</b></div><ul><input class='answer' type='radio' name='q" + [i + 1] + "' value='1'><label class='trueString'>True</label></ul><ul><input class='answer' type='radio' name='q" + [i + 1] + "' value='0'><label class='falseString'>False</label></ul>");

            }

        },

        scoreQ: function() {
            for (var j = 0; j < quiz.characters.length; j++) {
              var input = $('.answer').val();
                if (quiz.characters[j].fate == input ) {
                    correctAnswer++;

                } else {
                    incorrectAnswer++;

                }
            }

        },


    }

    quiz.populateQ(question);
    $('#submit').on("click", function() {
    quiz.scoreQ();
    timer.stop();
    timer.reset();


    console.log("There are " + correctAnswer + " correct answers.")
    console.log("There are " + incorrectAnswer + " incorrect answers.")
    $('#score').html("You answered " + correctAnswer + "/" + quiz.characters.length + " questions correctly. I won't spoil it for you!")

    });

};