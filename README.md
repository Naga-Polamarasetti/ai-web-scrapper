# AI Web Scrapper 🕷️🤖

I built this because I was tired of writing fragile CSS selectors and maintaining complex scraping scripts every time a website changed its layout. 

This is an intelligent, simple-to-use platform that uses **Playwright** to "see" a website and **Google Gemini** to "think" about what data to extract. You just give it a URL and tell it what you want in plain English. No more selector-hunting.

## 🚀 Why use this?

- **It's "Selector-less"**: You don't need to find `.product-price` or `#main-content`. Just say "Extract the price" and it works.
- **Handles the Hard Stuff**: It's pre-configured with stealth plugins to help bypass basic bot detection and clearly tells you when it's being blocked by more aggressive measures.
- **Valid JSON, every time**: It guarantees a structured JSON response so you can plug it straight into your own app or database.
- **Built for Developers**: Clean, modular code that’s easy to read and even easier to extend.

## 🛠️ Quick Start (3 Steps)

### 1. The Setup
You'll need **Node.js 18+** and a **Gemini API Key** (which you can get for free from [Google AI Studio](https://aistudio.google.com/)).

```bash
git clone https://github.com/Naga-Polamarasetti/ai-web-scrapper.git
cd ai-web-scrapper
npm install
```

### 2. The Key
Copy `.env.example` to `.env` and paste in your API key:
```bash
cp .env.example .env
```

### 3. The Run
This is a monorepo, so you'll need two terminals to run the backend and frontend simultaneously:

**Terminal 1 (Backend API):**
```bash
npx nx serve api
```

**Terminal 2 (Frontend Dashboard):**
```bash
npx nx serve web
```

Open [http://localhost:4200](http://localhost:4200) and start scraping!

## 🧪 Documentation

If you want to use the API directly in your own tools, the backend serves an interactive documentation page at `http://localhost:3333/api`. No hidden secrets—everything is laid out right there.

## 🤝 Let's make it better

If you run into a website that this tool can't handle, or if you have an idea for a "Quick Prompt" that everyone should have, please open an issue or a PR. I'd love to see where this goes!

---
Built with ❤️ for every dev who has ever spent 2 hours debugging a `.div > span` selector.
