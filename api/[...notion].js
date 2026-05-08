module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') { res.status(200).end(); return; }

  var slug = req.query.notion || [];
  var endpoint = Array.isArray(slug) ? slug.join('/') : slug;
  if (!endpoint) { res.status(400).json({ error: 'Missing endpoint' }); return; }

  var notionUrl = 'https://api.notion.com/v1/' + endpoint;

  var options = {
    method: req.method,
    headers: {
      'Authorization': 'Bearer ' + process.env.NOTION_TOKEN,
      'Notion-Version': '2022-06-28',
      'Content-Type': 'application/json',
    },
  };

  if (req.method === 'POST' || req.method === 'PATCH') {
    options.body = JSON.stringify(req.body || {});
  }

  try {
    var response = await fetch(notionUrl, options);
    var data = await response.json();
    res.status(response.status).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message || 'Unknown error' });
  }
};
