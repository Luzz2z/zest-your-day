export const config = {
api: {
bodyParser: true,
},
};

export default async function handler(req, res) {
res.setHeader(‘Access-Control-Allow-Origin’, ‘*’);
res.setHeader(‘Access-Control-Allow-Methods’, ‘GET, POST, PATCH, OPTIONS’);
res.setHeader(‘Access-Control-Allow-Headers’, ‘Content-Type’);

if (req.method === ‘OPTIONS’) return res.status(200).end();

const endpoint = req.query.endpoint;
if (!endpoint) return res.status(400).json({ error: ‘Missing endpoint’ });

const notionUrl = ‘https://api.notion.com/v1/’ + endpoint;

let bodyString = undefined;
if (req.method === ‘POST’ || req.method === ‘PATCH’) {
try {
bodyString = typeof req.body === ‘string’ ? req.body : JSON.stringify(req.body);
} catch(e) {
bodyString = ‘{}’;
}
}

try {
const response = await fetch(notionUrl, {
method: req.method,
headers: {
‘Authorization’: ’Bearer ’ + process.env.NOTION_TOKEN,
‘Notion-Version’: ‘2022-06-28’,
‘Content-Type’: ‘application/json’,
},
body: bodyString,
});

```
const data = await response.json();
return res.status(response.status).json(data);
```

} catch (err) {
return res.status(500).json({ error: err.message });
}
}