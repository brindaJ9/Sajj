# Style Selector Component - Visual Guide

## Component Hierarchy

```
┌─────────────────────────────────────────────────┐
│          STYLE GENRE                            │
│  What styles resonate with you?                 │
│  Select all that apply — this shapes...         │
├─────────────────────────────────────────────────┤
│                                                 │
│  ┌───────────────────┐  ┌───────────────────┐  │
│  │ 🤍  Minimalist    │  │ 🎩  Old Money     │  │
│  │ Clean lines...    │  │ Tailored...       │  │
│  │                 ○ │  │                 ○ │  │
│  └───────────────────┘  └───────────────────┘  │
│                                                 │
│  ┌───────────────────┐  ┌───────────────────┐  │
│  │ 🛹  Streetwear    │  │ 🌿  Bohemian      │  │
│  │ Bold, graphic...  │  │ Flowy, earthy...  │  │
│  │                 ◉ │  │                 ○ │  │
│  └───────────────────┘  └───────────────────┘  │
│              ▲                                  │
│              └─ Selected (filled circle)        │
│                                                 │
│  ┌───────────────────┐  ┌───────────────────┐  │
│  │ 🌸  Romantic      │  │ ⚡  Sporty        │  │
│  │ Soft textures...  │  │ Function meets... │  │
│  │                 ○ │  │                 ○ │  │
│  └───────────────────┘  └───────────────────┘  │
│                                                 │
│  ┌───────────────────┐                         │
│  │ 🖤  Edgy          │                         │
│  │ Dark, bold...     │                         │
│  │                 ○ │                         │
│  └───────────────────┘                         │
│                                                 │
├─────────────────────────────────────────────────┤
│     WHAT KIND OF STREETWEAR?                    │
│                                                 │
│  ┌─────────┐ ┌──────────┐ ┌──────────┐        │
│  │ Skater  │ │ Hip Hop  │ │ Techwear │        │
│  └─────────┘ └──────────┘ └──────────┘        │
│                                                 │
│  ┌───────────┐ ┌──────────────────┐            │
│  │ Oversized │ │ Sneaker Culture  │            │
│  └───────────┘ └──────────────────┘            │
│         ▲                                       │
│         └─ User can select multiple chips       │
└─────────────────────────────────────────────────┘
```

## Interaction Flow

### Step 1: Initial State
```
User sees: All 7 style cards
Traits section: Hidden (height: 0, opacity: 0)
Continue button: Disabled
```

### Step 2: User Selects Style
```
User clicks: "🛹 Streetwear" card
Animation: Traits section expands (400ms smooth)
Traits shown: Skater, Hip Hop, Techwear, Oversized, Sneaker Culture
State: selectedStyle = "streetwear", selectedTraits = []
Continue button: Enabled (style selected)
```

### Step 3: User Selects Traits
```
User clicks: "Skater" chip → becomes dark/filled
User clicks: "Oversized" chip → becomes dark/filled
State: selectedTraits = ["skater", "oversized"]
Event emitted: { style: "streetwear", traits: ["skater", "oversized"] }
```

### Step 4: User Changes Style
```
User clicks: "🌿 Bohemian" card
Animation: Streetwear traits collapse, Bohemian traits expand
Previous traits: Cleared
New traits shown: Festival Boho, Earthy Textures, etc.
State: selectedStyle = "bohemian", selectedTraits = []
```

## Visual States

### Style Card States

#### Unselected
```
Background: rgba(255, 255, 255, 0.7)
Border: 1.5px solid rgba(255, 255, 255, 0.8)
Indicator: Empty circle ○
Shadow: Subtle
```

#### Hover (Unselected)
```
Background: Same
Border: Slightly more visible
Transform: translateY(-2px)
Shadow: Increased
```

#### Selected
```
Background: Gradient with style color + white
Border: 2px solid [style-color]
Indicator: Filled circle ◉
Shadow: Ring effect with style color
```

### Trait Chip States

#### Unselected
```
Background: rgba(255, 255, 255, 0.6)
Border: 1.5px solid rgba(44, 31, 48, 0.12)
Color: rgba(44, 31, 48, 0.7)
```

#### Hover (Unselected)
```
Background: rgba(255, 255, 255, 0.85)
Border: More visible
Transform: translateY(-1px)
```

#### Selected
```
Background: var(--ink) [dark]
Border: var(--ink)
Color: #fff9f1 [light text]
```

## Animation Timeline

```
User clicks different style card:

0ms    ├─ Click detected
       │
50ms   ├─ Previous traits start collapsing
       │  └─ opacity: 1 → 0.8
       │
150ms  ├─ Previous traits continue collapsing
       │  └─ height: auto → 50%
       │  └─ opacity: 0.8 → 0.5
       │
250ms  ├─ Previous traits fully collapsed
       │  └─ height: 0
       │  └─ opacity: 0
       │
300ms  ├─ New traits start expanding
       │  └─ height: 0 → 30%
       │  └─ opacity: 0 → 0.3
       │
450ms  ├─ New traits continue expanding
       │  └─ height: 50% → 80%
       │  └─ opacity: 0.5 → 0.8
       │
650ms  ├─ New traits fully expanded
       │  └─ height: auto
       │  └─ opacity: 1
       │
       └─ Animation complete ✓
```

## Color System

Each style has a unique color that appears when selected:

```
Minimalist  → #E5E5E5 (Light Gray)
Old Money   → #D4B896 (Tan/Beige)
Streetwear  → #7B68A6 (Purple)
Bohemian    → #A8B896 (Sage Green)
Romantic    → #F5C5D4 (Soft Pink)
Sporty      → #FFD966 (Yellow)
Edgy        → #4A4A4A (Dark Gray)
```

The color is applied to:
- Card border when selected
- Card background gradient
- Subtle ring/glow effect around selected card

## Responsive Behavior

### Desktop (769px+)
```
Grid: 2 columns
Card: Full emoji + text
Font sizes: Large
Spacing: Comfortable
```

### Tablet (480-768px)
```
Grid: 2 columns
Card: Medium sizing
Font sizes: Medium
Spacing: Comfortable
```

### Mobile (<480px)
```
Grid: 1 column (stacked)
Card: Full width
Font sizes: Slightly smaller
Spacing: Compact
Touch targets: Optimized
```

## Data Flow

```
┌─────────────────┐
│ style-options   │
│ .data.ts        │
│                 │
│ [All 7 styles   │
│  with traits]   │
└────────┬────────┘
         │ imports
         ▼
┌─────────────────┐
│ style-selector  │
│ .component.ts   │
│                 │
│ • State (Signals)
│ • Logic          │
│ • Events         │
└────────┬────────┘
         │ renders
         ▼
┌─────────────────┐        ┌──────────────┐
│ style-selector  │        │ Parent       │
│ .component.html │◄───────┤ Component    │
│                 │ binds  │              │
│ • Cards         │        │ Receives     │
│ • Traits        │───────►│ events       │
│ • Animations    │ emits  └──────────────┘
└─────────────────┘
         │
         │ styles
         ▼
┌─────────────────┐
│ style-selector  │
│ .component.scss │
│                 │
│ • Glassmorphism │
│ • Animations    │
│ • Responsive    │
└─────────────────┘
```

## Event Structure

When user interacts:

```typescript
// Event emitted on any change:
{
  style: "streetwear",        // Selected style ID
  traits: [                    // Array of selected trait IDs
    "skater",
    "oversized"
  ]
}
```

Parent component receives this and can:
- Save to service
- Update form state
- Enable/disable navigation
- Show validation feedback

## Accessibility Features

```
Keyboard Navigation:
  Tab     → Move between style cards
  Enter   → Select style card
  Tab     → Move between trait chips
  Enter   → Toggle trait chip
  
Focus States:
  Cards   → 2px outline on focus-visible
  Chips   → 2px outline on focus-visible
  
Screen Readers:
  Cards   → Read as buttons with style name
  Chips   → Read as toggleable buttons
  Section → Proper heading hierarchy
```

---

This component combines modern Angular patterns, premium design, and excellent UX into a production-ready solution for your onboarding flow.
