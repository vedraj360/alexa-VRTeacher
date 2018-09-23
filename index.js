/* eslint-disable  func-names */
/* eslint-disable  no-console */

const Alexa = require('ask-sdk-core');
const cookbook = require('./alexa-cookbook.js');

const SKILL_NAME = 'Teacher';
const GET_POEM_MESSAGE = 'Here\'s your poem: ';
const HELP_MESSAGE = 'You can say tell me a poem, or, you can say exit... What can I help you with?';
const HELP_REPROMPT = 'What can I help you with?';
const FALLBACK_MESSAGE = 'The skill can\'t help you with that.';
const FALLBACK_REPROMPT = 'What can I help you with?';
const STOP_MESSAGE = 'Goodbye!';
const DATA1_MESSAGE = 'Here is your Answer: ';
const SUM_MESSAGE = 'Sum is: ';
const GK = ['Jeffrey Preston Bezos is an American technology entrepreneur, investor, and philanthropist. He is best known as the founder, chairman, and CEO of Amazon. Bezos was born in Albuquerque, New Mexico and raised in Houston'
];

const data = [
  'I cannot go to school today Said little Peggy Ann McKayhave the measles and the mumps,A gash a rash and purple bumps ',
  'I own a big fat cat-The fattest for miles around. Wherever theres lots of food Thats where hell be found',
];
const data1 = [ 'The capability of a class to derive properties and characteristics from another class is called Inheritance. Inheritance is one of the most important feature of Object Oriented Programming'
];


const GETNEWPOEMHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'LaunchRequest'
      || (request.type === 'IntentRequest'
        && request.intent.name === 'GETNEWPOEM');
  }, 
  handle(handlerInput) {


    const randomPoem = cookbook.getRandomItem(data);
    const speechOutput = GET_POEM_MESSAGE + randomPoem;

    return handlerInput.responseBuilder
      .speak(speechOutput)
      .withSimpleCard(SKILL_NAME, randomPoem)
      .getResponse();
  },
};

const GETADDHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return (request.type === 'IntentRequest'
        && request.intent.name === 'ADD');
  }, 
  handle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;

const num1 = request.intent.slots.number.value;
const num2 = request.intent.slots.num.value;
const sum = Number(num1) + Number(num2);

    
    const speechOutput = SUM_MESSAGE +sum;

    return handlerInput.responseBuilder
      .speak(speechOutput)
      .withSimpleCard(SKILL_NAME, sum)
      .getResponse();
  },
};


const GETINTHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return (request.type === 'IntentRequest'
        && request.intent.name === 'GETINT');
  }, 
  handle(handlerInput) {


    const randomData = cookbook.getRandomItem(data1);
    const speechOutput = DATA1_MESSAGE + randomData;

    return handlerInput.responseBuilder
      .speak(speechOutput)
      .withSimpleCard(DATA1_MESSAGE, randomData)
      .getResponse();
  },
};

const GETGKHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return (request.type === 'IntentRequest'
        && request.intent.name === 'INTENTGK');
  }, 
  handle(handlerInput) {


    const speechOutput = DATA1_MESSAGE + GK;

    return handlerInput.responseBuilder
      .speak(speechOutput)
      .withSimpleCard(DATA1_MESSAGE, GK)
      .getResponse();
  },
};

const HelpHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(HELP_MESSAGE)
      .reprompt(HELP_REPROMPT)
      .getResponse();
  },
};

const FallbackHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && request.intent.name === 'AMAZON.FallbackIntent';
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(FALLBACK_MESSAGE)
      .reprompt(FALLBACK_REPROMPT)
      .getResponse();
  },
};

const ExitHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'IntentRequest'
      && (request.intent.name === 'AMAZON.CancelIntent'
        || request.intent.name === 'AMAZON.StopIntent');
  },
  handle(handlerInput) {
    return handlerInput.responseBuilder
      .speak(STOP_MESSAGE)
      .getResponse();
  },
};

const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    const request = handlerInput.requestEnvelope.request;
    return request.type === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`);

    return handlerInput.responseBuilder.getResponse();
  },
};

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}`);

    return handlerInput.responseBuilder
      .speak('Sorry, an error occurred.')
      .reprompt('Sorry, an error occurred.')
      .getResponse();
  },
};

const skillBuilder = Alexa.SkillBuilders.custom();

exports.handler = skillBuilder
  .addRequestHandlers(
    GETNEWPOEMHandler,
    GETGKHandler,
    GETADDHandler,
    GETINTHandler,
    HelpHandler,
    ExitHandler,
    FallbackHandler,
    SessionEndedRequestHandler
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();
