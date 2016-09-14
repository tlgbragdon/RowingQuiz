
$(document).ready(function(){


	/*-- Question object --*/
	var Question = {
		question: "",
		options: [],
		answer: 0,
		explanation: "",

		/* method returns true if userAnswer matches answer or false otherwise */
		correctAnswer: function (userAnswer) {
			return (userAnswer == this.answer);
		}
	};

	/*-- Quiz Game object --*/
	var Quiz = {
		questionList: [],
		last_question: 0,
		current_question: 1,
		user_answer: 0,
		user_score: 0,	

		/* method adds question to game */
		addQuestion: function (question, options, answer, explanation) {
			var q = Object.create(Question);	
			q.question = question;
		    q.options = options;
		    q.answer = answer;
		    q.explanation = explanation;
			this.questionList.push(q);
		},

		/*--- present next question to user ---*/
		askQuestion: function () {
			$('span.qHeader').text("Question " + (this.current_question) + ":");
			$('h3.question').text(this.questionList[this.current_question-1].question);
			for (var i=0; i < this.questionList[this.current_question-1].options.length; i++) {
			    $('ol.choices').append('<li class=' + i + '><p>'+ this.questionList[this.current_question-1].options[i] + '</p></li>');
			}
		},

		/*--- check user's answer & repond accorindlgy --*/
	 	checkAnswer: function (answer){
		
			/* prevent user from answering same question repeatedly */
			if (this.current_question == this.last_question)
				return;

			this.last_question = this.current_question;
			/* answer checking & reporting */
			if (this.questionList[this.current_question-1].correctAnswer(answer)) {
				$('h3.status').text("You're Correct!");
				this.user_score++;
				/* advance boat in progess bar */
				advanceBoat ('user-boat', this.user_score);
			}
			else {
				$('h3.status').text("You're Answer is Incorrect");
			};

			/* advance pace boat in progress bar */
			advanceBoat ('pace-boat', this.current_question); 

			/* display explanation whether correct or incorrect */
			$('h3.status +p').text(this.questionList[this.current_question-1].explanation);
			
			/* Display answer modal box */
	    	$(".overlay.answer").fadeIn(1000);
		},


		/*-- reset for new game --*/
		newGame: function() {
			this.last_question = 0;
			this.current_question = 1;
			this.user_score = 0;
			this.user_answer = 0;
			var elem = document.getElementById("user-boat");
			elem.style.width = '10%';
			elem = document.getElementById("pace-boat");
			elem.style.width = '10%';

			/* remove any existing data */
			$('ol.choices li').remove();

			/* hide any modals */
			$(".gameOver").fadeOut(500);
			$(".overlay.answer").fadeOut(500);


			/*--- need to begin game by asking the first question --*/	
			this.askQuestion(this.current_question);
		},

		reportFinalResults: function () {
			if (this.user_score == 10) {
				$('span.qHeader').text("Congratulations!");
				$('h3.question').text("You won the gold medal for "+ this.user_score + " out of 10!");
			}
			else if (this.user_score > 6) {
				$('span.qHeader').text("Great Race!");
				$('h3.question').text("You came so close to winning, you won "+ this.user_score + " out of 10. Try again!");
			}
			else if (this.user_score > 4 ) {
				$('span.qHeader').text("Good Start!");
				$('h3.question').text("You're doing great for a beginner, you got "+ this.user_score + " out of 10.  Keep up the good work!");
			} 
			else {
				$('span.qHeader').text("Good Try");
				$('h3.question').text(this.user_score + " correct out of 10. Keep Practicing!");
			}
		}
	
	};


	var quiz = Object.create(Quiz);
	quiz.questionList = [];

	/*--- build list of questions - there must be a better way to separate data ---*/
	/**var questionList = new Array();**/
	
	/* Q1 */
	quiz.addQuestion(
		"Rowing regattas can be of varied course length.  A twisting three-mile long course is known as what kind of race?",
        ["Sprint", "Repechage", "Head", "Slalom"],
		2,
    	"A head race is a long race, often about 3 miles, for time, and is usually held in the fall. Head races have a staggered start with 15 to 30 second intervals between crews. Sprint races are the traditional spring race where crews run head-to-head.  Sprint distances can be 1,000 - 2,000 meters.  Repechage is a second race for crews that did not make it to the sprint finals."
    );

	/* Q2 */	
	quiz.addQuestion(
		"Which is NOT a portion of an oar?",
    	["Collar", "Button", "Blade", "Slide"],
    	3,
    	"The collar is the wide ring around the oar where the oar sits in the oarlock.  The button stops the oar from slipping out of the oarlock.  The blade is the end of the oar, most often shaped like a hatchet. The slide is the only component listed that is not part of the oar.  The slide is the moving seat for the rower."
	);

	/* Q3 */
	quiz.addQuestion(
		"What are Pogies?",
    	["Mittens used for cold weather rowing", "When a rower makes an error", "The sliding seats rowers sit on", "Ropes used by coxswain to control the rudder"],
    	0,
    	"Pogies are mittens with openings to slide the oar handle through to allow gripping the oar with bare hands in cold weather."
    );

	/* Q4 */
	quiz.addQuestion(
		"Rowing with one oar is called",
    	["Rowing", "Sculling", "Stroking", "Sweep"],
    	3,
    	"Sweep rowers use both hands on only one oar.  Sweep boats have either 2, 4, or 8 rowers.  Scullers have two oars and typically are single, double, or quad shells."
	);

	/* Q5 */
	quiz.addQuestion( 
		"The rower responsible for setting the rate and rhythm of the boat is",
    	["Stroke", "Bow", "Starboard", "Head"],
    	0,
    	"The rower in the Stroke seat, who sits in the stern of the boat, sets the rating and rhythm for all other rowers to follow."
    );

	/* Q6 */
	quiz.addQuestion(
		"When a crew wins a race, it it tradition to",
    	["Toss the coxswain into the water", "Give their shirts to the losing team", "Have another crew carry their boat in", "Re-row the race course as a 'victory lap'"],
		0,
		"Winning crews traditionally toss their coxswain into the water upon docking to celebrate their victory.  Another old tradition is for the losing crew to give their shirts to the winning crew."
	);

	/* Q7 */
	quiz.addQuestion(
		"A crab is",
    	["Another term for the coxswain", "An error made that causes the oar to be caught in the water, slowing the boat down", "When the siding seat becomes derailed from it's track", "The part of the stroke when the oar blade enters the water"],
    	1,
    	"A rower can 'catch a crab' when they have failed to cleanly remove the oar blade from the water and the oar blade acts as a brake on the boat. This results in slowing the boat down. A severe crab can even eject a rower out of the shell or, in a small boat, cause the boat to capsize. In a severe crab, the oar handle will knock the rower flat and will end up behind him/her."
	);

	/* Q8 */
	quiz.addQuestion(
		"To feather is",
    	["Wear fancy hats during a regatta", "To make an error where the rower begins the drive before the oar is in the water", "When all rowers stop rowing", "To turn the oar blade parallel with the surface of the water"],
    	3,
   		"To feather is turn the oar so that the blade is parallel to the surface of the water.  The blade will be squared when in the water, and feathered when out of the water."
	);

	/* Q9 */
	quiz.addQuestion(
		"'Way-enough' means",
    	["Row as hard as you can", "Row lightly", "Stop rowing", "Row backwards"],
    	2,
    	"The command 'Way enough' is to stop whatever the rower is doing, whether it be rowing or walking with the boat. 'Way' is a nautical term for the movement of a boat through water."
	);

	/* Q10 */
	quiz.addQuestion(
		"Which is not part of the rowing stroke?",
    	["Catch", "Drive", "Stretcher", "Finish"],
    	2,
    	"Stretcher is not part of the rowing stroke, but is a movable plate with attached shoes allowing the rower to adjust their position, aka foot stretcher.  The catch is the point at which the blade enters the water. The drive is the duration that the blade is in the water and is the propulsion phase of the stroke.  The finish (aka release) is the point that the oar is released from the water."
	);	
	
	
	/* Display help modal box */
  	$(".help").click(function(){
  		/* hide any other modals that may be present */
  		$(".gameOver").fadeOut(400);
  		$(".overlay.answer").fadeOut(400);
    	$(".overlay.help").fadeIn(1000);
  	});

  	/* Hide help modal box */
  	$("a.close").click(function(){
  		event.preventDefault();
		event.stopPropagation();
  		$(".overlay").fadeOut(1000);
  	});

  	
  	/* start new game */
  	$(".start").click(function(){
  		event.preventDefault();
		event.stopPropagation();
  		quiz.newGame();
  	});


  	/* Hide gameOver modal box */
  	$("a.closeGameOver").click(function(){
  		event.preventDefault();
		event.stopPropagation();
  		$(".gameOver").fadeOut(1000);
  	});


	/* advances specified boat along progress bar */
	function advanceBoat (boat, count) {
	    var elem = document.getElementById(boat);
	    var width = 10;
        width = 10+(9*count);  /* 10 questions, but we will start at 10%, so move 9% for each correct answer */
	    elem.style.width = width + '%';
	};

 
	quiz.newGame();

	
	/*-- listen for answer response --*/
	$('ol.choices').on ('click', 'li', function (event) {
		event.preventDefault();
		event.stopPropagation();
		console.log ($(this) );
		quiz.user_answer = $(this).attr ('class');
		quiz.checkAnswer(quiz.user_answer);
		
	});		

	
	/*-- listen for completion of answer explanation --*/
	$('a.next').click( function (event) {
		event.preventDefault();
		event.stopPropagation();

		/* remove previous choices */
		$('ol.choices li').remove();
		/* Hide answer explanation modal box */
  		$(".overlay.answer").fadeOut(1000);
  
		console.log ($(this) );
		/* check if we've reached the end of the questions */
		quiz.current_question++;
		if (quiz.current_question <= quiz.questionList.length) {	
			quiz.askQuestion(quiz.current_question);
		}
		else {
			/* all questions answered, report final results */
			quiz.reportFinalResults();
		};
	});
				
});

