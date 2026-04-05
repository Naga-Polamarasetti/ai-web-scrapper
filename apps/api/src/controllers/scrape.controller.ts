import { Request, Response } from 'express';
import { scrapeSchema } from '../validations/scrape.schema';
import { ScraperService } from '../services/scraper.service';
import { AIService } from '../services/ai.service';

export class ScrapeController {
  /**
   * Handles the request to scrape a webpage and extract by using gemini.
   */
  static async extract(req: Request, res: Response): Promise<void> {
    const { error } = scrapeSchema.validate(req.body);
    if (error) {
      res.status(400).json({ error: error.details[0].message });
      return;
    }

    const { url, userPrompt } = req.body;

    try {
      // 1. Scrape the page (Screenshot & HTML)
      const { screenshotBuffer, html } = await ScraperService.scrape(url);

      // 2. Pass it to the AI for data extraction
      const result = await AIService.extractStructuredData(userPrompt, screenshotBuffer, html);

      // 3. Return the nicely parsed JSON array or object
      const parsedData = JSON.parse(result.text || '{}');
      res.json(parsedData);
      
    } catch (err: any) {
      console.error('Scrape error:', err);
      res.status(500).json({ error: 'Failed to extract data from URL', details: err.message });
    }
  }
}
