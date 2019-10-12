# "Alexa, ask Fruit Stand, how do I store (fruit | vegetable)..."

[![Build Status](https://travis-ci.org/uncompiled/alexa-fruit-stand.svg?branch=master)](https://travis-ci.org/uncompiled/alexa-fruit-stand)

Fruit Stand is an Alexa Skill that responds with information
regarding how to store particular fruits or vegetables.

## Getting Started

- `alexa-skill.js` comes directly from the Amazon Alexa Skills Kit
- `index.js` contains the core Alexa skill
- `instructions.js` contains the responses for each item
- `speechAssets` contains the Intent schema and slot metadata used to configure the skill

### Testing

- `npm test` will run the tests to ensure the project runs

### Deployment

- `npm run items` to generate the list of items for the Alexa interaction model
- `serverless deploy` to deploy as an AWS Lambda

NOTE: The Alexa skill ID is [in the code](https://github.com/uncompiled/alexa-fruit-stand/blob/master/src/index.js#L7),
so if you adapt this code for something else, you'll want to change it.

## Contributions

Contributions are welcome.  If you'd like to add support for new fruits and vegetables,
please create an issue before you submit a PR using the [new item template](.github/NEW_ITEM_TEMPLATE.md).

## Credits

- Based on examples from the [Alexa Skills Kit](https://github.com/amzn/alexa-skills-kit-js)
- Information comes from [UC Davis Postharvest Technology](http://ucce.ucdavis.edu/files/datastore/234-1920.pdf)
- Idea from the mind of @street_pizza
- Fruit Basket by Boudewijn Mijnlieff from the Noun Project

## License

Apache 2.0
