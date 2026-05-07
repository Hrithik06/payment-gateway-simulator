# PayCore — Payment Gateway Simulator

A Payment Gateway UI built with Next.js App Router and TypeScript. Simulates a full payment lifecycle without any third-party payment SDKs.

## Tech Stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS
- Redux Toolkit
- React Hook Form
- Lucide React

## Getting Started

### Prerequisites
- Node.js 20+
- pnpm/npm

### Installation

git clone https://github.com/Hrithik06/paycore.git

cd paycore

##### Install Packages
`pnpm install` or `npm install`

##### Dev server
`pnpm dev` or `npm run dev`

##### Open http://localhost:3000

## Features

- Payment form with real-time field validation
- Card type detection (Visa, Mastercard, Amex) with live card preview
- Full payment lifecycle — Idle, Processing, Success, Failed, Timeout, Locked
- Mock API route simulating 60% success, 25% failure, 15% timeout
- AbortController frontend timeout at 6 seconds
- Retry logic — max 3 attempts per transaction with idempotent transaction IDs
- Transaction history persisted in localStorage with status filtering
- Accessible — aria-describedby on all inputs, focus management on state transitions
- Responsive — 375px mobile and 1280px desktop

## Assumptions

- Payment status is not persisted across page refreshes — real payment gateways redirect users after completion
- Transaction history shows last 5 entries by default with Load More pagination
- Timeout and Failed states share the same screen with different copy and accent colours
- Amex cards use 4-6-5 formatting (15 digits) while all other cards use 4-4-4-4 (16 digits)
- Currency selector changes display symbol only — no conversion between INR and USD

## What I'd Improve Given More Time

- Add animations using Framer Motion on state transitions
- Add receipt download as PDF on success screen
- Write unit tests for validation and formatting utils
- Replace localStorage with a proper backend and database
- Add card flip animation on the live preview
