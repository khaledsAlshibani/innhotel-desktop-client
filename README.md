<h1>InnHotel Desktop App</h1>

Desktop application built with Electron.js.

- [Quick Start](#quick-start)
  - [Development](#development)
  - [Building the Application](#building-the-application)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)

## Quick Start

### Development

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev:react    # Start React development server
npm run dev:electron # Start Electron app
```

### Building the Application

1. Build the React application:
```bash
npm run build
```

2. Create Windows executable:
```bash
npm run dist
```

The executable will be available in the `dist` folder:
- `dist/win-unpacked/innhotel-desktop-client.exe` (Portable version)
- `dist/innhotel-desktop-client Setup 0.0.0.exe` (Windows installer)

## Tech Stack

- **Electron.js** - Cross-platform desktop application framework
- **React** - UI library
- **Vite** - Build tool and development server
- **TypeScript** - Type-safe JavaScript

## Project Structure

```
innhotel-desktop-client/
├── src/
│   ├── electron/    # Electron main process
├── dist-react/      # Built React application
└── dist/            # Built Electron application
```