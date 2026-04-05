import { chromium, Browser } from 'playwright';

export class ScraperService {
  /**
   * Launches Playwright to capture a screenshot and extract HTML from the given URL.
   */
  static async scrape(url: string): Promise<{ screenshotBuffer: Buffer; html: string }> {
    let browser: Browser | null = null;

    try {
      browser = await chromium.launch({ headless: false });
      const page = await browser.newPage();

      await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
      await page.waitForTimeout(3000);

      const screenshotBuffer = await page.screenshot({ fullPage: true });
      const html = await page.content();

      // Detect if the page is a bot-protection wall
      const bodyText = await page.evaluate(() => document.body.innerText);
      const blockedSignals = [
        'access denied',
        'access to this page has been denied',
        'please verify you are a human',
        'captcha',
        'press & hold',
        'checking your browser',
        'just a moment',
        'attention required',
        'enable javascript and cookies',
      ];

      const isBlocked = blockedSignals.some((signal) =>
        bodyText.toLowerCase().includes(signal)
      );

      if (isBlocked) {
        throw new BotProtectionError(url);
      }

      return { screenshotBuffer, html };
    } finally {
      if (browser) {
        await browser.close();
      }
    }
  }
}

/**
 * Custom error for when a website blocks automated access.
 */
export class BotProtectionError extends Error {
  public readonly statusCode = 403;

  constructor(url: string) {
    const domain = new URL(url).hostname;
    super(
      `"${domain}" has detected this request as automated and blocked access. ` +
      `This website uses advanced bot protection (e.g. PerimeterX, Cloudflare, DataDome) ` +
      `that prevents any automated browser — including Playwright, Puppeteer, and Selenium — ` +
      `from loading the page. This is a server-side security decision by the website owner ` +
      `and cannot be bypassed by a scraper. ` +
      `Please try a different URL that does not use aggressive anti-bot measures.`
    );
    this.name = 'BotProtectionError';
  }
}
