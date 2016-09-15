
	/*** -- Question object --***
		 There is one Question object for each question.
		 - a Question consists of:
		 - the text string of the question
		 - an array of potential answers
		 - the index of the correct answer option
		 - an explanation of the answer
	***/
	var Question = {
		question: "",
		options: [],
		answer: 0,		/* index of correct answer */
		explanation: "",

		/* method returns:
		   true if answer index provided matches the correct answer index
		   or false otherwise */
		correctAnswer: function (answer) {
			return (answer == this.answer);
		},

		/* returns the string of the question */
		getQuestion: function () {
			return this.question;
		},

		/* returns an array of answer options */
		getOptions: function () {
			return this.options;
		},

		/* returns explanation of answer */
		getExplanation: function () {
			return this.explanation;
		}

	};

	/***-- Quiz Game object ***
		Quiz object contains the state of the current game
		- list of questions
		- index of current question
		- index of last question answered by user
		- user's answer (index) for current question
		- user's score so far
	***/

	var Quiz = {
		questionList: [],	  /* array of Question objects */
		current_question: 0,  /* index of current question */
		last_question: 0,	  /* index of last question answered */
		user_answer: 0,
		user_score: 0,	

		/* method adds question data to game */
		addQuestion: function (question, options, answer, explanation) {
			var q = Object.create(Question);	
			q.question = question;
		    q.options = options;
		    q.answer = answer;
		    q.explanation = explanation;
			this.questionList.push(q);
		},

		/* returns current question text & options  */
		getCurrentQuestion: function(question, options) {
			return {quest: this.questionList[this.current_question].getQuestion(),
					options: this.questionList[this.current_question].getOptions() };
		},

		/* returns explanation text of current question */
		getCurrentExplanation: function () {
			return this.questionList[this.current_question].getExplanation();
		},

		/* Saves user_answer and returns true if correct; false if incorrect 
		   Updates user's running score 
		   Tracks last question answered to track multiple attempts to answer same question
		*/
		isCorrectAnswer: function(userAnswer) {
			this.user_answer = userAnswer;
			this.last_question = this.current_question;
			if (this.questionList[this.current_question].correctAnswer(userAnswer)){
				this.user_score++;
				return true;
			}
			else 
				return false;
		},

		/* used to verify that an answer selection is not made again
		   which could happen while one of the modal boxes are waiting for input
		 */
		isNewQuestion: function() {
			return (this.current_question != this.last_question);
		},

		/* reset state for new game */
		resetGame: function() {
			this.last_question = -1;
			this.current_question = 0;
			this.user_score = 0;
			this.user_answer = 0;
		}
	
	};

$(document).ready(function(){

	var quiz = Object.create(Quiz);
	quiz.questionList = [];

	/*--- build list of questions - there must be a better way to separate data ---*/
	
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

	
	/*** --UI type functions-- ***/


	/* advance specified boat along progress bar */
    var startPosition = 100/quiz.questionList.length;  /* distance to increment is based on number of questions */
    var increment = (100-startPosition)/quiz.questionList.length; /* since we are starting at the first increment, adjust how much is moved for each correct answer */
 
	function advanceBoat (boat, count) {
	    var elem = document.getElementById(boat);
        var width = startPosition +(increment*count);  
        elem.style.width = width + '%';
	};

	function newGame () {
	
		quiz.resetGame();		
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
		presentQuestion();
	};


	/* present question to user */
	function presentQuestion (){
			var q = {quest:"", options: []}
			q = quiz.getCurrentQuestion();

			$('span.qHeader').text("Question " + (quiz.current_question + 1) + ":");
			$('h3.question').text(q.quest);
			for (var i=0; i < q.options.length; i++) {
			    $('ol.choices').append('<li class=' + i + '><p>'+ q.options[i] + '</p></li>');
			};
	};

	/*--- check user's answer & repond accordingly --*/
 	function processUserAnswer(answer) {
	
		/* prevent user from answering same question repeatedly */
		if (quiz.isNewQuestion()) {
			if (quiz.isCorrectAnswer(answer)) {
				$('h3.status').text("You're Correct!");
				/* advance boat in progess bar */
				advanceBoat ('user-boat', quiz.user_score);
			}
			else {
				$('h3.status').text("You're Answer is Incorrect");
			};

			/* advance pace boat in progress bar */
			advanceBoat ('pace-boat', quiz.current_question + 1); 

			/* display explanation whether correct or incorrect */
			$('h3.status +p').text(quiz.getCurrentExplanation());
			
			/* Display answer modal box */
	    	$(".overlay.answer").fadeIn(1000);
	    };
	};


	function reportFinalResults() {
		var questionCount = quiz.questionList.length;
		if (quiz.user_score == questionCount) {
			$('span.qHeader').text("Congratulations!");
			$('h3.question').text("You won the gold medal for "+ quiz.user_score + " out of " + questionCount + "!");
		}
		else if (quiz.user_score > (questionCount*.6)) {
			$('span.qHeader').text("Great Race!");
			$('h3.question').text("You came so close to winning, you won "+ quiz.user_score + " out of " + questionCount + ". Try again!");
		}
		else if (quiz.user_score > (questionCount*.4) ) {
			$('span.qHeader').text("Good Start!");
			$('h3.question').text("You're doing great for a beginner, you got "+ quiz.user_score + " out of " + questionCount + ".  Keep up the good work!");
		} 
		else {
			$('span.qHeader').text("Good Try!");
			$('h3.question').text(quiz.user_score + " correct out of " + questionCount + ". Keep Practicing!");
		}
	};


	newGame();

	
	/*** Event handlers  ***/

	/* Display help modal box */
  	$(".help").click(function(){
  		event.preventDefault();
  		/* hide any other modals that may be present */
  		/*$(".gameOver").fadeOut(400);
  		$(".overlay.answer").fadeOut(400);
  		*/
  		console.log ('help button clicked');
    	$(".overlay.help").fadeIn(1000);
  	});

  	/* Hide help modal box */
  	$("a.close").click(function(){
  		event.preventDefault();
  		event.stopPropagation();
  		console.log ('help screen closed');
  		$(".overlay.help").fadeOut(1000);
  	});

  	
  	/* start new game button */
  	$(".start").click(function(){
  		event.preventDefault();
  		console.log ('new game button clicked');
  		newGame();
  	});


  	/* Hide gameOver modal box */
  	$("a.closeGameOver").click(function(){
  		event.preventDefault();
  		console.log ('game over screen closed');
  		$(".gameOver").fadeOut(1000);
  	});

	/* listen for answer response */
	$('ol.choices').on ('click', 'li', function (event) {
		event.preventDefault();
		console.log ('answer selected');
		console.log ($(this) );
		processUserAnswer($(this).attr ('class'));		
	});		

	
	/*** Listen for completion of answer explanation 
		 Can then get the next question 
		 or report final score if no questions remain
	***/
	$('a.next').click( function (event) {
		event.preventDefault();
		console.log ('answer explanation screen closed');

		/* remove previous choices */
		$('ol.choices li').remove();
		/* Hide answer explanation modal box */
  		$(".overlay.answer").fadeOut(1000);
  
		/* check if we've reached the end of the questions 
			and either present next question to user or
			report final score
		*/
		quiz.current_question++;
		if (quiz.current_question < quiz.questionList.length) {	
			presentQuestion();
		}
		else {
			/* all questions answered, report final results */
			reportFinalResults();
		};
	});
				
});

