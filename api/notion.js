module.exports = async function handler(req, res) {
  var fullUrl = req.url || '';
  var endpoint = fullUrl.replace(/^\/api\/notion\/?/, '').split('?')[0];
  var notionUrl = 'https://api.notion.com/v1/' + endpoint;
  
  // Retourne juste le debug sans appeler Notion
  return res.status(200).json({
    fullUrl: fullUrl,
    endpoint: endpoint,
    notionUrl: notionUrl
  });
};
