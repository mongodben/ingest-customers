import 'dotenv/config'
import { makeMongoDbDotComCustomersDataSource } from './MongoDbDotComCustomersDataSource'
import { strict as assert } from 'assert'
// import { writeFileSync } from 'fs'
assert(process.env.MONGODB_DOT_COM_CONNECTION_URI, 'Missing MONGODB_DOT_COM_CONNECTION_URI')
assert(process.env.MONGODB_DOT_COM_DB_NAME, 'Missing MONGODB_DOT_COM_DB_NAME')

const dotcomDataSource = makeMongoDbDotComCustomersDataSource({
  connectionUri: process.env.MONGODB_DOT_COM_CONNECTION_URI,
  dbName: process.env.MONGODB_DOT_COM_DB_NAME
})
describe('MongoDbDotComCustomersDataSource', () => {
  it('should fetch pages', async () => {
    const pages = await dotcomDataSource.fetchPages()
    // writeFileSync('pages.json', JSON.stringify(pages, null, 2))
    expect(pages.length).toBeGreaterThan(0)
  })
})
