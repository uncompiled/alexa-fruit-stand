"use strict";

const AlexaSkill = require("./alexa-skill");
const instructions = require("./instructions");

// App configuration
const APP_ID = "amzn1.ask.skill.81a9a971-dae1-4b4a-950c-923e2cc7b816";

// Fruit Stand extends AlexaSkill
const FruitStand = function () {
  AlexaSkill.call(this, APP_ID);
};

FruitStand.prototype = Object.create(AlexaSkill.prototype);
FruitStand.prototype.constructor = FruitStand;

FruitStand.prototype.eventHandlers.onLaunch = function (
  launchRequest,
  session,
  response,
) {
  const speechText =
    "Welcome to the Fruit Stand. You can ask a question like, how do I store cucumbers? ... Now, what can I help you with.";
  const repromptText =
    "For instructions on what you can say, please say help me.";
  response.ask(speechText, repromptText);
};

FruitStand.prototype.intentHandlers = {
  FruitStandIntent(intent, session, response) {
    const itemSlot = intent.slots.Item;
    const itemName =
      itemSlot && itemSlot.value ? itemSlot.value.toLowerCase() : false;
    const cardTitle = "Storage instructions for " + itemName;
    const instruction = instructions.find(itemName);

    let speechOutput;
    let repromptOutput;

    if (instruction) {
      speechOutput = {
        speech: instruction,
        type: AlexaSkill.speechOutputType.PLAIN_TEXT,
      };
      response.tellWithCard(speechOutput, cardTitle, instruction);
    } else {
      const speech = itemName
        ? "I'm sorry, I do not know how to store " +
          itemName +
          ". What else can I help with?"
        : "I'm sorry, I do not know how to store that. What else can I help with?";

      speechOutput = {
        speech,
        type: AlexaSkill.speechOutputType.PLAIN_TEXT,
      };

      repromptOutput = {
        speech: "What else can I help with?",
        type: AlexaSkill.speechOutputType.PLAIN_TEXT,
      };

      bugReport(itemName);
      response.ask(speechOutput, repromptOutput);
    }
  },

  "AMAZON.StopIntent"(intent, session, response) {
    response.tell("Goodbye");
  },

  "AMAZON.CancelIntent"(intent, session, response) {
    response.tell("Goodbye");
  },

  "AMAZON.HelpIntent"(intent, session, response) {
    const speechText =
      "You can ask questions such as, how do I store apples, or, you can say exit... Now, what can I help you with?";
    const repromptText =
      "You can say things like, how do I store this banana, or, you can say exit... Now, what can I help you with?";

    const speechOutput = {
      speech: speechText,
      type: AlexaSkill.speechOutputType.PLAIN_TEXT,
    };

    const repromptOutput = {
      speech: repromptText,
      type: AlexaSkill.speechOutputType.PLAIN_TEXT,
    };

    response.ask(speechOutput, repromptOutput);
  },
};

/**
 * Formats a log message in JSON format
 * to generate metrics for unsupported requests
 * @param {string} itemName - requested item
 */
function bugReport(itemName) {
  const message = {
    status: 400,
    requestedItem: itemName,
  };

  if (itemName) {
    console.log(JSON.stringify(message));
  }
}

exports.handler = function (event, context) {
  const fruitStand = new FruitStand();
  fruitStand.execute(event, context);
};
