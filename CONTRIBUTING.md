# Contributing to NovaOS

Thank you for your interest in contributing to NovaOS! This document provides guidelines and information for contributors.

## 🚀 Getting Started

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/YOUR_USERNAME/novaos.git
   cd novaos
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create a branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## 💻 Development

Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## 📝 Code Style

- Use TypeScript for all new files
- Follow existing code patterns and conventions
- Use functional components with React hooks
- Keep components focused and modular
- Write meaningful commit messages

## 🎨 Adding New Apps

To add a new application:

1. Create a new file in `src/apps/YourApp.tsx`
2. Add the app definition in `src/hooks/useWindowManager.ts`:
   ```typescript
   { id: 'yourapp', name: 'Your App', icon: '🎯', color: '#hex', defaultWidth: 600, defaultHeight: 450 }
   ```
3. Add the app component in `src/App.tsx` switch statement
4. Optionally add to desktop icons or start menu

## 🐛 Reporting Bugs

When reporting bugs, please include:
- Clear description of the issue
- Steps to reproduce
- Expected vs actual behavior
- Browser and OS information
- Screenshots if applicable

## ✨ Feature Requests

We welcome feature requests! Please:
- Check existing issues first
- Provide clear use case
- Describe expected behavior
- Consider implementation complexity

## 📤 Pull Requests

1. Ensure your code builds without errors:
   ```bash
   npm run build
   ```
2. Test your changes thoroughly
3. Update documentation if needed
4. Submit PR with clear description
5. Link related issues

## 🎯 Areas for Contribution

- New applications
- UI/UX improvements
- Performance optimizations
- Accessibility enhancements
- Bug fixes
- Documentation improvements
- New themes/wallpapers

## 📋 Code Review Process

- All PRs require review before merging
- Automated checks must pass
- Follow project coding standards
- Be responsive to feedback

## 🤝 Community Guidelines

- Be respectful and inclusive
- Provide constructive feedback
- Help others learn and grow
- Follow the code of conduct

## 📞 Getting Help

- Check existing documentation
- Search open/closed issues
- Ask questions in discussions
- Reach out to maintainers

Thank you for contributing to NovaOS! 🌟
