# AI Web Scrapper 🕷️🤖

An intelligent, open-source web scraping platform that leverages **Playwright** for robust browser automation and **Google Gemini** for high-fidelity data extraction. No more fragile CSS selectors or complex regex—just describe what you want in plain English.

![AI Web Scraper Dashboard](https://raw.githubusercontent.com/Naga-Polamarasetti/ai-web-scrapper/main/apps/web/src/assets/logo.png) *(Placeholder: Update with your own screenshot)*

## ✨ Key Features

- **Natural Language Extraction**: Simply describe the data you need (e.g., "Extract all product names and their current discounts") and let the AI handle the parsing.
- **Dynamic Content Support**: Powered by **Playwright**, it can navigate complex SPAs, single-page apps, and heavy JavaScript sites.
- **Bot Protection Detection**: Built-in logic to detect common anti-bot measures (like PerimeterX) and provide actionable suggestions to the user.
- **Structured JSON Output**: Guaranteed valid JSON returns, grouped into logical arrays or nested objects according to your prompt.
- **Modern React Dashboard**: A sleek, dark-mode-inspired UI for real-time monitoring and interaction.
- **API Documentation**: Interactive documentation served directly from the backend to help you integrate the scraper into your own workflows.

## 🚀 Getting Started

### Prerequisites

- **Node.js**: `v18.x` or higher
- **Nx**: Installed globally (`npm install -g nx`) or use `npx nx`
- **Google Gemini API Key**: Obtain a free or paid key from [Google AI Studio](https://aistudio.google.com/app/apikey).

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Naga-Polamarasetti/ai-web-scrapper.git
   cd ai-web-scrapper
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Copy the example environment file and add your credentials:
   ```bash
   cp .env.example .env
   ```
   Open `.env` and set your `GEMINI_API_KEY`.

### Running Locally

This project uses **Nx** to manage the monorepo. You need to run both the API and the Web projects.

1. **Start the API (Backend)**:
   ```bash
   npx nx serve api
   ```
   The API will be available at `http://localhost:3333/api`. You can view the interactive documentation at the root of the API endpoint.

2. **Start the Web Dashboard (Frontend)**:
   ```bash
   npx nx serve web
   ```
   The dashboard will be available at `http://localhost:4200`.

## 🛠️ Tech Stack

- **Monorepo Management**: [Nx](https://nx.dev)
- **Backend**: Node.js, Express, Playwright, Joi
- **Frontend**: React, Tailwind CSS v4, Lucide Icons
- **AI Engine**: Google Gemini (via `@google/generative-ai`)

## 🛡️ License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request or open an issue for any bugs or feature requests.

---

Built with ❤️ using Gemini and Playwright.  
[Interactive API Documentation](http://localhost:3333/api)
