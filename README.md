# 🌟 NovaOS - Desktop Environment

A modern, fully-featured desktop operating system UI built with React, TypeScript, and Tailwind CSS. Features a complete window management system, 12 built-in applications, and a polished glass-morphism design.

![NovaOS](https://img.shields.io/badge/NovaOS-v2.1.0-blue)
![React](https://img.shields.io/badge/React-18.3-61dafb)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178c6)
![Tailwind](https://img.shields.io/badge/Tailwind-3.4-38bdf8)

## ✨ Features

### 🖥️ Desktop Environment
- **Boot Animation** - Smooth startup sequence with progress indicator
- **Lock Screen** - Beautiful lock screen with time display and user profile
- **Window Management** - Drag, resize, minimize, maximize, and close windows
- **Taskbar** - Quick launch, running apps, system tray, and clock
- **Start Menu** - App launcher with search and pinned apps
- **Notification Center** - Quick actions and notification panel
- **Context Menu** - Right-click menu for desktop actions
- **Desktop Widgets** - Clock and system info widgets
- **Multiple Wallpapers** - 5 different gradient wallpapers

### 📱 Built-in Applications (12 Apps)

1. **📁 Files** - File explorer with sidebar navigation and file operations
2. **💻 Terminal** - Fully functional terminal with 15+ commands
3. **📝 Text Editor** - Code/text editor with line numbers and syntax
4. **🧮 Calculator** - Full-featured calculator with history
5. **⚙️ Settings** - System settings with appearance, network, sound, and more
6. **🌐 Browser** - Web browser with tabs, bookmarks, and search
7. **🌤️ Weather** - Weather app with hourly and 7-day forecast
8. **🎵 Music** - Music player with playlist and controls
9. **🖼️ Photos** - Photo gallery with grid view and full-screen mode
10. **🏪 App Store** - App marketplace with categories and ratings
11. **✉️ Mail** - Email client with inbox, folders, and message view
12. **📅 Calendar** - Calendar with events and month view

### 🎨 Design Features
- Glass-morphism UI with backdrop blur effects
- Smooth animations and transitions
- Dark theme optimized for productivity
- Responsive and accessible interface
- Custom scrollbars and form controls
- Emoji-based icons for universal compatibility

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/novaos.git
cd novaos

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
# Build the project
npm run build

# Preview production build
npm run preview
```

## 🌐 Deploy to Vercel

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: NovaOS desktop environment"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/novaos.git
   git push -u origin main
   ```

2. **Deploy on Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Vite configuration
   - Click "Deploy"

### Option 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Deploy to production
vercel --prod
```

### Option 3: One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/novaos)

## 📁 Project Structure

```
novaos/
├── public/              # Static assets
├── src/
│   ├── apps/           # Application components
│   │   ├── AppStore.tsx
│   │   ├── Browser.tsx
│   │   ├── Calculator.tsx
│   │   ├── Calendar.tsx
│   │   ├── FileExplorer.tsx
│   │   ├── Mail.tsx
│   │   ├── MusicPlayer.tsx
│   │   ├── Photos.tsx
│   │   ├── Settings.tsx
│   │   ├── Terminal.tsx
│   │   ├── TextEditor.tsx
│   │   └── Weather.tsx
│   ├── components/     # UI components
│   │   ├── LockScreen.tsx
│   │   ├── NotificationPanel.tsx
│   │   ├── StartMenu.tsx
│   │   ├── Taskbar.tsx
│   │   └── Window.tsx
│   ├── hooks/          # Custom React hooks
│   │   └── useWindowManager.ts
│   ├── types.ts        # TypeScript definitions
│   ├── App.tsx         # Main app component
│   ├── main.tsx        # Entry point
│   └── index.css       # Global styles
├── index.html          # HTML template
├── package.json        # Dependencies
├── tailwind.config.js  # Tailwind configuration
├── tsconfig.json       # TypeScript configuration
├── vercel.json         # Vercel deployment config
└── vite.config.ts      # Vite configuration
```

## 🎮 Usage

### Desktop
- **Double-click** desktop icons to open apps
- **Right-click** desktop for context menu
- **Drag** window title bars to move windows
- **Resize** windows from bottom-right corner
- **Click** traffic light buttons (red/yellow/green) to close/minimize/maximize

### Taskbar
- **Click** 🌟 button to open Start Menu
- **Click** running apps to minimize/restore
- **Click** clock to view date
- **Click** 🔔 for notifications

### Start Menu
- **Search** for apps by typing
- **Click** pinned apps to launch
- **Click** "All apps" to see full list

### Terminal Commands
```
help      - Show available commands
ls        - List files
pwd       - Print working directory
cd        - Change directory
cat       - Display file contents
echo      - Print text
date      - Show current date
whoami    - Show current user
clear     - Clear terminal
neofetch  - System information
calc      - Calculator (e.g., calc 2+2)
cowsay    - ASCII cow message
```

## 🛠️ Tech Stack

- **React 18.3** - UI framework
- **TypeScript 5.6** - Type safety
- **Vite 6.4** - Build tool and dev server
- **Tailwind CSS 3.4** - Utility-first CSS
- **Font Awesome 6.4** - Icon library

## 🎨 Customization

### Change Wallpaper
Right-click desktop → "Change Wallpaper" to cycle through 5 gradient themes.

### Modify Apps
Edit `src/hooks/useWindowManager.ts` to add/remove apps from the system.

### Customize Theme
Modify colors in `src/index.css` and component files.

## 📝 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests
- Improve documentation

## 🙏 Acknowledgments

Inspired by modern desktop environments including macOS, Windows 11, and GNOME.

---

**Made with ❤️ using React & TypeScript**

For issues or questions, please open an issue on GitHub.
