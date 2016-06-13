// Referenced from Amazon.

var config = require('./config');
var APP_ID = config.APP_ID; //replace with "amzn1.echo-sdk-ams.app.[your-unique-value-here]";

/**
* Array containing banana facts.
*/

// Source: The Banana Police http://thebananapolice.com/fun-facts/
var BANANA_FACTS = [
  "The scientific name for banana is musa sapientum, which means 'fruit of the wise men.'",
  "Bananas float in water, as do apples and watermelons.",
  "Hawaii is the only place in the U.S. where bananas are grown commercially, although at one time they were also grown in southern California and Florida. The overwhelming majority of the bananas Americans eat come from countries in Latin America and South America, including Costa Rica, Ecuador, Colombia, Honduras, Panama, and Guatemala.",
  "The type of banana you see in the supermarket is called a Cavendish banana. The preferred variety was originally the Gros Michel, which essentially became extinct by 1960, thanks to a fungus called Panama disease.",
  "Some cultures (most notably Japan) use the fiber in the banana plant to make fabric and sometimes even paper.",
  "The fastest marathon ever run by a competitor dressed as a fruit was 2 hours, 58 minutes, and 20 seconds—recorded at the Barcelona Marathon on March 6, 2011. The runner was Patrick Wightman from the United Kingdom, who dressed as a banana."
];

/**
* The AlexaSkill prototype and helper functions
*/
var AlexaSkill = require('./libs/alexa_skill');

/**
* BananaGeek is a child of AlexaSkill.
* To read more about inheritance in JavaScript, see the link below.
*
* @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript#Inheritance
*/
var BananaGeek = function () {
  AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
BananaGeek.prototype = Object.create(AlexaSkill.prototype);
BananaGeek.prototype.constructor = BananaGeek;

BananaGeek.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
  console.log("BananaGeek onSessionStarted requestId: " + sessionStartedRequest.requestId
  + ", sessionId: " + session.sessionId);
  // any initialization logic goes here
};

BananaGeek.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
  console.log("BananaGeek onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
  handleNewFactRequest(response);
};

/**
* Overridden to show that a subclass can override this function to teardown session state.
*/
BananaGeek.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
  console.log("BananaGeek onSessionEnded requestId: " + sessionEndedRequest.requestId
  + ", sessionId: " + session.sessionId);
  // any cleanup logic goes here
};

BananaGeek.prototype.intentHandlers = {
  "GetNewFactIntent": function (intent, session, response) {
    handleNewFactRequest(response);
  },

  "AMAZON.HelpIntent": function (intent, session, response) {
    response.ask("You can ask Banana Geek tell me a banana fact, or, you can say exit... What can I help you with?", "What can I help you with?");
  },

  "AMAZON.StopIntent": function (intent, session, response) {
    var speechOutput = "Peace";
    response.tell(speechOutput);
  },

  "AMAZON.CancelIntent": function (intent, session, response) {
    var speechOutput = "Peace";
    response.tell(speechOutput);
  }
};

/**
* Gets a random new fact from the list and returns to the user.
*/
function handleNewFactRequest(response) {
  // Get a random banana fact from the banana facts list
  var factIndex = Math.floor(Math.random() * BANANA_FACTS.length);
  var fact = BANANA_FACTS[factIndex];

  // Create speech output
  var speechOutput = "Here's your banana fact: " + fact;

  response.tellWithCard(speechOutput, "BananaGeek", speechOutput);
}

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
  // Create an instance of the BananaGeek skill.
  var bananaGeek = new BananaGeek();
  bananaGeek.execute(event, context);
};
