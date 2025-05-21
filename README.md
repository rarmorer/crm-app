This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

# Zoom CRM Demo App

## 📘 Introduction

This is a demo CRM application built to showcase how to integrate Zoom's **Phone** and **Contact Center** using **Zoom Smart Embed**, **Zoom APIs**, and **OAuth** authentication.

This application is designed as a reference project for developers building CRM tools that incorporate Zoom's communication platforms.

### 🔀 Branch Behavior

- **`main`**: Full working CRM with **hardcoded data** and mock Zoom behavior.
- **`phone`**: Connects to **Zoom Phone** via Smart Embed and API calls, uses real **OAuth credentials**.
- **`contact-center`**: Integrates **Zoom Contact Center**, API usage, and **voice authentication** powered by custom logic.

## 🧰 Tech Stack

- **Next.js** – React-based web framework
- **React** – UI library
- **TailwindCSS** – Utility-first CSS
- **Zoom Smart Embed** – Zoom Phone & Contact Center interfaces
- **Node.js API routes** – For backend token exchange and API access
- **Admin-Level OAuth App** – Authorization mechanism for Zoom

## 🚀 Running the App

1. Clone the repository:
   ```bash
   git clone https://github.com/your-org/zoom-crm-demo.git
   cd zoom-crm-demo
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up your `.env` file (see below for OAuth instructions)
4. Start the development server:
   ```bash
   npm run dev
   ```

---

## 🔑 Zoom OAuth Setup

1. Go to the [Zoom App Marketplace](https://marketplace.zoom.us/)
2. Create an **Admin-level OAuth App**
3. Under OAuth settings, add this **redirect URI**:
   ```
   https://your-ngrok-url.ngrok-free.app/api/auth/callback/zoom
   ```
4. Copy your Client ID and Client Secret into `.env`

---

## 🔄 Branch Features Overview

| Branch           | Features                                                                 |
|------------------|--------------------------------------------------------------------------|
| `main`           | Fully working UI using hardcoded CRM data                                |
| `phone`          | Zoom Phone integration with Smart Embed and real API credentials         |
| `contact-center` | Zoom Contact Center with Smart Embed, APIs, and **voice authentication** |

---

## 🗂️ Project Structure

```
/pages
  /api             → API routes for token handling and Zoom integration
/components        → Reusable React components (e.g., VoiceAuth, ContactCard)
/styles            → Tailwind styles and globals
.env               → Environment config for OAuth
```

---

## 🔒 Security Notice

This is a **demo application** meant for learning and reference purposes. Never expose secrets in public repositories. Use secure storage for sensitive values in production deployments.

---

## 📄 License

This project is licensed under the **MIT License**.