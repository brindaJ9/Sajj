# Sajj

**Your personal AI stylist.**

Sajj is an AI-powered fashion platform designed to make getting dressed simpler, more personalized, and more fun.

It combines your personal style, wardrobe, preferences, occasions, and context to help you discover outfits that actually feel like *you*.

## ✨ What is Sajj?

Choosing what to wear can be surprisingly difficult. Sajj aims to turn that decision into a simple, personalized experience.

Instead of endlessly scrolling through inspiration or wondering what goes together, Sajj helps you:

* 👗 Discover personalized outfit ideas
* 🧥 Organize and explore your wardrobe
* 🎨 Build a personal style profile
* 📅 Plan outfits ahead of time
* 🪞 Visualize how outfits could look on you
* 💾 Save outfits you love
* 🌤️ Get outfit suggestions based on context such as weather and occasion

## 🚀 Features

### Style Profile

Create a personalized style profile based on factors such as:

* Style preferences
* Body type
* Color palette
* Fit preferences
* Occasions
* Budget

This profile helps Sajj tailor recommendations to you.

### Wardrobe

Keep track of the clothes you own and use them as the foundation for personalized outfit recommendations.

### Style Me

Get outfit recommendations through two experiences:

**Style Now**

* Generate an outfit for right now
* Get recommendations from top to bottom
* Take factors such as weather and occasion into account

**Plan Ahead**

* Plan outfits for upcoming days
* Organize looks through a calendar

### Try It On

Visualize selected outfits through an AI-powered virtual try-on experience.

### Save & Personalize

Save outfits you like and provide feedback so the experience can become increasingly personalized.

## 🛠️ Tech Stack

**Frontend**

* Angular
* HTML
* CSS
* TypeScript

**AI / ML**

* Machine Learning
* Generative AI
* Computer Vision
* AI-powered recommendation systems

**Other Technologies**

* REST APIs
* Git & GitHub

> The technology stack is actively evolving as Sajj moves through development.

## 🏗️ Product Flow

```text
                    ┌─────────────┐
                    │     Sajj    │
                    └──────┬──────┘
                           │
             ┌─────────────┼─────────────┐
             │             │             │
          Home          Wardrobe      Style Me
                                         │
                              ┌──────────┴──────────┐
                              │                     │
                         Style Now              Plan Ahead
                              │                     │
                       Outfit Generation         Calendar
                              │
                       ┌──────┴──────┐
                       │             │
                     Save         Try It On
                       │
                       └──────┬──────┘
                              │
                           Feedback
                              │
                              └──────→ Personalized Experience
```

## 📂 Project Structure

```text
sajj/
├── src/
│   ├── app/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── ...
│   ├── assets/
│   └── ...
├── public/
├── package.json
└── README.md
```

## ⚙️ Getting Started

### Prerequisites

Make sure you have the following installed:

* Node.js
* npm
* Angular CLI

### Installation

Clone the repository:

```bash
git clone <repository-url>
```

Navigate into the project:

```bash
cd sajj
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
ng serve
```

Open your browser and visit:

```text
http://localhost:4200
```

## 🔐 Environment Variables

If the project uses API keys or other environment-specific configuration, keep them in local environment files and **do not commit secrets to GitHub**.

Use an example environment file when necessary:

```text
.env.example
```

Replace placeholder values with your local credentials before running the application.

## 🧪 Development

Sajj is currently under active development. Features, architecture, and integrations may change as the product evolves.

Contributions and experimentation are welcome during development.

## 🗺️ Roadmap

Some areas being explored for future versions include:

* [ ] Improved AI outfit recommendations
* [ ] Expanded wardrobe management
* [ ] More personalized style profiles
* [ ] Advanced virtual try-on
* [ ] Weather-aware recommendations
* [ ] Outfit planning and calendar improvements
* [ ] Smarter feedback and personalization loops
* [ ] Expanded fashion discovery

## 💡 Vision

Sajj is being built around a simple idea:

> **Getting dressed shouldn't feel like work.**

The goal is to create a fashion companion that understands your style, your wardrobe, and your everyday life — and helps you figure out **what to wear without the overthinking.**

---

### Status

**Sajj — Beta 🚧**

Built with ❤️ while exploring the intersection of **AI, fashion, personalization, and product design.**
