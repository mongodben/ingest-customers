import { makeMongoDbDotComCustomersDataSource } from './data-sources/MongoDbDotComCustomersDataSource'

import { makeIngestMetaStore, type Config, type Constructor } from 'mongodb-rag-ingest'
import { strict as assert } from 'assert'
import { makeOpenAiEmbedder, OpenAIClient, AzureKeyCredential, makeMongoDbEmbeddedContentStore, makeMongoDbPageStore } from 'mongodb-rag-core'
import { standardChunkFrontMatterUpdater } from 'mongodb-rag-ingest/embed'
import { type DataSource } from 'mongodb-rag-ingest/sources'
const {
  MONGODB_DOT_COM_CONNECTION_URI,
  MONGODB_DOT_COM_DB_NAME,
  MONGODB_CONNECTION_URI,
  MONGODB_DATABASE_NAME,
  OPENAI_ENDPOINT,
  OPENAI_API_KEY,
  OPENAI_EMBEDDING_DEPLOYMENT
} = process.env

assert(OPENAI_ENDPOINT, 'Missing OPENAI_ENDPOINT')
assert(OPENAI_API_KEY, 'Missing OPENAI_API_KEY')
assert(OPENAI_EMBEDDING_DEPLOYMENT, 'Missing OPENAI_EMBEDDING_DEPLOYMENT')
assert(MONGODB_CONNECTION_URI, 'Missing MONGODB_CONNECTION_URI')
assert(MONGODB_DATABASE_NAME, 'Missing MONGODB_DATABASE_NAME')
assert(MONGODB_DOT_COM_CONNECTION_URI, 'Missing MONGODB_DOT_COM_CONNECTION_URI')
assert(MONGODB_DOT_COM_DB_NAME, 'Missing DB_NAME')

const embedder = makeOpenAiEmbedder({
  openAiClient: new OpenAIClient(
    OPENAI_ENDPOINT,
    new AzureKeyCredential(OPENAI_API_KEY)
  ),
  deployment: OPENAI_EMBEDDING_DEPLOYMENT,
  backoffOptions: {
    numOfAttempts: 25,
    startingDelay: 1000
  }
})

export default {
  embedder: () => embedder,
  embeddedContentStore: () =>
    makeMongoDbEmbeddedContentStore({
      connectionUri: MONGODB_CONNECTION_URI,
      databaseName: MONGODB_DATABASE_NAME
    }),
  pageStore: () =>
    makeMongoDbPageStore({
      connectionUri: MONGODB_CONNECTION_URI,
      databaseName: MONGODB_DATABASE_NAME
    }),
  ingestMetaStore: () =>
    makeIngestMetaStore({
      connectionUri: MONGODB_CONNECTION_URI,
      databaseName: MONGODB_DATABASE_NAME,
      entryId: 'all'
    }),
  chunkOptions: () => ({
    transform: standardChunkFrontMatterUpdater
  }),
  dataSources: () => [
    makeMongoDbDotComCustomersDataSource({
      connectionUri: MONGODB_DOT_COM_CONNECTION_URI,
      dbName: MONGODB_DOT_COM_DB_NAME
    })
  ]
} satisfies Config
