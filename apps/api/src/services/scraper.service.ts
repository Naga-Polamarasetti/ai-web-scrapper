import { chromium, Browser } from 'playwright';
import * as fs from 'fs';

export class ScraperService {
  /**
   * Launches Playwright to capture a screenshot and extract the HTML from the given URL.
   */
  static async scrape(url: string): Promise<{ screenshotBuffer: Buffer; html: string }> {
    let browser: Browser | null = null;
    
    try {
      browser = await chromium.launch({ headless: false });
      const page = await browser.newPage();
      
      await page.goto(url);
      await page.waitForLoadState('networkidle');

      const screenshotBuffer = await page.screenshot({ fullPage: true });
      const html = await page.content();

      // Write the screenshot locally for debugging purposes
      fs.writeFileSync('screenshot.png', screenshotBuffer);

      return { screenshotBuffer, html };
    } finally {
      if (browser) {
        await browser.close();
      }
    }
  }
}
