# Mezon Chat Widget - Release Notes

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2026-02-03

### 🏗️ **MAJOR ARCHITECTURE REFACTOR**

This release represents a complete architectural overhaul with new modular service-based design, improved dependency management, and enhanced developer experience.

### ✨ **New Features**

#### **Core Architecture Redesign**

-  **Service-Oriented Architecture**: Implemented new modular service layer with dependency injection
-  **MezonChatCore**: New orchestrator class for coordinating services and managing widget lifecycle
-  **Interface-Based Design**: Clean separation between service interfaces and implementations
-  **Improved Error Handling**: Enhanced error propagation and logging throughout the system

#### **New Service Layer**

-  **AuthService**: Dedicated OAuth authentication and session management service
-  **ChatService**: Real-time messaging service with improved message handling
-  **StorageService**: Session persistence service with localStorage integration
-  **LogService**: Configurable logging service with production mode support

#### **Enhanced OAuth Implementation**

-  **Improved OAuth Flow**: Better popup handling and message passing
-  **Enhanced Error Reporting**: Detailed OAuth error messages and debugging
-  **Session Validation**: Better token validation and refresh logic
-  **Callback Customization**: Support for custom OAuth and exchange callbacks

#### **Custom Color Utilities**

-  **Pure Color Functions**: Custom color manipulation utilities replacing external dependencies
-  **Hex Color Support**: Built-in hex color parsing, HSL conversion, and lightening/darkening
-  **Theme Processing**: Automatic light/dark detection for custom theme generation

### 🔧 Configuration Options

#### Required Attributes

-  `api-base-url`: Backend API base URL
-  `peer-id`: Target user ID for DM conversations

### 🔄 **BREAKING CHANGES**

#### **Dependency Management**

-  **Removed Dependencies**: Removed `colord@^2.9.3` and `js-base64@^3.7.8` direct dependencies
-  **Simplified Dependencies**: Now relies only on `mezon-light-sdk@^1.0.5` for runtime
-  **Bundle Size Reduction**: Smaller bundle size due to custom utilities replacing external libraries

#### **Internal API Changes**

-  **Service Interfaces**: New interface-based service architecture (internal breaking change)
-  **Session Management**: Replaced `SessionManager` utility with `StorageService`
-  **Color Utilities**: Replaced `colord` library with custom color manipulation functions
-  **Message Handling**: Updated message interface structure with enhanced typing

### 🛠️ **Improvements**

#### **Code Organization**

-  **Service Layer**: New `/src/services/` directory with modular service implementations
-  **Core Layer**: New `/src/core/` directory with main orchestration logic
-  **Utils Layer**: Enhanced `/src/utils/` with custom color manipulation utilities
-  **Interface Definitions**: Comprehensive TypeScript interfaces for all services

#### **Build & Development**

-  **Package Scripts**: Added `lint` and `typecheck` scripts for better development workflow
-  **Development Server**: Improved development setup with separate web and API servers
-  **Hot Reloading**: Enhanced development experience with automatic rebuilds

#### **Error Handling & Logging**

-  **Enhanced Logging**: Comprehensive logging throughout OAuth flow and message handling
-  **Better Error Messages**: More descriptive error messages with context
-  **Debug Support**: Configurable debug mode for development and production

### 📦 **Updated Dependencies**

#### **Runtime Dependencies**

-  `mezon-light-sdk@^1.0.5` (maintained)

#### **Development Dependencies**

-  `esbuild@^0.27.2` (maintained)

#### **Removed Dependencies**

-  `colord@^2.9.3` (replaced with custom utilities)
-  `js-base64@^3.7.8` (now handled by mezon-light-sdk)

### 🔧 **Configuration**

The configuration interface remains the same for backward compatibility:

```html
<mezon-chat
   api-base-url="https://api.example.com"
   peer-id="user123"
   save-session="true"
>
</mezon-chat>
```

### 🚨 **Migration Notes**

This release maintains **backward compatibility** for public APIs:

#### **✅ Still Working (No Changes Required)**

-  HTML attribute configuration
-  Web Component API (`open()`, `close()`, `startDM()`, etc.)
-  OAuth flow and endpoint configuration
-  Theme system and customization
-  Event callbacks and handlers

#### **⚠️ Internal Changes (May Affect Advanced Usage)**

-  Service implementations have been refactored (affects direct service usage)
-  Session storage format updated (sessions will be regenerated on first load)
-  Color utility functions moved to custom implementation

### 📁 **Updated Project Structure**

```
src/
├── core/                    # 🆕 Core orchestration layer
│   ├── MezonChatCore.ts    # Main widget coordinator
│   └── index.ts            # Core exports
├── services/               # 🆕 Service layer
│   ├── AuthService.ts      # OAuth and session management
│   ├── ChatService.ts      # Real-time messaging
│   ├── StorageService.ts   # Session persistence
│   ├── LogService.ts       # Logging utilities
│   ├── interfaces.ts       # Service contracts
│   └── index.ts           # Service exports
├── components/            # UI components
├── utils/                 # Enhanced utilities
│   ├── color.ts          # 🆕 Custom color manipulation
│   ├── Hex.ts            # Color validation utilities
│   └── SessionManager.ts # ❌ Removed (replaced by StorageService)
├── types/                # TypeScript definitions
└── MezonChatElement.ts   # Web Component entry point
```

### 🐛 **Bug Fixes**

-  **OAuth Error Handling**: Improved error messages and debugging for OAuth failures
-  **Session Restoration**: Better handling of expired sessions and token refresh
-  **Message Parsing**: Enhanced message content extraction from various formats
-  **Connection Stability**: Improved socket connection handling and reconnection logic

### 📈 **Performance Improvements**

-  **Bundle Size**: Reduced bundle size by removing external color manipulation library
-  **Memory Usage**: Optimized service instantiation and cleanup
-  **Network Efficiency**: Better handling of socket connections and message passing

### 🧪 **Development Experience**

-  **Enhanced Logging**: Detailed logging throughout OAuth and messaging flows
-  **Better Debug Info**: More informative console messages for troubleshooting
-  **Improved Types**: Enhanced TypeScript definitions for better IDE support
-  **Development Tools**: Added linting and type checking scripts

### 🚀 **Installation & Usage**

#### Script Tag (CDN)

```html
<script src="path/to/mezon-chat-widget.min.js"></script>
<mezon-chat
   api-base-url="https://api.example.com"
   peer-id="user123"
   save-session="true"
>
</mezon-chat>
```

#### NPM Installation

```bash
npm install mezon-chat-widget
```

#### ES Module Import

```javascript
import 'mezon-chat-widget';
```

### 🔮 **Future Roadmap**

-  **File Attachments**: Support for file and image sharing
-  **Offline Support**: Message queuing and offline indicators
-  **Advanced Theming**: More theme customization options
-  **Performance Metrics**: Built-in performance monitoring
-  **Mobile Optimization**: Enhanced mobile responsiveness

### 📄 **License**

MIT License - see LICENSE file for details.

---

**Full Changelog**: https://github.com/mezon/mezon-js/compare/v1.0.0...v1.1.0
