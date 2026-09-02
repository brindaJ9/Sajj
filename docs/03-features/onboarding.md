# Onboarding Feature Documentation

## Overview

The Sajj onboarding experience is a personalized style discovery journey that helps users identify their unique fashion archetype through an interactive 6-question survey. The system combines user preferences, style traits, and behavioral data to create a tailored style profile that powers personalized recommendations throughout the platform.

---

## Table of Contents

1. [Feature Goals](#feature-goals)
2. [User Journey](#user-journey)
3. [Technical Architecture](#technical-architecture)
4. [Survey Questions](#survey-questions)
5. [Style Archetypes](#style-archetypes)
6. [Data Model](#data-model)
7. [Components](#components)
8. [User Experience](#user-experience)
9. [Analytics & Tracking](#analytics--tracking)
10. [Future Enhancements](#future-enhancements)

---

## Feature Goals

### Primary Goals
- **Personalization**: Capture user style preferences to enable personalized product recommendations
- **Engagement**: Create an enjoyable, visually appealing first-time user experience
- **Data Collection**: Gather structured data on user style preferences, occasions, fit preferences, and color palettes
- **Archetype Assignment**: Categorize users into one of 8 style archetypes for targeted curation

### Success Metrics
- **Completion Rate**: >85% of users who start the survey complete all 6 questions
- **Time to Complete**: Average 60-90 seconds
- **Accuracy**: >80% of users agree with their assigned archetype
- **Return Rate**: Users who complete onboarding have 3x higher return rate within 7 days

---

## User Journey

### Entry Points
1. **First-time User**: Automatically redirected to `/onboarding/survey` after account creation
2. **Returning User**: Can retake survey from profile settings or results page
3. **Direct Link**: Survey can be accessed via deep link for marketing campaigns

### Flow Diagram
```
Start
  ↓
Entry Point (Account Creation / Profile Settings)
  ↓
Step 1: Style Genre Selection (Single-select with traits)
  ↓
Step 2: Occasions (Multi-select)
  ↓
Step 3: Styling Challenge (Single-select)
  ↓
Step 4: Color Palette (Single-select with visual swatches)
  ↓
Step 5: Fit Preference (Single-select)
  ↓
Step 6: Adventure Level (Slider 0-100)
  ↓
Data Processing & Archetype Determination
  ↓
Results Page (/onboarding/results)
  ↓
Exit Points:
  - Explore StyleSculpt → Dashboard
  - Retake Quiz → Return to Step 1
```

---

## Technical Architecture

### Tech Stack
- **Framework**: Angular 21+ (Standalone Components)
- **State Management**: Angular Signals
- **Routing**: Angular Router with lazy loading
- **Animations**: Angular Animations API
- **Styling**: SCSS with CSS Variables
- **Type Safety**: TypeScript (Strict Mode)

### Module Structure
```
src/app/features/onboarding/
├── survey/
│   ├── components/
│   │   ├── style-selector/         # Step 1: Style genre + traits
│   │   ├── question-card/          # Steps 2-6: Reusable question component
│   │   ├── progress-bar/           # Visual progress indicator
│   │   └── survey-navigation/      # Back/Continue buttons
│   ├── pages/
│   │   ├── survey-page/            # Main survey container
│   │   └── results-page/           # Archetype reveal page
│   ├── data/
│   │   ├── style-options.data.ts   # 8 style genres with traits
│   │   ├── color-palettes.data.ts  # 7 color palettes with hex values
│   │   ├── archetypes.data.ts      # 8 style archetypes with full profiles
│   │   └── questions.ts            # Questions 2-6 definitions
│   ├── models/
│   │   ├── quiz-result.model.ts    # Survey result interface
│   │   ├── question.model.ts       # Question structure
│   │   └── style-profile.model.ts  # User style profile
│   ├── services/
│   │   └── survey.service.ts       # Survey data management
│   └── styles/
│       └── survey-shared.scss      # Shared style mixins
└── onboarding.routes.ts            # Route definitions
```

### Routing Configuration
```typescript
Routes:
- /onboarding/survey   → Survey Page (6-step questionnaire)
- /onboarding/results  → Results Page (Archetype reveal)
```

---

## Survey Questions

### Question 1: Style Genre
**Type**: Single-select with expandable traits  
**Component**: `StyleSelectorComponent` (custom)  
**Purpose**: Identify primary style archetype  

**Options** (8):
1. 🤍 **Minimalist** - Clean lines, quiet luxury
2. 🎩 **Old Money** - Tailored, understated
3. 🛹 **Streetwear** - Bold, graphic, layered
4. 🌸 **Romantic** - Soft textures, florals
5. ⚡ **Sporty** - Function meets form
6. 🕰️ **Vintage** - Era-inspired pieces
7. 🖤 **Edgy** - Dark, bold, statement
8. 💎 **Chic** - Polished, sophisticated

**Traits** (5 per style):
- Each style has 5 sub-traits that expand after selection
- Users can select multiple traits (multi-select chips)
- Example (Romantic): Cottagecore, Victorian, French Romance, Lace & Details, Pastels

**UX Features**:
- Animated gradient background on selection
- Smooth expand/collapse of trait section
- Trait chips with hover states
- Previous traits auto-clear when switching styles

---

### Question 2: Occasions
**Type**: Multi-select  
**Component**: `QuestionCard`  
**Purpose**: Understand primary use cases for styling  

**Options** (9):
- College
- Office
- Casual Outings
- Travel
- Gym
- Parties
- Date Nights
- Traditional Events
- Weddings

**Selection Logic**: Users can select all that apply (no limit)

---

### Question 3: Styling Challenge
**Type**: Single-select  
**Component**: `QuestionCard`  
**Purpose**: Identify user's pain point to provide targeted solutions  

**Options** (6):
1. I don't know what matches
2. I keep wearing the same outfits
3. I'm still figuring out my personal style
4. Shopping feels overwhelming
5. I don't make the most of the clothes I own
6. I struggle to dress for different occasions

---

### Question 4: Color Palette
**Type**: Single-select with visual swatches  
**Component**: `QuestionCard` (enhanced)  
**Purpose**: Determine color preferences for recommendations  

**Options** (7):
1. **Monochrome**: `#111111, #3A3A3A, #707070, #B8B8B8, #E8E8E8`
2. **Earth Tones**: `#4A3728, #76583F, #9A8062, #C5AD8A, #E4D5BD`
3. **Neutral Colors**: `#F3EEE7, #D8D0C5, #B8AEA1, #8A8075, #514B45`
4. **Soft Pastels**: `#F4DDE3, #DCCEE8, #C9DCE5, #DDE8D5, #F3E5C8`
5. **Warm Autumn**: `#8C3F2F, #B4613E, #C88A52, #D1A65A, #6B4A38`
6. **Cool Blues**: `#DCEAF2, #AFCBDA, #7199B0, #416A82, #263F52`
7. **Bold & Vibrant**: `#E63946, #F4A261, #F6C945, #2A9D8F, #4361EE`

**Visual Enhancement**: Each option displays 5 circular color swatches (12px × 12px)

---

### Question 5: Fit Preference
**Type**: Single-select  
**Component**: `QuestionCard`  
**Purpose**: Determine preferred silhouette for product filtering  

**Options** (5):
- Oversized
- Relaxed
- Regular Fit
- Tailored
- Slim Fit

---

### Question 6: Adventure Level
**Type**: Slider (0-100)  
**Component**: `QuestionCard`  
**Purpose**: Measure openness to trying new styles  

**Scale**:
- 0-34: Safe (Conservative, stick to what I know)
- 35-66: Balanced (Mix of tried-and-true with occasional risks)
- 67-100: Adventurous (Love experimenting, trend-forward)

**UI**: Gradient slider (Indigo → Ibis → Paris colors)

---

## Style Archetypes

### Archetype Determination Logic

```typescript
Primary Factor: Question 1 (Style Genre) - 80% weight
Secondary Factors:
- Occasions (Q2) - 10% weight
- Color Palette (Q4) - 5% weight
- Adventure Level (Q6) - 5% weight
```

### The 8 Archetypes

#### 1. 🤍 The Minimalist
**Tagline**: "Curated for your clean aesthetic"  
**Description**: Your aesthetic is like a breath of fresh air — simple, intentional, and beautifully understated. Clean lines, neutral tones, and quality over quantity define your wardrobe.  
**Traits**: Clean lines, Capsule wardrobe, Quality basics, Neutral tones, Timeless pieces  
**Brands**: COS, Everlane, Uniqlo, ARKET  
**Starter Wardrobe**:
- Top: White silk blouse or black turtleneck
- Bottom: Tailored trousers or straight-leg jeans
- Layer: Structured blazer or wool coat
- Shoe: Leather loafers or minimal sneakers
- Bag: Structured tote or crossbody

---

#### 2. ✨ The Classic (Old Money)
**Tagline**: "Timeless picks, just for you"  
**Description**: Your style whispers elegance — refined, polished, and effortlessly sophisticated. You gravitate toward tailored pieces, classic silhouettes, and an air of understated luxury.  
**Traits**: Quiet luxury, Tailored fits, Classic silhouettes, Timeless elegance, Investment pieces  
**Brands**: Ralph Lauren, J.Crew, Massimo Dutti, Reiss  
**Starter Wardrobe**:
- Top: Cashmere sweater or silk shirt
- Bottom: Pleated trousers or midi skirt
- Layer: Trench coat or blazer
- Shoe: Ballet flats or oxford shoes
- Bag: Leather satchel or structured handbag

---

#### 3. 🔥 The Trendsetter (Streetwear)
**Tagline**: "Fresh drops & bold picks ahead"  
**Description**: Your style is bold, graphic, and unapologetically cool. You love mixing high and low, layering statement pieces, and staying ahead of the curve.  
**Traits**: Bold graphics, Layered looks, Sneaker culture, Oversized fits, Statement pieces  
**Brands**: Nike, Stüssy, Carhartt WIP, The North Face  
**Starter Wardrobe**:
- Top: Graphic tee or hoodie
- Bottom: Cargo pants or relaxed jeans
- Layer: Bomber jacket or oversized flannel
- Shoe: High-top sneakers or chunky trainers
- Bag: Crossbody bag or backpack

---

#### 4. 🌸 The Romantic
**Tagline**: "Dreamy finds await"  
**Description**: Your aesthetic is like a beautiful poem — gentle, layered, and full of feeling. Florals, soft fabrics, and delicate details are your language.  
**Traits**: Florals always, Soft color lover, Delicate details, Feminine silhouettes, Dreamy dresser  
**Brands**: LoveShackFancy, Zimmermann, & Other Stories, Sister Jane  
**Starter Wardrobe**:
- Top: Floral or lace-trim blouse
- Bottom: Midi floral skirt or wide-leg pants
- Layer: Pastel cropped cardigan
- Shoe: Mary Janes or strappy heels
- Bag: Embroidered or floral mini bag

---

#### 5. ⚡ The Athleisure Lover (Sporty)
**Tagline**: "Function meets form"  
**Description**: Your style is active, comfortable, and effortlessly put-together. You blur the lines between gym and street, prioritizing pieces that move with you.  
**Traits**: Athleisure, Performance fabrics, Comfortable fits, Sporty chic, Active lifestyle  
**Brands**: Lululemon, Alo Yoga, Outdoor Voices, Nike  
**Starter Wardrobe**:
- Top: Sports bra or performance tee
- Bottom: Leggings or joggers
- Layer: Zip-up hoodie or windbreaker
- Shoe: Running sneakers or slip-on trainers
- Bag: Gym tote or belt bag

---

#### 6. 🕰️ The Time Traveler (Vintage)
**Tagline**: "Vintage vibes & timeless style"  
**Description**: Your style draws from the past — nostalgic, unique, and full of character. You love era-inspired pieces and one-of-a-kind finds.  
**Traits**: Retro-inspired, Thrifted finds, Era aesthetics, Unique pieces, Nostalgic charm  
**Brands**: Urban Outfitters, Reformation, Free People, Beyond Retro  
**Starter Wardrobe**:
- Top: Vintage band tee or retro blouse
- Bottom: High-waisted jeans or slip skirt
- Layer: Leather jacket or denim vest
- Shoe: Platform boots or Mary Janes
- Bag: Vintage shoulder bag or mini backpack

---

#### 7. 🖤 The Rebel (Edgy)
**Tagline**: "Dark, bold, statement"  
**Description**: Your style is fearless, dark, and unapologetically bold. You love pushing boundaries, mixing textures, and making statements.  
**Traits**: Dark aesthetics, Bold statements, Mixed textures, Avant-garde, Rule breaker  
**Brands**: AllSaints, ZARA, Dr. Martens, Acne Studios  
**Starter Wardrobe**:
- Top: Black turtleneck or band tee
- Bottom: Leather pants or distressed jeans
- Layer: Leather jacket or long coat
- Shoe: Combat boots or chunky platforms
- Bag: Chain bag or leather crossbody

---

#### 8. 💎 The Effortless Icon (Chic)
**Tagline**: "Polished, sophisticated, timeless"  
**Description**: Your style is polished yet effortless — sophisticated, modern, and always put-together. You have an eye for elevated basics and refined details.  
**Traits**: Parisian flair, Modern classic, Effortless elegance, Power dressing, Minimalist chic  
**Brands**: Mango, Sézane, & Other Stories, Ganni  
**Starter Wardrobe**:
- Top: Silk camisole or fitted knit
- Bottom: High-waisted trousers or pencil skirt
- Layer: Tailored blazer or trench coat
- Shoe: Pointed-toe heels or loafers
- Bag: Structured handbag or clutch

---

## Data Model

### QuizResult Interface
```typescript
interface QuizResult {
  archetype: string;              // Determined archetype ID
  style_vibe: string;             // Selected style genre
  style_traits: string[];         // Selected trait IDs
  occasions?: string[];           // Selected occasion IDs
  challenge?: string;             // Selected challenge ID
  color_palette?: string;         // Selected palette ID
  fit_vibe?: string;              // Selected fit preference
  adventure_level?: number;       // Slider value (0-100)
}
```

### StyleArchetype Interface
```typescript
interface StyleArchetype {
  id: string;
  name: string;
  emoji: string;
  tagline: string;
  description: string;
  traits: string[];
  brands: string[];
  wardrobe: {
    top: string;
    bottom: string;
    layer: string;
    shoe: string;
    bag: string;
  };
}
```

### ColorPalette Interface
```typescript
interface ColorPalette {
  id: string;
  label: string;
  colors: string[];  // Array of 5 hex values
}
```

---

## Components

### StyleSelectorComponent
**Purpose**: Custom component for Step 1 (Style Genre selection)  
**Features**:
- 8 style cards in 2×4 grid
- Animated gradient selection
- Expandable trait section (5 traits per style)
- Multi-select trait chips
- Smooth expand/collapse animations
- Single-select style enforcement

**State Management**: Angular Signals
```typescript
selectedStyle: Signal<string | null>
selectedTraits: Signal<Set<string>>
```

---

### QuestionCard Component
**Purpose**: Reusable component for Steps 2-6  
**Features**:
- Supports 3 question types: single-select, multi-select, slider
- Gradient selection effect (matching Step 1)
- Circular radio bubbles (not checkmarks)
- Color palette visual swatches
- Staggered card animations
- Responsive grid layout

**Input**: `Question` object
**Output**: `selectedOption` event with answer value

---

### ProgressBar Component
**Purpose**: Visual progress indicator  
**Features**:
- Displays current step / total steps
- Gradient fill bar animation
- Smooth width transitions

---

### ResultsPage Component
**Purpose**: Archetype reveal and summary  
**Features**:
- Animated archetype badge with spinning gradient
- Personalized description
- Trait chips display
- Color palette swatches
- Brand recommendations
- Starter wardrobe list
- CTA: "Explore StyleSculpt" button
- "Retake quiz" link

---

## User Experience

### Design Principles
1. **Delight First**: Every interaction should feel smooth, premium, and intentional
2. **Progressive Disclosure**: Show information gradually to avoid overwhelming users
3. **Visual Feedback**: Immediate visual response to all user actions
4. **Consistency**: Same interaction patterns throughout (gradient selection, bubbles, animations)
5. **Accessibility**: Keyboard navigation, focus states, reduced motion support

### Visual Design
- **Typography**: 
  - Headings: Fraunces (serif, elegant)
  - Body: Inter (sans-serif, clean)
- **Colors**: 
  - CSS Variables: `--ink`, `--paris`, `--mauve`, `--ibis`, `--indigo`
  - Selection gradient: Pink/yellow blend
- **Spacing**: 
  - Card padding: 44px desktop, 28px mobile
  - Gap between cards: 12px
- **Border Radius**: 
  - Cards: 16px
  - Chips/bubbles: 99px (pill shape)
  - Badge: 50% (circle)

### Animations
1. **Card Entrance**: Staggered fade-in with translateY
2. **Selection**: Gradient background fade-in (0.28s)
3. **Trait Expand**: Height animation (0.4s cubic-bezier)
4. **Progress Bar**: Width transition (0.6s ease)
5. **Results Badge**: Rotate animation (12s infinite)

---

## Analytics & Tracking

### Events to Track
1. **survey_started**: User enters survey page
2. **question_answered**: 
   - Properties: `question_id`, `answer_value`, `time_spent`
3. **question_changed**: User goes back to previous question
4. **survey_completed**: User reaches results page
   - Properties: `archetype`, `completion_time`, `all_answers`
5. **survey_abandoned**: User exits before completion
   - Properties: `last_question`, `time_spent`
6. **archetype_shared**: User shares results (future)
7. **retake_clicked**: User clicks "Retake quiz"
8. **explore_clicked**: User clicks "Explore StyleSculpt"

### Key Metrics
- **Completion Rate** = (Completed / Started) × 100
- **Average Time to Complete** = Median completion time
- **Drop-off Rate by Question** = Abandons at each step
- **Archetype Distribution** = % of users in each archetype
- **Retake Rate** = % of completions that are retakes

---

## Future Enhancements

### Phase 2: Enhanced Personalization
- [ ] Machine learning archetype refinement based on behavior
- [ ] A/B test different question orders
- [ ] Dynamic question routing (skip irrelevant questions)
- [ ] Save progress (resume later)

### Phase 3: Social Features
- [ ] Share results to social media
- [ ] Compare archetypes with friends
- [ ] Archetype compatibility scores
- [ ] Community: "Others like you also loved..."

### Phase 4: Advanced Features
- [ ] Photo upload: Analyze existing wardrobe
- [ ] Virtual try-on integration
- [ ] Seasonal archetype updates
- [ ] Style evolution tracking over time
- [ ] Email capture with PDF results
- [ ] Multi-language support

### Phase 5: Integration
- [ ] Connect to product recommendation engine
- [ ] Link to outfit generator
- [ ] Integrate with shopping cart (pre-fill based on archetype)
- [ ] Supabase persistence for user profiles
- [ ] Analytics dashboard for admin

---

## Technical Considerations

### Performance
- Lazy loading for survey and results pages
- Optimized animations (GPU-accelerated)
- Image optimization for any future visual assets
- Bundle size: Survey module < 150KB

### Accessibility
- WCAG 2.1 AA compliant
- Keyboard navigation support
- Screen reader friendly
- Focus trap in modals/overlays
- `prefers-reduced-motion` support

### Browser Support
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile: iOS 14+, Android 10+

### State Persistence
- In-memory (SurveyService) for current session
- Future: LocalStorage for draft saves
- Future: Supabase for cross-device sync

---

## Maintenance

### Code Owners
- Frontend: [@team-frontend]
- Design: [@team-design]
- Product: [@team-product]

### Testing Strategy
- **Unit Tests**: Component logic, data transformations
- **Integration Tests**: Question flow, navigation, data persistence
- **E2E Tests**: Complete survey flow, all question types, results page
- **Visual Regression**: Screenshot comparison for UI consistency

### Deployment
- Feature flag: `onboarding.survey.enabled`
- Gradual rollout: 10% → 50% → 100%
- Monitoring: Track completion rates, errors, performance

---

## Changelog

### v1.0.0 (Current)
- ✅ 6-question survey with 8 archetypes
- ✅ Custom style selector with traits
- ✅ Visual color palette swatches
- ✅ Gradient selection effect
- ✅ Results page with personalized archetype
- ✅ Responsive design (mobile + desktop)
- ✅ Angular Signals state management
- ✅ Shared SCSS mixins for consistency

### Future Versions
- v1.1.0: Analytics integration
- v1.2.0: Save progress functionality
- v2.0.0: AI-powered archetype refinement

---

## Support & Resources

- **Figma Design**: [Link to design files]
- **API Documentation**: [Link to API docs]
- **Component Storybook**: [Link to Storybook]
- **Analytics Dashboard**: [Link to analytics]

---

**Last Updated**: 2026-09-02  
**Document Version**: 1.0  
**Status**: ✅ Production Ready
