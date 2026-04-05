import { Router } from 'express';
import { ScrapeController } from '../controllers/scrape.controller';

const router = Router();

// Testing Endpoint & Documentation
router.get('/', (req, res) => {
  const htmlDoc = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>API Documentation - AI Web Scraper</title>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; line-height: 1.6; margin: 0; padding: 20px; color: #333; background: #f9f9f9; }
        .container { max-width: 800px; margin: 0 auto; background: #fff; padding: 30px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
        h1 { color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 10px; margin-top: 0;}
        h2 { color: #34495e; margin-top: 30px; }
        p { font-size: 16px; }
        pre { background: #f4f6f8; border: 1px solid #e1e4e8; border-radius: 6px; padding: 16px; overflow-x: auto; }
        .endpoint { background: #e8f4fd; border-left: 4px solid #3498db; padding: 15px; margin-bottom: 20px; border-radius: 0 6px 6px 0; font-family: monospace; font-size: 16px; font-weight: bold; }
        .method { color: #fff; background: #27ae60; padding: 4px 8px; border-radius: 4px; margin-right: 10px; }
        table { width: 100%; border-collapse: collapse; margin-top: 15px; }
        th, td { text-align: left; padding: 12px; border-bottom: 1px solid #ddd; }
        th { background-color: #f2f2f2; }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>AI Web Scraper API</h1>
        <p>Welcome to the AI-powered web scraper API. Below you will find the documentation on how to interact with the endpoints.</p>
        
        <h2>Extract Data Endpoint</h2>
        <div class="endpoint"><span class="method">POST</span>/api/scrape</div>
        <p>Scrapes a given URL using a headless browser and uses Gemini AI to extract structured data matching the provided prompt.</p>
        
        <h3>Request Body (JSON)</h3>
        <table>
          <thead><tr><th>Field</th><th>Type</th><th>Description</th></tr></thead>
          <tbody>
            <tr><td><code>url</code></td><td>string (URI)</td><td><b>Required.</b> The fully qualified URL of the page you want to scrape (must start with http:// or https://).</td></tr>
            <tr><td><code>userPrompt</code></td><td>string</td><td><b>Required.</b> Natural language instructions defining the exact data you want to extract and the JSON structure you desire (15 - 300 characters).</td></tr>
          </tbody>
        </table>

        <h3>Example Request</h3>
        <pre><code>curl -X POST http://localhost:3333/api/scrape \\
  -H "Content-Type: application/json" \\
  -d '{
    "url": "https://example.com/contact",
    "userPrompt": "Extract social media links, emails, and phone numbers. Format as JSON with contactDetails object containing socialMediaLinks array, email, and phone."
  }'</code></pre>

        <h3>Example Response</h3>
        <pre><code>{
  "contactDetails": {
    "socialMediaLinks": [
      { "platform": "GitHub", "url": "https://github.com/example" }
    ],
    "email": "hello@example.com",
    "phone": "+1-555-555-5555"
  }
}</code></pre>
      </div>
    </body>
    </html>
  `;
  res.type('html').send(htmlDoc);
});

// Scraper Data Extraction
router.post('/scrape', ScrapeController.extract);

export { router as apiRoutes };
