# Whispr Clone

A beautiful, minimalist voice-to-text application built with Tauri, React, and TypeScript. Inspired by the elegant design of Whispr, this app provides a seamless experience for converting speech to text with a modern, dark-themed interface.

![Whispr Clone](https://img.shields.io/badge/version-0.1.0-blue)
![Tauri](https://img.shields.io/badge/Tauri-2.0-purple)
![React](https://img.shields.io/badge/React-19.1-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue)

## ✨ Features

- 🎙️ **Voice Recording** - Record audio with a beautiful, intuitive interface
- 📝 **Real-time Transcription** - Convert speech to text using advanced transcription
- 🎨 **Modern UI** - Beautiful, minimalist design with dark theme and gradient accents
- ⚡ **Fast & Lightweight** - Built with Tauri for native performance
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile
- 🌙 **Dark Theme** - Easy on the eyes with a sleek dark interface
- ✨ **Smooth Animations** - Polished interactions and transitions

## 🛠️ Tech Stack

### Frontend
- **React 19.1** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **CSS3** - Modern styling with gradients and animations

### Backend
- **Tauri 2.0** - Desktop app framework
- **Rust** - Backend logic and audio processing
- **Tokio** - Async runtime
- **Reqwest** - HTTP client for API calls

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **Rust** (latest stable) - [Install Rust](https://www.rust-lang.org/tools/install)
- **Tauri CLI** - Will be installed automatically via npm
- **System Dependencies**:
  - **Windows**: Microsoft Visual C++ Build Tools
  - **macOS**: Xcode Command Line Tools
  - **Linux**: `libwebkit2gtk-4.0-dev`, `build-essential`, `curl`, `wget`, `libssl-dev`, `libgtk-3-dev`, `libayatana-appindicator3-dev`, `librsvg2-dev`

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd whispr-clone
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

5. **Run Tauri development mode**
   ```bash
   npm run tauri dev
   ```

6. **Build Tauri app**
   ```bash
   npm run tauri build
   ```

## 📖 Usage

1. **Start the application** - Launch the app using `npm run tauri dev` or the built executable
2. **Record audio** - Click and hold the record button to start recording
3. **Stop recording** - Release the button to stop recording
4. **View transcription** - The transcribed text will appear in the display area automatically

### Recording Tips
- Hold the button down while speaking
- Release when finished to process the audio
- The app will automatically transcribe your speech

## 🏗️ Project Structure

```
whispr-clone/
├── src/                    # Frontend React source code
│   ├── components/         # React components
│   │   ├── VoiceRecorder.tsx
│   │   └── TranscriptionDisplay.tsx
│   ├── App.tsx            # Main app component
│   ├── App.css            # Global styles
│   └── main.tsx           # React entry point
├── src-tauri/             # Tauri backend (Rust)
│   ├── src/
│   │   ├── main.rs        # Tauri entry point
│   │   ├── lib.rs         # Main library
│   │   ├── audio.rs       # Audio processing
│   │   └── transcription.rs # Transcription logic
│   ├── Cargo.toml         # Rust dependencies
│   └── tauri.conf.json    # Tauri configuration
├── public/                # Static assets
├── index.html             # HTML entry point
├── package.json           # Node.js dependencies
├── vite.config.ts         # Vite configuration
└── README.md              # This file
```

## 🎨 Design Philosophy

This app follows a minimalist design philosophy inspired by Whispr:

- **Clean Interface** - Focus on essential features without clutter
- **Beautiful Gradients** - Modern purple/blue gradient accents
- **Smooth Animations** - Polished transitions and feedback
- **Dark Theme** - Comfortable for extended use
- **Intuitive UX** - Simple, straightforward interactions

## 🔧 Development

### Running in Development Mode

```bash
# Start the Vite dev server (web only)
npm run dev

# Start Tauri dev mode (desktop app)
npm run tauri dev
```

### Building

```bash
# Build web version
npm run build

# Build Tauri desktop app
npm run tauri build
```

### Code Structure

- **Components** are located in `src/components/`
- **Styles** are in `src/App.css` with CSS variables for theming
- **Backend logic** is in `src-tauri/src/`
- **Tauri commands** are defined in `src-tauri/src/lib.rs`

## 🐛 Troubleshooting

### Common Issues

**Issue**: Build fails on Windows
- **Solution**: Install Microsoft Visual C++ Build Tools

**Issue**: Audio recording not working
- **Solution**: Ensure microphone permissions are granted

**Issue**: Transcription not working
- **Solution**: Check that the transcription API/service is properly configured
