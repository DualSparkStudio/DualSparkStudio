# DualSparkStudio Website - Theme & Color Palette

## 🎨 Color Palette

### Primary Colors

#### Primary (Cyan/Turquoise)
- **Dark Mode**: `hsl(174, 100%, 70%)` → `#64ffda` (bright cyan)
- **Light Mode**: `hsl(174, 100%, 39%)`
- **Usage**: Accents, highlights, CTAs, focus states, and brand identity

#### Accent (Pink/Red)
- **Dark Mode**: `hsl(351, 100%, 65%)` → `#ff4d5a` (coral pink)
- **Light Mode**: `hsl(351, 100%, 55%)`
- **Usage**: Secondary accents, attention-grabbing elements, and gradient effects

### Background Colors

#### Dark Background
- **Main Background**: `hsl(222.2, 84%, 4.9%)` → Very dark blue-navy
- **Gradient Background**: Linear gradient from:
  - `#020C1B` (darkest)
  - `#0A192F` (mid)
  - `#090E1A` (lightest)
- **Effect**: Creates a night sky atmosphere

#### Light Background
- **Main Background**: `hsl(210, 40%, 98%)` → Off-white
- **Usage**: Light mode alternative

### Neutral Colors

#### Foreground (Text)
- **Dark Mode**: `hsl(210, 40%, 98%)` → Off-white
- **Light Mode**: `hsl(222.2, 84%, 4.9%)` → Dark navy

#### Secondary
- **Dark Mode**: `hsl(216, 34%, 17%)` → Dark slate blue
- **Light Mode**: `hsl(210, 40%, 96.1%)` → Light gray
- **Usage**: Secondary backgrounds, cards, inputs

#### Muted
- **Background**: `hsl(216, 34%, 17%)`
- **Foreground**: `hsl(215, 20.2%, 65.1%)` → Medium gray
- **Usage**: Disabled states, subtle text

### UI Element Colors

| Element | Dark Mode | Light Mode |
|---------|-----------|------------|
| Border | `hsl(216, 34%, 17%)` | `hsl(214.3, 31.8%, 91.4%)` |
| Input | `hsl(216, 34%, 17%)` | `hsl(214.3, 31.8%, 91.4%)` |
| Ring (Focus) | `hsl(174, 100%, 70%)` | `hsl(174, 100%, 39%)` |
| Card | `hsl(222.2, 84%, 4.9%)` | `hsl(210, 40%, 98%)` |
| Destructive | `hsl(0, 62.8%, 30.6%)` | `hsl(0, 84.2%, 60.2%)` |

### Chart Colors
- **Chart 1**: `hsl(var(--chart-1))`
- **Chart 2**: `hsl(var(--chart-2))`
- **Chart 3**: `hsl(var(--chart-3))`
- **Chart 4**: `hsl(var(--chart-4))`
- **Chart 5**: `hsl(var(--chart-5))`

## 🎭 Theme Style

### Visual Theme
- **Primary Mode**: Dark mode (default)
- **Secondary Mode**: Light mode (optional)
- **Aesthetic**: Space/Tech with futuristic elements
- **Atmosphere**: Night sky, stars, particles, and interactive 3D effects

### Design System

#### Glassmorphism
```css
background: rgba(10, 25, 47, 0.25);
backdrop-filter: blur(10px);
-webkit-backdrop-filter: blur(10px);
border: 1px solid rgba(255, 255, 255, 0.05);
```

#### Gradient Text
```css
background-image: linear-gradient(90deg, hsl(var(--primary)), hsl(var(--accent)));
background-clip: text;
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
```

### Typography

#### Font Family
- **Primary Font**: Inter (sans-serif)
- **Weights**: 400 (regular), 700 (bold)

#### Headings (h1-h6)
- **Font Weight**: 700 (bold)
- **Letter Spacing**: -0.025em
- **Style**: Modern, clean, slightly compressed

#### Body Text (p)
- **Line Height**: 1.7
- **Style**: Readable and spacious

### Border Radius
- **Large**: `var(--radius)` = `0.5rem` (8px)
- **Medium**: `calc(var(--radius) - 2px)` = `0.375rem` (6px)
- **Small**: `calc(var(--radius) - 4px)` = `0.25rem` (4px)

## ✨ Interactive Effects

### Animations

#### Fade In
```css
animation: fadeIn 0.5s ease-in-out forwards;
```

#### Slide Up
```css
animation: slideUp 0.7s ease-out forwards;
```

#### Accordion
- **Accordion Down**: 0.2s ease-out
- **Accordion Up**: 0.2s ease-out

### Hover Effects

#### Button Hover
- **Transform**: `translateY(-2px)`
- **Shadow**: `0 10px 20px rgba(0, 0, 0, 0.1)`
- **Transition**: `0.3s cubic-bezier(0.17, 0.67, 0.83, 0.67)`
- **Shine Effect**: Gradient sweep on hover

#### Gradient Border Animation
```css
animation: borderGradient 3s ease infinite;
background: linear-gradient(90deg, primary, accent, primary);
background-size: 200% 200%;
```

### Scrollbar Customization
- **Width**: 10px
- **Track**: Background color
- **Thumb**: Muted color
- **Thumb Hover**: Primary color (cyan)

## 🌌 3D Elements

### Particle System
- **Count**: 800 particles
- **Colors**: Gradient between cyan (`#64ffda`) and pink (`#ff4d5a`)
- **Animation**: Sine wave movements with shader effects
- **Blending**: Additive for glow effect

### Lighting
- **Ambient Light**: Intensity 0.2
- **Directional Light**: Intensity 1.0, white color
- **Point Light**: Intensity 0.8, cyan color (`#64ffda`)

### Stars
- **Count**: 1500
- **Radius**: 100
- **Depth**: 50
- **Effect**: Twinkling stars with fade

### Shooting Stars
- **Count**: 30
- **Area**: 100
- **Speed**: 40
- **Frequency**: 0.1

## 📊 Color Usage Summary

| Purpose | Color Name | HSL Value | Hex Code |
|---------|------------|-----------|----------|
| Primary/Brand | Cyan | `174, 100%, 70%` | `#64ffda` |
| Accent/CTA | Coral Pink | `351, 100%, 65%` | `#ff4d5a` |
| Background | Deep Navy | `222.2, 84%, 4.9%` | `#0B1221` |
| Text | Off-white | `210, 40%, 98%` | `#F8FAFC` |
| Muted/Secondary | Slate Blue | `216, 34%, 17%` | `#1C2A3E` |
| Border | Dark Slate | `216, 34%, 17%` | `#1C2A3E` |

## 🎯 Design Philosophy

The overall aesthetic is a **futuristic, space-themed dark interface** with:
- Vibrant cyan and pink accents
- Modern tech/digital agency feel
- Interactive 3D elements
- Smooth, performance-optimized animations
- Glassmorphism for depth and sophistication
- GPU-accelerated effects for smooth performance

## 🔧 Technical Implementation

### CSS Variables Location
All color variables are defined in `client/src/index.css` under the `:root` selector.

### Tailwind Configuration
Extended color system and animations configured in `tailwind.config.ts`.

### 3D Scene Configuration
Three.js scene setup in `client/src/App.tsx` with:
- Performance optimizations
- Shader-based particle system
- Post-processing effects (Bloom)
- Adaptive DPR for quality/performance balance

## 📱 Responsive Considerations

- Smooth scrolling with padding for fixed header (80px)
- Touch-action optimization for canvas elements
- Performance monitoring for mobile devices
- Reduced particle counts for better performance
- GPU acceleration hints (`transform: translateZ(0)`)

