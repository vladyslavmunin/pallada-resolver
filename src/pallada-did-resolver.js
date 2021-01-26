const fetch = require('node-fetch');

async function fetchDIDDocument(did, url) {
    const response = await fetch(url + did);
	const json = await response.json();
    console.log(json);
    return json
}

function getResolver(conf = {}) {
    async function resolve(did, parsed) {
    const fullId = parsed.id.match(/^(.*)?(0x[0-9a-fA-F]{40})$/)
    if (!fullId) throw new Error(`Not a valid  DID: ${did}`)
    const doc = await fetchDIDDocument(did, conf['url'])
    return doc
  }
  return { healhy: resolve , ethr: resolve }
}

module.exports = {
  getResolver
}