# Ingest mongodb.com/customers

This project contains the code to ingest the data from mongodb.com/customers into a MongoDB database for use with the MongoDB RAG framework.

## Set up

1. `npm install`
2. `cp .env.example .env`. Fill in the relevant values.
   - For the mongodb.com DB access reach out to the mongodb.com team.

## Run it

Generate pages + embeddings:

```sh
npm run ingest:all
```
