# Planning Guide

An enchanted forest-themed virtual invitation for Sofía's coming-of-age birthday celebration featuring an elegant, whimsical design with countdown timer, RSVP, gift registry, photo sharing, and event details.

**Experience Qualities**:
1. **Enchanting** - The invitation should evoke the magical feeling of walking through an enchanted forest with delicate animations and mystical design elements
2. **Elegant** - Refined typography and sophisticated color palette that balances whimsy with maturity, appropriate for a coming-of-age celebration
3. **Welcoming** - Warm, inviting interface that makes guests feel excited to participate and share in the celebration

**Complexity Level**: Light Application (multiple features with basic state)
This is a single-page application with multiple interactive sections including countdown, RSVP form, photo upload, location map, and gift registry links - all with basic state management for user interactions.

## Essential Features

**Countdown Timer**
- Functionality: Live countdown displaying days, hours, minutes, and seconds until June 6, 2026 (UTC-3)
- Purpose: Build anticipation and remind guests of the upcoming celebration
- Trigger: Automatically starts on page load
- Progression: Page load → Calculate time difference → Display animated counters → Update every second
- Success criteria: Accurate countdown that updates in real-time and handles timezone correctly

**Hero Section with Honoree Introduction**
- Functionality: Beautiful header with Sofía's name, celebration title, and date
- Purpose: Immediately communicate the event and set the enchanted forest tone
- Trigger: Visible on page load
- Progression: Page load → Animated fade-in of name and details
- Success criteria: Clear, elegant presentation with smooth entrance animations

**Event Details Section**
- Functionality: Display date, time, dress code, and other important celebration information
- Purpose: Provide guests with essential event information
- Trigger: Scroll to section or click navigation
- Progression: Section visible → Display all event details with icons
- Success criteria: All information is clear, readable, and properly formatted

**Location & Map**
- Functionality: Display venue address with embedded interactive map
- Purpose: Help guests find the venue easily
- Trigger: Scroll to section
- Progression: Section visible → Show address → Display map embed or coordinates
- Success criteria: Clear address display with visual map reference

**RSVP Form**
- Functionality: Guest confirmation form with name, attendance status, number of guests, and optional message
- Purpose: Allow guests to confirm attendance and provide guest count
- Trigger: User clicks RSVP button or scrolls to section
- Progression: Open form → Fill fields → Submit → Show confirmation message → Store in state
- Success criteria: Form validates input, stores responses, and shows clear confirmation

**Photo Upload Gallery**
- Functionality: Allow guests to upload and view photos from the celebration
- Purpose: Create a shared memory collection from all attendees
- Trigger: Click "Share Photos" section
- Progression: Click upload button → Select image → Upload → Display in gallery grid → Store in state
- Success criteria: Images display in responsive grid, upload feedback is clear

**Gift Registry / Digital Gifts**
- Functionality: Display payment methods and contact information for sending digital gifts
- Purpose: Provide convenient way for guests to send monetary gifts
- Trigger: Scroll to gifts section
- Progression: Section visible → Display payment options with copy buttons → Click copies to clipboard
- Success criteria: Payment information is clearly displayed with easy copy functionality

**Spotify Playlist Integration**
- Functionality: Embedded Spotify playlist for the party
- Purpose: Share music vibe and allow guests to listen ahead of time
- Trigger: Scroll to music section
- Progression: Section visible → Display embedded Spotify player
- Success criteria: Playlist plays correctly and is responsive

**Navigation Menu**
- Functionality: Sticky or hamburger navigation to jump between sections
- Purpose: Easy navigation through the single-page invitation
- Trigger: Always visible or toggle button click
- Progression: Click navigation item → Smooth scroll to section
- Success criteria: Smooth scrolling, clear active states, mobile-friendly

## Edge Case Handling

- **Countdown Complete**: Display "The celebration has arrived!" message once countdown reaches zero
- **Photo Upload Limits**: Show error message if image is too large or wrong format
- **Form Validation**: Prevent submission with empty required fields, show inline validation errors
- **Network Failures**: Display friendly error messages for failed uploads/submissions with retry option
- **Mobile Menu**: Hamburger menu for small screens with smooth open/close transitions
- **Long Guest Messages**: Truncate or scroll long RSVP messages in admin view
- **Timezone Display**: Clearly indicate UTC-3 timezone for the event

## Design Direction

The design should evoke an enchanted forest realm - mysterious yet inviting, with deep forest greens, soft glow effects, and delicate botanical elements. The aesthetic should feel like a fairy tale brought to life for a sophisticated young adult, balancing whimsy with elegance through refined typography and subtle magical touches like gentle animations and nature-inspired patterns.

## Color Selection

An enchanted forest palette with deep greens, earthy moss tones, and golden accents that feel magical without being childish.

- **Primary Color**: Deep Forest Green (oklch(0.45 0.08 155)) - Rich, mystical green that anchors the enchanted forest theme
- **Secondary Colors**: Soft Moss (oklch(0.72 0.06 145)) for backgrounds, creating depth and natural layering
- **Accent Color**: Warm Gold (oklch(0.75 0.12 85)) - Magical shimmer for CTAs, highlights, and important elements that catch the eye like fireflies
- **Foreground/Background Pairings**: 
  - Background (Soft Cream oklch(0.97 0.01 85)): Deep Forest Green text (oklch(0.35 0.08 155)) - Ratio 8.2:1 ✓
  - Primary (Deep Forest Green oklch(0.45 0.08 155)): White text (oklch(1 0 0)) - Ratio 5.8:1 ✓
  - Accent (Warm Gold oklch(0.75 0.12 85)): Deep Forest text (oklch(0.25 0.06 155)) - Ratio 6.1:1 ✓
  - Card backgrounds (Light Sage oklch(0.92 0.02 145)): Forest text (oklch(0.35 0.08 155)) - Ratio 9.5:1 ✓

## Font Selection

Typography should blend elegance with organic, handcrafted warmth - a refined serif for Sofia's name and headings that feels timeless and sophisticated, paired with a clean, modern sans-serif for body text that ensures readability.

- **Primary Font**: Playfair Display (serif) for the name, headings, and elegant moments
- **Secondary Font**: Inter or Outfit (sans-serif) for body text, labels, and UI elements
- **Typographic Hierarchy**: 
  - H1 (Sofía's Name): Playfair Display / 56px / 700 weight / tight line-height / letter-spacing -0.02em
  - H2 (Section Headings): Playfair Display / 36px / 600 weight / 1.2 line-height
  - H3 (Subsections): Outfit / 24px / 600 weight / 1.3 line-height
  - Body: Outfit / 16px / 400 weight / 1.6 line-height
  - Labels/Small: Outfit / 14px / 500 weight / 1.4 line-height
  - Countdown Numbers: Playfair Display / 48px / 700 weight

## Animations

Animations create an immersive magical forest experience throughout the page:

- **Sparkle Text Effect**: Sofía's name appears with sparkles/destellos converging from random positions to form each letter, accompanied by a golden glow
- **Floating Flowers**: Decorative flowers placed throughout the viewport that gently float and close their petals as the user scrolls down, creating an enchanting reveal effect
- **Flying Butterflies**: Small animated butterflies with natural flight patterns (curved paths, rotation) flying continuously across the screen
- **Magic Particles**: Tiny golden/accent colored particles that rise from bottom to top with fade and scale animations, creating ambient magical atmosphere
- **Smooth Transitions**: All scroll-triggered effects use smooth easing, entrance animations use fade + scale, countdown numbers update smoothly
- **Performance**: Effects use framer-motion for optimized animations, all animations respect reduced-motion preferences

## Component Selection

- **Components**: 
  - Card: For event details, RSVP form, and content sections with subtle shadow and rounded corners
  - Button: Primary (gold accent), Secondary (outline forest green) for CTAs and actions
  - Input, Textarea, Label: For RSVP form with custom forest theme
  - Dialog: For photo upload and RSVP confirmation modals
  - Separator: Delicate dividers between sections with nature-inspired styling
  - Badge: For event date, dress code tags
  - Scroll Area: For photo gallery and long content sections
  - Toast (Sonner): For success/error feedback with custom styling
  
- **Customizations**: 
  - Custom hero section with animated text and forest background pattern
  - Custom countdown timer component with flip animation
  - Photo gallery grid with masonry-style layout
  - Floating navigation with blur backdrop
  - Custom Spotify embed styling to match theme
  
- **States**: 
  - Buttons: Default (gold with glow), Hover (brighter glow + scale), Active (pressed), Disabled (muted)
  - Inputs: Default (subtle border), Focus (gold ring glow), Error (warm red), Success (forest green)
  - Cards: Default (soft shadow), Hover (lift + stronger shadow)
  
- **Icon Selection**: 
  - Calendar for date/time
  - MapPin for location
  - Gift for registry
  - Camera/Image for photo section
  - Music/MusicNotes for playlist
  - Envelope/EnvelopeSi for RSVP
  - Heart for decorative elements
  - Clock for countdown
  
- **Spacing**: 
  - Section padding: py-20 (mobile: py-12)
  - Card padding: p-8 (mobile: p-6)
  - Element gaps: gap-8 (mobile: gap-6)
  - Button padding: px-8 py-4
  - Consistent 8px grid system throughout
  
- **Mobile**: 
  - Mobile-first design with breakpoints at 640px, 768px, 1024px
  - Hamburger menu below 768px
  - Stack countdown timer vertically on mobile
  - Single column layout for cards and content
  - Touch-friendly button sizes (min 44x44px)
  - Optimized typography scale for small screens
  - Gallery switches to 2 columns on mobile, 3+ on desktop
