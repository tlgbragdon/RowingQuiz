
$(document).ready(function(){

	/*--- global vars ---*/
	var current_question = 0;
	var pace_score = 0;
	var user_answer = 0;
	var user_score = 0;

	/* Question object */

	var Question = {
		question: "",
		options: [],
		answer: 0,
		explanation: ""
	};

	/*--- build list of questions - there must be a better way to separate data ---*/
	var questionList = new Array();
	
	/* Q1 */
	var q1 = Object.create(Question);	
	q1.question = "Rowing regattas can be of varied course length.  A twisting 3-mile course is known as what kind of race?";
    q1.options = ["Sprint", "Repechage", "Head", "Slalom"];
    q1.answer = 2;
    q1.explanation = "A head race is a long race, often about 3 miles, for time, and is usually held in the fall. Head races have a staggered start with 30 seconds to 1-minute between crews. Sprint races are the traditional spring race where crews run head-to-head.  Sprint distances can be 1,000 - 2,000 meters.  Repechage is a second race for crews that did not make it to the sprint finals.";
	questionList.push(q1);

	/* Q2 */	
	var q2 = Object.create(Question);
	q2.question = "Which is NOT a portion of an oar?";
    q2.options = ["Collar", "Button", "Blade", "Slide"];
    q2.answer = 3;
    q2.explanation = "The collar is the wide ring around the oar where the oar sits in the oarlock.  The button stops the oar from slipping out of the oarlock.  The blade is the of the oar, most often shaped like a hatchet. The slide is the correct answer as that is the seat for the rower.";
	questionList.push(q2);

	/* Q3 */
	var q3 = Object.create(Question);
	q3.question = "What are Pogies?";
    q3.options = ["Mittens used for cold weather rowing", "When a rower makes an error", "The sliding seats rowers sit on", "Ropes used by coxswain to control the rudder"];
    q3.answer = 0;
    q3.explanation = "Pogies are mittens with openings to slide the oar handle through to allow gripping the oar with bare hands in cold weather.";   
	questionList.push(q3);

	/* Q4 */
	var q4 = Object.create(Question);
	q4.question = "Rowing with one oar is called";
    q4.options = ["Rowing", "Sculling", "Stroking", "Sweep"];
    q4.answer = 3;
    q4.explanation = "Sweep rowers use both hands on only one oar.  Sweep boats have either 2, 4, or 8 rowers.  Scullers have two oars and typically are single, double, or quad shells.";
	questionList.push(q4);

	/* Q5 */
	var q5 = Object.create(Question);
	q5.question = "The rower responsible for setting the rate and rhythm of the boat is";
    q5.options = ["Stroke", "Bow", "Starboard", "Head"];
    q5.answer = 0;
    q5.explanation = "The rower in the Stroke seat, who sits in the stern of the boat, sets the rating and rhythm for all other rowers to follow.";   
	questionList.push(q5);


	/* Q6 */
	var q6 = Object.create(Question);
	q6.question = "When a crew wins a race, it it tradition to";
    q6.options = ["Toss the coxswain into the water", "Give their shirts to the losing team", "Have another crew carry their boat in", "Re-row the race course as a 'victory lap'"];
    q6.answer = 0;
    q6.explanation = "Winning crews traditionally toss their coxswain into the water upon docking to celebrate their victory.  Another old tradition is for the losing crew to give their shirts to the winning crew.";   
	questionList.push(q6);

	/* Q7 */
	var q7 = Object.create(Question);
	q7.question = "A crab is";
    q7.options = ["Another term for the coxswain", "An error made that causes the oar to be caught in the water, slowing the boat down", "When the siding seat becomes derailed from it's track", "The part of the stroke when the oar blade enters the water"];
    q7.answer = 1;
    q7.explanation = "A rower can 'catch a crab' when they have failed to cleanly remove the oar blade from the water and the oar blade acts as a brake on the boat. This results in slowing the boat down. A severe crab can even eject a rower out of the shell or, in a small boat, cause the boat to capsize. In a severe crab, the oar handle will knock the rower flat and will end up behind him/her.";   
	questionList.push(q7);

	/* Q8 */
	var q8 = Object.create(Question);
	q8.question = "To feather is";
    q8.options = ["Wear fancy hats during a regatta", "To make an error where the rower begins the drive before the oar is in the water", "When all rowers stop rowing", "To turn the oar blade parallel with the surface of the water"];
    q8.answer = 3;
    q8.explanation = "To feather is turn the oar so that the blade is parallel to the surface of the water.  The blade will be squared when in the water, and feathered when out of the water.";   
	questionList.push(q8);

	/* Q9 */
	var q9 = Object.create(Question);
	q9.question = "'Way-enough' means";
    q9.options = ["Row as hard as you can", "Row lightly", "Stop rowing", "Row backwards"];
    q9.answer = 2;
    q9.explanation = "The command 'Way enough' is to stop whatever the rower is doing, whether it be rowing or walking with the boat. 'Way' is a nautical term for the movement of a boat through water, so the command 'way enough', literally means to enough moving the boat. ";   
	questionList.push(q9);

	/* Q10 */
	var q10 = Object.create(Question);
	q10.question = "Which is not part of the rowing stroke?";
    q10.options = ["Catch", "Drive", "Stretcher", "Finish"];
    q10.answer = 2;
    q10.explanation = "Stretcher is not part of the rowing stroke, but is a movable plate with attached shoes allowing the rower to adjust their position, aka foot stretcher.  The catch is the point at which the blade enters the water. The drive is the duration that the blade is in the water and is the propulsion phase of the stroke.  The finish (aka release) is the point that the oar is released from the water."; 
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
		$('span.qHeader').text("Question " + (qIndex+1) + ":");
		$('h3.question').text(questionList[qIndex].question);
		for (var i=0; i < questionList[qIndex].options.length; i++) {
		    $('ol.choices').append('<li class=' + i + '><p>'+ questionList[qIndex].options[i] + '</p></li>');
		}

	};

	/*--- check user's answer & repond accorindlgy --*/

	function checkAnswer(answer){
		
		/* answer checking & reporting */
		if (answer == questionList[current_question].answer) {
			$('h3.status').text("You're Correct!");
		}
		else {
			$('h3.status').text("You're Answer is Incorrect");
		};

		/* display explanation whether correct or incorrect */
		$('h3.status +p').text(questionList[current_question].explanation);
		
		/* Display answer modal box */
    	$(".overlay.answer").fadeIn(1000);
  	
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
	$('ol.choices').on ('click', 'li', function (event) {
		event.preventDefault();
		console.log ($(this) );
		user_answer = $(this).attr ('class');
		checkAnswer(user_answer);
		
	});		

	
	/*-- listen for completion of answer explanation --*/
	$('a.next').click( function (event) {
		event.preventDefault();
		/* remove previous choices */
		$('ol.choices li').remove();
		/* Hide answer explanation modal box */
  		$(".overlay.answer").fadeOut(1000);
  
		console.log ($(this) );
		/* check if we've reached the end of the questions */
		current_question++;
		if (current_question < questionList.length) {	
			askQuestion(current_question);
		}
		else {
			/* TBD: end game & provide final score */
		};
	});
			

				


});

