# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm test              # Run all tests
npm run items         # Generate the list of items for the Alexa interaction model (outputs to stdout)
npm run format        # Format code with prettier
npm run deploy        # Prune dev deps and deploy to AWS Lambda via serverless
serverless deploy     # Deploy directly (requires AWS credentials)
```

To run a single test file: `npx jest src/instructions.test.js`

## Architecture

This is an **AWS Lambda-backed Alexa Skill** that answers questions about how to store fruits and vegetables.

**Request flow:** Alexa → AWS Lambda → `src/index.js` (handler) → `alexa-skill.js` (routing) → `src/instructions.js` (lookup)

### Key files

- **`src/alexa-skill.js`** — Unmodified Amazon Alexa Skills Kit boilerplate. Handles request routing (`LaunchRequest`, `IntentRequest`, `SessionEndedRequest`) and response building. Do not modify.
- **`src/index.js`** — The skill implementation. Extends `AlexaSkill`, defines the `FruitStandIntent` handler, and exports the Lambda `handler`. Logs unrecognized items as JSON (`{ status: 400, requestedItem: ... }`) for CloudWatch metrics.
- **`src/instructions.js`** — The data store. A plain object mapping item names (plural keys) to speech strings, plus a `find(itemName)` function that uses `pluralize` to handle singular/plural variants automatically.
- **`speechAssets/`** — Alexa interaction model config: `IntentSchema.json` defines the `FruitStandIntent` with an `Item` slot, and `items.js` prints all keys from `instructions.js` for use as Custom Slot Types.

### Adding a new item

1. Add an entry to `src/instructions.js` — keys should be **plural** (e.g., `"apples"`, `"brussels sprouts"`)
2. Run `npm test` to verify
3. Run `npm run items` and update the Alexa interaction model with the new slot values
4. Include a source reference (the data comes from UC Davis Postharvest Technology)

### Key behavior notes

- Item lookup normalizes input to lowercase and tries both the raw input and its pluralized form via the `pluralize` library
- The Alexa App ID is hardcoded in `src/index.js:7` — change it if forking for a new skill
- Deployment packages only `src/**` and `node_modules/pluralize/**` (see `serverless.yml`)
