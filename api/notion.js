module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') { res.status(200).end(); return; }

  // Debug — montre l'URL reçue
  var fullUrl = req.url || '';
  var endpoint = fullUrl.replace(/^\/api\/notion\/?/, '').split('?')[0];
  
  res.status(200).json({ 
    debug: true,
    req_url: fullUrl,
    endpoint: endpoint,
    query: req.query
  });
};