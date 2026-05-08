module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') { res.status(200).end(); return; }

  var body = '';
  if (req.method === 'POST' || req.method === 'PATCH') {
    body = JSON.stringify(req.body || {});
  }

  var endpoint = (req.url || '').replace('/api/notion/', '').split('?')[0];
  var notionUrl = 'https://api.notion.com/v1/' + endpoint;

  try {
    var response = await fetch(notionUrl, {
      method: req.method,
      headers: {
        'Authorization': 'Bearer ' + process.env.NOTION_TOKEN,
        'Notion-Version': '2022-06-28',
        'Content-Type': 'application/json',
      },
      body: body || undefined,
    });
    var data = await response.json();
    res.status(response.status).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
