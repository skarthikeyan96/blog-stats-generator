# 📊 Blog Stats Generator

<div align="center">
  <img src="https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge" alt="License: MIT" />
</div>

<div align="center">
  <h3>🚀 Generate beautiful statistics cards for your blog posts across multiple platforms</h3>
  <p>Transform your blogging data into stunning, shareable visual cards with comprehensive analytics</p>
</div>

<div align="center">
  <a href="https://www.producthunt.com/posts/blog-stats-generator" target="_blank">
    <img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=blog-stats-generator&theme=light" alt="Blog Stats Generator - Generate beautiful blog statistics cards | Product Hunt" style="width: 250px; height: 54px;" width="250" height="54" />
  </a>
</div>

## 📖 About

**Blog Stats Generator** is an open-source web application that creates beautiful, shareable statistics cards from your blogging data. Perfect for content creators, developers, and bloggers who want to visualize their writing journey and showcase their achievements.

**Current Support**: Dev.to (Hashnode & Medium coming soon)

**Key Benefits**:

- 📊 Multi-platform blog analytics
- 🎨 Beautiful, customizable themes
- 📈 Comprehensive engagement insights
- 🔗 Easy GitHub README integration
- 📱 Fully responsive design

---

## ✨ Features

### 🎨 Themes & Customization

- **8 Beautiful Themes**: Default, Dark, Ocean Blue, Purple Dream, Forest Green, Sunset, Cyberpunk, Minimal Gray
- **SVG Cards**: Lightweight, scalable graphics with gradient backgrounds
- **Responsive Design**: Perfect on all devices

### 📊 Analytics & Data

- **Multi-Platform Support**: Dev.to (Hashnode & Medium coming soon)
- **Comprehensive Stats**: Articles, reactions, comments, views, engagement patterns
- **Year Filtering**: Generate stats for specific years
- **Tag Analysis**: Discover your most-used topics
- **Interactive Charts**: Monthly activity and tag distribution

### 🔧 Technical Features

- **RESTful API**: Clean endpoints with smart caching
- **Export Options**: SVG download and clipboard copy
- **Easy Integration**: README embedding with markdown/HTML
- **CSP Compliant**: Works with GitHub's security policies

---

## 🛠️ Quick Start

### Prerequisites

- **Node.js** (18.0+)
- **npm** or **yarn**

### Installation

```bash
# Clone and install
git clone https://github.com/yourusername/blog-stats-generator.git
cd blog-stats-generator
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 🐳 Docker (Optional)

```bash
docker build -t blog-stats-generator .
docker run -p 3000:3000 blog-stats-generator
```

---

## 🚀 Usage

### Basic Steps

1. **Select Platform**: Choose Dev.to (more platforms coming soon)
2. **Enter Username**: Your platform username (e.g., "ben")
3. **Choose Year**: Select year to analyze (2016-present)
4. **Generate**: Click to create your stats card

### API Integration

```bash
# Get user stats
GET /api/devto-stats?username=yourusername&year=2024

# Generate themed card
GET /api/stats-card?username=yourusername&year=2024&theme=dark
```

### Embed in README

```markdown
![Dev.to stats](https://your-domain.com/api/stats-card?username=yourusername&year=2024&theme=dark)
```

### Parameters

| Parameter  | Type   | Description       | Default      |
| ---------- | ------ | ----------------- | ------------ |
| `username` | string | Platform username | required     |
| `year`     | number | Year to analyze   | current year |
| `theme`    | string | Visual theme      | 'default'    |

---

## 🤝 Contributing

We welcome contributions! Here's how to get started:

### Quick Contribution Guide

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/amazing-feature`
3. **Make** your changes and add tests
4. **Commit** with clear messages: `git commit -m "feat: add amazing feature"`
5. **Push** and create a Pull Request

### Development Standards

- Use **TypeScript** for all new code
- Follow **ESLint** configuration
- Write **tests** for new features
- Update **documentation** as needed

### Ways to Contribute

- 🐛 **Bug Reports** - Found an issue? Let us know!
- 💡 **Feature Requests** - Have ideas? Share them!
- 📝 **Documentation** - Help improve our docs
- 💻 **Code** - Submit fixes and features

---

<div align="center">
  <a href="https://github.com/skarthikeyan96/blog-stats-generator">
    <img src="https://img.shields.io/github/stars/skarthikeyan96/blog-stats-generator?style=social" alt="GitHub stars" />
  </a>
  
  <a href="https://www.producthunt.com/posts/blog-stats-generator">
    <img src="https://img.shields.io/badge/Product%20Hunt-Upvote-orange?style=social&logo=producthunt" alt="Product Hunt" />
  </a>
  
  <a href="https://buymeacoffee.com/imkarthikeyan">
    <img src="https://img.shields.io/badge/Buy%20Me%20a%20Coffee-ffdd00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black" alt="Buy Me A Coffee" />
  </a>
  
  <br><br>
  <sub>MIT License • Built with <a href="https://nextjs.org">Next.js</a></sub>
</div>
