/**
 * Bing URL Submission Script (IndexNow)
 * 
 * Usage:
 * 1. Generate an IndexNow API Key from Bing Webmaster Tools.
 * 2. Save the key in a file named after the key (e.g., <key>.txt) in the public folder.
 * 3. Run this script: node scripts/bing-submit.js <YOUR_API_KEY>
 */

const https = require('https');

const API_KEY = process.argv[2];
const HOST = 'getwaved.ai'; // Change to your production domain
const KEY_LOCATION = `https://${HOST}/${API_KEY}.txt`;

if (!API_KEY) {
    console.error('Error: Please provide your Bing IndexNow API Key as an argument.');
    console.log('Usage: node scripts/bing-submit.js <YOUR_API_KEY>');
    process.exit(1);
}

const data = JSON.stringify({
    host: HOST,
    key: API_KEY,
    keyLocation: KEY_LOCATION,
    urlList: [
        `https://${HOST}/`,
        `https://${HOST}/company-profile`,
        `https://${HOST}/investors`,
        `https://${HOST}/investor-deck`
    ]
});

const options = {
    hostname: 'api.indexnow.org',
    port: 443,
    path: '/IndexNow',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Content-Length': data.length
    }
};

console.log(`Submitting URLs to IndexNow for host: ${HOST}...`);

const req = https.request(options, (res) => {
    console.log(`Status Code: ${res.statusCode}`);

    res.on('data', (d) => {
        process.stdout.write(d);
    });

    if (res.statusCode === 200) {
        console.log('\nSuccess! Bing has been notified of your URL updates.');
    } else {
        console.error('\nFailed to submit URLs. Check your API key and domain.');
    }
});

req.on('error', (error) => {
    console.error('Request error:', error);
});

req.write(data);
req.end();
