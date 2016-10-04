# Alexa Speech Assets

This folder contains metadata used for configuring the Alexa skill.

## IntentSchema.json

This file defines the Intent format.  Fruit Stand has one action and
therefore, one intent. Each fruit/vegetable is stored as a custom slot
type called Item.

## items.js

This file imports the instructions and prints out a list of the items, which should
be added to the customSlotTypes as a `LIST_OF_ITEMS`.

`npm run items` will generate this list from the instructions module.

## SampleUtterances.txt

This file defines the phrases that can be used to invoke Fruit Stand.
