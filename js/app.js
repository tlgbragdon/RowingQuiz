
$(document).ready(function(){

	/*--- global vars ---*/
	/**
	var last_question = 0;
	var current_question = 1;
	var user_answer = 0;
	var user_score = 0
	**/

	/* Question object */

	var Question = {
		question: "",
		options: [],
		answer: 0,
		explanation: ""
	};

	var Quiz = {
		questionList: [],
		last_question: 0,
		current_question: 1,
		user_answer: 0,
		user_score: 0,

		/* advance specified boat along progress bar */
		advanceBoat: function (boat, count) {
		    var elem = document.getElementById(boat);
		    var width = 10;
	        width = 10+(9*count);  /* 10 questions, but we will start at 10%, so move 9% for each correct answer */
		    elem.style.width = width + '%';
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
			if (answer == this.questionList[this.current_question-1].answer) {
				$('h3.status').text("You're Correct!");
				this.user_score++;
				/* advance boat in progess bar */
				this.advanceBoat ('user-boat', this.user_score);
			}
			else {
				$('h3.status').text("You're Answer is Incorrect");
			};

			/* advance pace boat in progress bar */
			this.advanceBoat ('pace-boat', this.current_question); 

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
			elem.style.width = '9%';
			elem = document.getElementById("pace-boat");
			elem.style.width = '9%';

			/* TBD - need to remove any existing data */

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
	var q = Object.create(Question);	
	q.question = "Rowing regattas can be of varied course length.  A twisting three-mile long course is known as what kind of race?";
    q.options = ["Sprint", "Repechage", "Head", "Slalom"];
    q.answer = 2;
    q.explanation = "A head race is a long race, often about 3 miles, for time, and is usually held in the fall. Head races have a staggered start with 15 to 30 second intervals between crews. Sprint races are the traditional spring race where crews run head-to-head.  Sprint distances can be 1,000 - 2,000 meters.  Repechage is a second race for crews that did not make it to the sprint finals.";
	quiz.questionList.push(q);

	/* Q2 */	
	q = Object.create(Question);
	q.question = "Which is NOT a portion of an oar?";
    q.options = ["Collar", "Button", "Blade", "Slide"];
    q.answer = 3;
    q.explanation = "The collar is the wide ring around the oar where the oar sits in the oarlock.  The button stops the oar from slipping out of the oarlock.  The blade is the end of the oar, most often shaped like a hatchet. The slide is the only component listed that is not part of the oar.  The slide is the moving seat for the rower.";
	quiz.questionList.push(q);

	/* Q3 */
	q = Object.create(Question);
	q.question = "What are Pogies?";
    q.options = ["Mittens used for cold weather rowing", "When a rower makes an error", "The sliding seats rowers sit on", "Ropes used by coxswain to control the rudder"];
    q.answer = 0;
    q.explanation = "Pogies are mittens with openings to slide the oar handle through to allow gripping the oar with bare hands in cold weather.";   
	quiz.questionList.push(q);

	/* Q4 */
	q = Object.create(Question);
	q.question = "Rowing with one oar is called";
    q.options = ["Rowing", "Sculling", "Stroking", "Sweep"];
    q.answer = 3;
    q.explanation = "Sweep rowers use both hands on only one oar.  Sweep boats have either 2, 4, or 8 rowers.  Scullers have two oars and typically are single, double, or quad shells.";
	quiz.questionList.push(q);

	/* Q5 */
	q = Object.create(Question);
	q.question = "The rower responsible for setting the rate and rhythm of the boat is";
    q.options = ["Stroke", "Bow", "Starboard", "Head"];
    q.answer = 0;
    q.explanation = "The rower in the Stroke seat, who sits in the stern of the boat, sets the rating and rhythm for all other rowers to follow.";   
	quiz.questionList.push(q);

	/* Q6 */
	var q1 = Object.create(Question);
	q1.question = "When a crew wins a race, it it tradition to";
    q1.options = ["Toss the coxswain into the water", "Give their shirts to the losing team", "Have another crew carry their boat in", "Re-row the race course as a 'victory lap'"];
    q1.answer = 0;
    q1.explanation = "Winning crews traditionally toss their coxswain into the water upon docking to celebrate their victory.  Another old tradition is for the losing crew to give their shirts to the winning crew.";   
	quiz.questionList.push(q1);

	/* Q7 */
	q = Object.create(Question);
	q.question = "A crab is";
    q.options = ["Another term for the coxswain", "An error made that causes the oar to be caught in the water, slowing the boat down", "When the siding seat becomes derailed from it's track", "The part of the stroke when the oar blade enters the water"];
    q.answer = 1;
    q.explanation = "A rower can 'catch a crab' when they have failed to cleanly remove the oar blade from the water and the oar blade acts as a brake on the boat. This results in slowing the boat down. A severe crab can even eject a rower out of the shell or, in a small boat, cause the boat to capsize. In a severe crab, the oar handle will knock the rower flat and will end up behind him/her.";   
	quiz.questionList.push(q);

	/* Q8 */
	q = Object.create(Question);
	q.question = "To feather is";
    q.options = ["Wear fancy hats during a regatta", "To make an error where the rower begins the drive before the oar is in the water", "When all rowers stop rowing", "To turn the oar blade parallel with the surface of the water"];
    q.answer = 3;
    q.explanation = "To feather is turn the oar so that the blade is parallel to the surface of the water.  The blade will be squared when in the water, and feathered when out of the water.";   
	quiz.questionList.push(q);

	/* Q9 */
	q = Object.create(Question);
	q.question = "'Way-enough' means";
    q.options = ["Row as hard as you can", "Row lightly", "Stop rowing", "Row backwards"];
    q.answer = 2;
    q.explanation = "The command 'Way enough' is to stop whatever the rower is doing, whether it be rowing or walking with the boat. 'Way' is a nautical term for the movement of a boat through water.";   
	quiz.questionList.push(q);

	/* Q10 */
	q = Object.create(Question);
	q.question = "Which is not part of the rowing stroke?";
    q.options = ["Catch", "Drive", "Stretcher", "Finish"];
    q.answer = 2;
    q.explanation = "Stretcher is not part of the rowing stroke, but is a movable plate with attached shoes allowing the rower to adjust their position, aka foot stretcher.  The catch is the point at which the blade enters the water. The drive is the duration that the blade is in the water and is the propulsion phase of the stroke.  The finish (aka release) is the point that the oar is released from the water."; 
	quiz.questionList.push(q);	
	
	/* save modal stuff for possible re-use later... */	
	
	/* Display information modal box */
  	$(".help").click(function(){
    	$(".overlay").fadeIn(1000);
  	});

  	/* Hide information modal box */
  	$("a.close").click(function(){
  		$(".overlay").fadeOut(1000);
  	});

  	
  	/* start new game */
  	$(".start").click(function(){
  		newGame();
  	});


  	/* Hide gameOver modal box */
  	$("a.closeGameOver").click(function(){
  		$(".gameOver").fadeOut(1000);
  	});

 

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

