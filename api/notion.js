module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') { res.status(200).end(); return; }

  var fullUrl = req.url || '';
  var endpoint = fullUrl.replace(/^\/api\/notion\/?/, '').split('?')[0];
  var notionUrl = 'https://api.notion.com/v1/' + endpoint;

  res.status(200).json({ 
    endpoint: endpoint,
    notionUrl: notionUrl,
    method: req.method
  });
};
