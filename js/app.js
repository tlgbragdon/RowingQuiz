
$(document).ready(function(){

	/*--- global vars ---*/
	var current_question = 0;
	var pace_score = 0;
	var user_answer = 0;
	var user_score = 0;

	/* Question object */

	var Question = {
		question : "",
		options: [],
		answer: 0
	};

	/*--- build list of questions - there must be a better way to separate data ---*/
	var questionList = new Array();
	
	/* Q1 */
	var q1 = Object.create(Question);	
	q1.question = "Rowing regattas can be of varied course length.  A 3-mile twisting course is known as what kind of race?";
    q1.options = ["Sprint", "Repechage", "Head", "Slalom"];
    q1.answer = 2;
	questionList.push(q1);

	/* Q2 */	
	var q2 = Object.create(Question);
	q2.question = "Which is NOT a portion of an oar?";
    q2.options = ["Collar", "Button", "Blade", "Slide"];
    q2.answer = 3;
	questionList.push(q2);

	/* Q3 */
	var q3 = Object.create(Question);
	q3.question = "What are Pogies?";
    q3.options = ["Mittens used for cold weather rowing", "When a rower makes an error", "The sliding seats rowers sit on", "Ropes used by coxswain to control the rudder"];
    q3.answer = 0;
	questionList.push(q3);

	/* Q4 */
	var q4 = Object.create(Question);
	q4.question = "Rowing with one oar is called";
    q4.options = ["Rowing", "Sculling", "Stroking", "Sweep"];
    q4.answer = 3;
	questionList.push(q4);

	/* Q5 */
	var q5 = Object.create(Question);
	q5.question = "The rower responsible for setting the rate and rythm of the boat is";
    q5.options = ["Stroke", "Bow", "Starboard", "Head"];
    q5.answer = 0;
	questionList.push(q5);


	/* Q6 */
	var q6 = Object.create(Question);
	q6.question = "When a crew wins a race, it it tradition to";
    q6.options = ["Toss the coxswain into the water", "Give their shirts to the losing team", "Have another crew carry their boat in", "Re-row the race course as a 'victory lap'"];
    q6.answer = 0;
	questionList.push(q6);

	/* Q7 */
	var q7 = Object.create(Question);
	q7.question = "A crab is";
    q7.options = ["another term for the coxswain", "An ereror made that causes the oar to be caught in the water, slowing the boat down", "When the siding seat becomes derailed from it's track", "The part of the stroke when the oar blade enters the water"];
    q7.answer = 1;
	questionList.push(q7);

	/* Q8 */
	var q8 = Object.create(Question);
	q8.question = "To feather is";
    q8.options = ["wear fancy hats during a regatta", "to make an error where the rower begins the drive before the oar is in the water", "when all rowers stop rowing", "to turn the oar blade parallel with the surface of the water"];
    q8.answer = 3;
	questionList.push(q8);

	/* Q9 */
	var q9 = Object.create(Question);
	q9.question = "'Way-enough' means";
    q9.options = ["row as hard as you can", "row lightly", "stop rowing", "row backwards"];
    q9.answer = 2;
	questionList.push(q9);

	/* Q10 */
	var q10 = Object.create(Question);
	q10.question = "Which is not part of the rowing stroke?";
    q10.options = ["Catch", "Drive", "Stretcher", "Finish"];
    q10.answer = 2;
	questionList.push(q10);	
	
	/* save modal stuff for possible re-use later... */	
	
	/* Display information modal box */
  	$(".help").click(function(){
    	$(".overlay").fadeIn(1000);
  	});

  	/* Hide information modal box */
  	$("a.close").click(function(){
  		$(".overlay").fadeOut(1000);
  	});

  	
  	/* Hide gameOver modal box */
  	$("a.closeGameOver").click(function(){
  		$(".gameOver").fadeOut(1000);
  	});


  	/*--- present next question to user ---*/
	
	function askQuestion (qIndex) {
		$('h2.question').text("Question " + (qIndex+1));
		$('h3').text(questionList[qIndex].question);
		for (var i=0; i < questionList[qIndex].options.length; i++) {
		    $('ol.options').append('<li class=' + i + '>'+ questionList[qIndex].options[i] + '</li>');
		}

	};

	/*--- check user's answer & repond accorindlgy --*/

	function checkAnswer(answer){
		
		/* answer checking & reporting TBD */

		if (current_question < questionList.length()) {	
			current_question++;
			askQuestion(current_question);
		}
		else {
			/* end game & provide final score */
		};
	};
	

	/*-- reset globals for new game --*/
	function newGame() {
		current_question = 0;
		user_score = 0;
		user_answer = 0;
		pace_score = 0;
	};
	
	
	/*--- need to begin by asking the first question --*/
	askQuestion(0);

	/*-- listen for answer response --*/
	$('ol.options').on ('click', 'li', function (event) {
		event.preventDefault();
		console.log ($(this) )
		user_answer = $(this).attr ('class');
		checkAnswer(user_answer);
	});		

	
	/*-- listen for completion of answer explanation --*/
	$()
			


});

