// Global Variables
var obj;
var right = 0;
var wrong = 0;
var none = 0;
var question = 1;

// Trivia Object
var trivia = {
  Q1: {
    q: "Question 1: In the year 1900 in the U.S. what were the most popular first names given to boy and girl babies?",
    a1: "William and Elizabeth",
    a2: "Joseph and Catherine",
    a3: "John and Mary",
    a4: "George and Anne",
    ca: "John and Mary",
    used: false,
  },
  Q2: {
    q: "Question 2: What is the name of world´s strongest beer?",
    a1: "Samuel Adams Utopias",
    a2: "Brewmeister's Snake Venom",
    a3: "Bourbon Abominable Winter Ale",
    a4: "Rye Double DBA",
    ca: "Brewmeister's Snake Venom",
    used: false,
  },
  Q3: {
    q: "Question 3: When did the Liberty Bell get its name?",
    a1: "when it was made, in 1701",
    a2: "when it rang on July 4, 1776",
    a3: "in the 19th century, when it became a symbol of the abolition of slavery",
    a4: "none of the above",
    ca: "in the 19th century, when it became a symbol of the abolition of slavery",
    used: false,
  },
  Q4: {
    q: "Question 4:In J. Edgar Hoover, what did the J stand for?",
    a1: "James",
    a2: "John",
    a3: "Joseph",
    a4: "none of the above",
    ca: "John",
    used: false,
  },
  Q5: {
    q: "Question 5:Florence Nightingale became known as 'the Lady With the Lamp' during which war?",
    a1: "Civil",
    a2: "Crimean",
    a3: "WWI",
    a4: "WWII",
    ca: "Crimean",
    used: false,
  },
  Q6: {
    q: "Question 6:When Mt. St. Helens erupted on May 18, 1980, how many people were killed?",
    a1: "23",
    a2: "57",
    a3: "876",
    a4: "193",
    ca: "57",
    used: false,
  },
  Q7: {
    q: "Question 7:What year was it that the Census Bureau first reported that a majority of new mothers  were remaining in the new job market?",
    a1: "1968",
    a2: "1978",
    a3: "1988",
    a4: "2013",
    ca: "1988",
    used: false,
  },
  Q8: {
    q: "Question 8:Before becoming George Bush's Secretary of Defense, what was Dick Cheney's position?",
    a1: "congressman from Wyoming",
    a2: "president of Haliburton",
    a3: "CEO of Evilcorp",
    a4: "Ambassador to Canada",
    ca: "congressman from Wyoming",
    used: false,
  },
  
}

// Timer Object
var timer = {
  num: 20,
  counter: 0,
  run: function(){
    $("#timer").html("<h3> Time Remaining: " + timer.num + " seconds</h3>");
    timer.counter = setInterval(timer.decrement, 1000);
  },
  decrement: function(){ 
    timer.num--;
    $("#timer").html("<h3> Time Remaining: " + timer.num + " seconds</h3>");
    if(timer.num === 0){
      timer.stop();
      timer.reset();
      game.answer(obj);
    }
  },
  delay: function(time){
    $("#timer").show();
    setTimeout(timer.nextGame, time);
  },
  stop: function(){
    clearInterval(timer.counter);
  },
  reset: function(){
    timer.num = 20;
  },
  nextGame: function(){
    if(question <= 13){
      game.load();
    }
    else{
      game.loadResult();
    }
  },
}

// Game Object
var game = {
  load: function(){
    //start the timer
    timer.run();

    $("#restart").hide();
    $("#result").hide();
    $("#panel").show();
    $("#timer").show();
    // call function to select the question
    var obj = game.selectQuestion();

    // increment question for next
    question++;

    // load question
    $("#question").html("<h2>" + obj.q + "</h2>");
    // clear answers
    $("#answer").empty();
    // clear results
    $("#result").empty();
    // load answers   
    for(i in obj){
      if(i[0] === "a"){
        var divTag = $("<div>");
        divTag.addClass("btn btn-warning btn-lg");
        divTag.attr("data-answer", i);
        divTag.on({"click": function() {
          // stop/reset the timer
          timer.stop();
          timer.reset();
          var selected = $(this).data("answer");
          if(obj[selected] === obj.ca){
            console.log("Correct");   
            game.right(obj);   
          }
          else{
            console.log("Incorrect");
            game.wrong(obj);
          }
          }
        });
        divTag.text(obj[i]);
        $("#answer").append(divTag);
        $("#answer").append("<br/>");
      }
    }
  },
  selectQuestion: function(){
    for(i in trivia){
    console.log(trivia[i].used);  
      if(!trivia[i].used){
        obj = trivia[i];
        trivia[i].used = true;
        return obj;
      }
    }
  },
  right: function(obj){
    right++;
    $("#result").html("<h3 style='color: blue;'>You have selected the correct answer: " + obj.ca + "</h3><p>You will be redirected to next question in 10 seconds.</p>");
    $("#result").show();
    $("#panel").hide();
    timer.delay(10000);
  },
  wrong: function(obj){
    wrong++;
    $("#result").html("<h3 style='color: red;'>You have selected a wrong answer. Correct answer was: " + obj.ca + "</h3><p>You will be redirected to next question in 10 seconds.</p>");
    $("#result").show();
    $("#panel").hide();
    timer.delay(10000);
  },
  answer: function(obj){
    none++;
    $("#result").html("<h3 style='color: green;''>Time is up. Correct Answer was: " + obj.ca + "</h3><p>You will be redirected to next question in 10 seconds.</p>");
    $("#result").show();
    $("#panel").hide();
    timer.delay(10000);
  },
  loadResult: function(){
    var tempDiv = $("<div>");
    tempDiv.append("<h2>Results:</h2>");
    tempDiv.append("<h3># Correct: " + right + "</h3>");
    tempDiv.append("<h3># Incorrect: " + wrong + "</h3>");
    tempDiv.append("<h3># No answer: " + none + "</h3>");
    $("#restart").show();
    $("#result").html(tempDiv);
    $("#result").show();
    $("#panel").hide();
    $("#timer").hide();
  },
  // game reset function
  reset: function(){
    right = 0;
    wrong = 0;
    none = 0;
    question = 1;
    timer.reset();
    for(i in trivia){
      trivia[i].used = false;
    }
  },
}

$(document).ready(function(){
  $("#restart").hide();

  $("#start").on("click", function(){
    $("#start").hide();
    
    game.load();
  });

  $("#restart").on("click", function(){
    game.reset();
    game.load();
  });
});


