// Quiz

function User (theName, theEmail) {
  this.name         = theName;
  this.email        = theEmail;
  this.quizScores   = [];
  this.currentScore = 0;
}

User.prototype = {
  constructor: User,
  saveScore: function (theScoreToAdd) {
    this.quizScores.push(theScoreToAdd);
  },

  showNameAndScores: function () {
    var scores = this.quizScores.length > 0 ? this.quizScores.join(', ') : "No Score Yet";
    return this.name + " Scores: " + scores;
  },

  changeEmail: function (newEmail) {
    this.email = newEmail;
    return 'New Email Saved: ' + this.email;
  }
};

// Instances if the User function
firstUser = new User('Tony Brown', 'tony@tonybrown.me');
firstUser.changeEmail('tonyb@proaudiodesign.com');
firstUser.saveScore(15);
firstUser.saveScore(30);

firstUser.showNameAndScores();

// another User

secondUser = new User('Peter', 'Peter@example.com');
secondUser.saveScore(18);
secondUser.showNameAndScores();


// The Question function is the parent for all other question objects;
// All question objects will inherit from this Question constructor.

// Parasitic Pattern

function inheritPrototype (childObject, parentObject) {
  var copyOfParent = Object.create(parentObject.prototype);
  copyOfParent.constructor = childObject;
  childObject.prototype = copyOfParent;
}

function Question (theQuestion, theChoices, theCorrectAnswer) {
  // initialize the instance properties
  this.question      = theQuestion;
  this.choices       = theChoices;
  this.correctAnswer = theCorrectAnswer;
  this.userAnswer    = '';

  // private properties: these cannot be changed be instances
  var newDate = new Date(),
  // Constant variable: available to all instances through the
  // instance method below.
  // This is also a private proptery;
  QUIZ_CREATED_DATE = newDate.toLocaleDateString();
  // This is the only way to access the private QUIZ_CREATE_DATE varible or constant
  // This is an example of a privileged method: it can access private properties
  // and it can be called publically
  this.getQuizDate = function () {
    return QUIZ_CREATED_DATE;
  };
  // A confirmation message that the quiz was created on.
  console.log('Quiz Created On: ' + this.getQuizDate());
}

// Define the prototype methods that will be inherited
Question.prototype.getCorrectAnswer = function () {
  return this.correctAnswer;
};

Question.prototype.getUserAnswer = function () {
  return this.userAnswer;
};

Question.prototype.displayQuestion = function () {
  var output = document.getElementById('app');

  var questionToDisplay = '<div class="question">' + this.question + '</div><ul>',
      choiceCounter = 0;
  this.choices.forEach(function (eachChoice) {
    questionToDisplay += '<li><input type="radio" name="choice" value= "' + choiceCounter + '">' + eachChoice + '</li>';
    choiceCounter++;
  });

  questionToDisplay += '</ul>';
  output.innerHTML += questionToDisplay;
  console.log(questionToDisplay);

};

// Create multiple choice question
function MultipleChoiceQuestion (theQuestion, theChoices, theCorrectAnswer) {
  Question.call(this, theQuestion, theChoices, theCorrectAnswer);
}

inheritPrototype(MultipleChoiceQuestion, Question);

// Create Drag and Drop Question
function DragDropQuestion (theQuestion, theChoices, theCorrectAnswer) {
  Question.call(this, theQuestion, theChoices, theCorrectAnswer);
}

// Inherit the methods and properties from Question
inheritPrototype(DragDropQuestion, Question);

// Override the displayQuestion method it inherited
DragDropQuestion.prototype.displayQuestio = function () {
  // we will just return the question as drag and drop are not in scope of tutorial
  console.log(this.question);
};

// Initialize some questions and add them to an array
var allQuestions = [
  new MultipleChoiceQuestion('Who is the Prime Minister of England?', ['Obama', 'Brown', 'Cameron'], 3),
  new MultipleChoiceQuestion('What is the capital of Brazil?', ['San Palo', 'Rio de Janero', 'Brasilia'], 2),
  new DragDropQuestion('Drag the city to the world map', ['Washington D.C.', 'Rio de Janero', 'Stockholm'], 0)
];

// Display all the questions
allQuestions.forEach(function (eachQuestion) {
  eachQuestion.displayQuestion();
});











//var myObj = {
//  name: 'Tony Brown',
//  profession: 'Developer'
//}
//
//// Prototype Pattern
//function Employee () { }
//
//Employee.prototype.firstName = 'Abhijit';
//Employee.prototype.lastName  = 'Patel';
//Employee.prototype.startDate = new Date();
//Employee.prototype.signedNDA = true;
//Employee.prototype.fullName  = function () {
//  console.log(this.firstName + ' ' + this.lastName);
//};
//
//var abhijit = new Employee();
//
//console.log(abhijit.fullName());
//console.log(abhijit.signedNDA);
//
//// Constructor Pattern
//function Employee (name, profession) {
//  this.name = name;
//  this.profession = profession;
//}
//
//Employee.prototype.fullName = function () {
//  console.log('My name is ' + this.name + ' and I am a ' + this.profession + '.');
//};
//
//var tony = new Employee('Tony Brown', 'JavaScript Developer');
//
//console.log(tony.fullName());
//
