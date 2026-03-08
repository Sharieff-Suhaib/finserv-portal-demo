# FinServ Portal Demo

A simple internal financial services portal for demo purposes.

## Features

- **Issues Inbox** — View, search, and paginate through support issues
- **Customer Lookup** — Search for customer details by ID
- **Tiny Fake API** — JSON-backed API routes for issues and customers

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Running Tests

```bash
npm test
```

## Project Structure

```
pages/          → Next.js pages and API routes
components/     → Reusable React components
lib/            → Utility helpers (filters, pagination, formatting)
data/           → Fake JSON datasets
styles/         → Global CSS
tests/          → Unit tests
docs/           → API documentation
```
