import { Request, Response } from 'express';
import { scrapeSchema } from '../validations/scrape.schema';
import { ScraperService, BotProtectionError } from '../services/scraper.service';
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

      // Handle Bot Protection (PerimeterX, etc.)
      if (err instanceof BotProtectionError) {
        res.status(403).json({
          error: 'Bot Protection Detected',
          message: err.message,
          suggestion: 'This website actively blocks automated browsers. Try scraping a different website that allows public access.',
        });
        return;
      }

      // Handle Gemini AI Quota Exceeded (429)
      if (err.status === 'RESOURCE_EXHAUSTED' || err.message?.includes('quota') || err.code === 429) {
        res.status(429).json({
          error: 'AI Quota Exceeded',
          message: 'The AI service is temporarily unavailable because the free-tier usage limit has been reached.',
          suggestion: 'Please wait about 60 seconds before trying again, or try a simpler prompt.',
        });
        return;
      }

      res.status(500).json({ error: 'Failed to extract data from URL', details: err.message });
    }
  }
}
