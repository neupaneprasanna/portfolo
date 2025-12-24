# Prasanna Neupane Portfolio Website

## Overview
A modern, advanced personal portfolio website for Prasanna Neupane - a Grade 12 high school student, frontend developer, and artist. The website features unique scrolling effects, advanced animations, a beautiful dark theme design, an art gallery showcasing digital and traditional artwork, and an immersive separate Friends page with 3D entrance animations.

## Project Structure
```
/
├── index.html              # Main portfolio HTML
├── friends.html            # Immersive friends page with 3D animations
├── css/
│   ├── style.css           # Main portfolio styles
│   └── friends.css         # Friends page with 3D effects and old paper texture
├── js/
│   ├── main.js             # Portfolio scroll effects and interactivity
│   └── friends.js          # Friends page interactions and card shuffling
├── assets/
│   └── images/             # Personal photos
├── server.py               # Python HTTP server
└── replit.md               # Documentation
```

## Recent Updates (December 2025)
- Added friend photos support to friends page with `image` paths in friendsData array
- Implemented completely redesigned mobile UI/UX for friends page (768px and below)
- Mobile friends section now features: grid card layout (2 cols on tablets, 1 col on phones), simple white theme, fixed navbar with search bar, no animations, clean photo-first cards
- Desktop friends page experience remains unchanged with all 3D effects and scattered cards
- Sandesh Rai friend photo added to `assets/images/sandesh.jpg`

## Features

### Main Portfolio (index.html)
- **Light/Dark Mode Toggle**: Switch between light and dark themes (preference saved)
- **Animated Navigation Bar**: Multi-gradient underlines, smooth transitions, active states
- **Hero Section**: "Frontend Developer & Artist" title with animated text and curved organic bordered photo
- **About Section**: Updated with artistic skills, 6 skill bars (HTML5, CSS3, JavaScript, React, Digital Drawing, Traditional Drawing, Illustration & Concept Art), info cards including art skills
- **Art Gallery Section**: Interactive gallery with 6 artwork pieces featuring:
  - Filter buttons (All, Digital, Traditional, Concept Art)
  - Smooth hover effects with animated overlays
  - Category-based filtering
  - Beautiful grid layout responsive to all devices
- **Personal Questions**: Accordion FAQ updated to mention both development and artistic passion
- **Message Form**: FormSubmit.co powered contact (no backend required)
- **Contact Section**: Social links and contact info
- **Visitor Counter**: 3D sphere with interactive chase mechanics
- **Unique Scroll Effects**: Advanced GSAP ScrollTrigger animations

### Friends Page (friends.html)
- **Separate Immersive Experience**: Unique website-like experience just for friends
- **Wavering Background**: Smooth flowing wave animations
- **Theatrical Curtain Effect**: Curtains open from middle on page load or click
- **Card Deck Mechanics**: Wooden deck box with interactive click-to-shuffle
- **15 Old Paper Cards**: Vintage, torn, antique-looking cards with:
  - Realistic paper texture with fiber patterns
  - Torn/damaged edges and stains
  - Old paper coloring (#d4af9c beige/cream)
  - Shadow and depth effects
- **3D Shuffle Animation**: Cards fly down from deck and shuffle with 3D transforms
- **Smooth Navigation**: Back button to return to portfolio
- **Responsive Design**: Works beautifully on all devices

## Technologies Used
- **HTML5**: Semantic markup for both portfolio and friends pages
- **CSS3**: Advanced 3D transforms, animations, flexbox, grid, perspective
- **JavaScript (ES6+)**: Event handling, state management, dynamic card generation
- **GSAP**: ScrollTrigger animations on main portfolio
- **3D CSS**: perspective, rotateY, rotateX, scaleX for card effects
- **Google Fonts**: Poppins (modern), Playfair Display (elegant)
- **Font Awesome**: Icons throughout portfolio
- **Animations**: Curtain open, card shuffle, wave flow, particle bursts

## Friends Page Guide

### How It Works:
1. **Video Intro**: Plays curtain opening video (6-second video recommended)
2. **Table Background**: Wooden table texture displays after video ends
3. **Scattered Cards**: 15 friend cards scattered randomly on the table in different angles (like throwing cards on a table)
4. **3D Overlap**: Cards overlap each other with realistic 3D rotations and stacking
5. **Click to View**: Click any card to see full image and complete description in modal

### How to Add Your Curtain Opening Video:
1. Create or find a curtain opening video (6-10 seconds recommended)
2. Convert to MP4 format if needed
3. Upload to `assets/videos/folder (you may need to create this folder)
4. Name the file `curtain-opening.mp4`
5. The video will auto-play when users visit the friends page
6. After the video ends, the table with scattered cards appears automatically

**Video Requirements:**
- Format: MP4 (.mp4)
- Duration: 6-10 seconds
- Resolution: 1920x1080 or 1280x720 recommended
- File size: Keep under 10MB for fast loading
- Content: Smooth curtain opening effect

**If no video is uploaded:** The page has a 6-second auto-fallback - cards will appear automatically after 6 seconds

### Customizing Friends:
Edit the `friendsData` array in `js/friends.js`:
```javascript
const friendsData = [
    { name: "Your Friend Name", role: "Relationship", description: "Write about your friend here..." },
    // ... more friends
];
```

### Table Design Features:
- **Wooden table texture** with realistic grain patterns
- **Scattered card layout** with random angles (-20 to +20 degrees rotation)
- **3D card positioning** with realistic depth and overlapping
- **Natural stacking order** - cards appear to be casually thrown
- **Click any card** to open modal showing image placeholder and full description
- **Close modal** by clicking the X button, outside the modal, or pressing ESC

## How to Add Your Photos

### Background Photo
Replace the placeholder URL in `css/style.css`:
```css
.background-image {
    background: url('YOUR_BLURRED_PHOTO_URL') center/cover no-repeat;
}
```

### Hero Section Photo
To add your full-size photo to the hero section:
1. Upload your image to `assets/images/` (e.g., `my-photo.jpg`)
2. In `index.html`, find the hero section and replace the `src` attribute:
```html
<img src="assets/images/my-photo.jpg" alt="Prasanna" class="hero-image-placeholder">
```
3. The photo displays in a fixed area (550px × 700px) with the full image visible - NO CROPPING!

**Photo Frame Details:**
- **Fixed Size:** 550px width × 700px height
- **Display Mode:** Full image visible (no cropping, no distortion)
- **Background:** Subtle purple background fills empty space if photo doesn't fill entire frame
- **Recommended Photo Size:** Portrait format (taller than wide) works best
- **File Size:** Keep photos between 300-800px for optimal quality

### About Section Photo
To add your photo to the About section:
1. Upload your image to `assets/images/` (e.g., `my-photo.jpg`)
2. In `index.html`, find the about section and replace the `src` attribute:
```html
<img src="assets/images/my-photo.jpg" alt="Prasanna" class="about-image-placeholder">
```
3. Same as hero section - full image visible, no cropping!

**Photo Frame Details:**
- **Fixed Size:** 550px width × ~733px height (3:4 aspect ratio)
- **Display Mode:** Full image visible (no cropping, no distortion)
- **Mobile Size:** 320px width (auto-scales height)
- **Background:** Subtle purple background fills empty space if needed

### Friend Cards
Edit the friend cards in `index.html` to add:
- Friend names
- Descriptions about each friend
- Photo URLs
- Social media links

## Art Gallery Customization

### Adding Your Artwork:
The Art Gallery section displays 8 pieces organized by 4 stunning categories. To customize:

1. **Update Gallery Images**: Replace placeholder URLs in `index.html` with your artwork:
```html
<img src="your-artwork-url.jpg" alt="Artwork Title">
```

2. **Edit Artwork Descriptions**: Modify the overlay text:
```html
<h3>Your Art Title</h3>
<p>Your artwork description</p>
```

3. **Manage Categories**: Use data-category attribute to organize by type:
   - `portrait` - Portrait and character studies
   - `ongoing` - Works in progress and daily sketches
   - `anime` - Anime-style artwork and character designs
   - `nature` - Landscape, flora, and wildlife studies

### Gallery Features:
- **Advanced 3D Animations**: Items spring in with rotating 3D entrance (itemSpringIn)
- **Interactive Filters**: Sleek filter buttons with smooth color fill animation
- **3D Hover Effects**: Cards tilt and scale with rotateY/rotateX transforms
- **Playful Content Animation**: Title text bounces and slides up on hover (contentBounce)
- **Image Enhancement**: Images zoom 1.25x with brightness/saturation boost on hover
- **Smooth Transitions**: All animations use playful cubic-bezier easing (0.34, 1.56, 0.64, 1)
- **Responsive Grid**: Adapts from 3 columns on desktop to 1 on mobile
- **Backdrop Blur**: Overlay applies smooth 8px blur effect on hover
- **Gradient Overlays**: Purple-tinted gradient overlays with glowing shadow effects

### 3D Animation Details:
- **Spring-In Animation**: Items scale from 0.5 with 90deg X rotation, bouncing to full size
- **Grid Fade-In**: Entire gallery fades in with blur transition
- **Filter Slide-In**: Filter buttons slide down with playful bounce
- **Hover Tilt**: Items rotate on Y and X axes for depth perception
- **Mobile Optimized**: Touch devices show simplified 1.02x scale effect for performance

## General Customization
- Edit content in `index.html`
- Modify colors in CSS variables at the top of `style.css`
- Adjust animations in `js/main.js`

## Running the Website
The website runs on port 5000 using a Python HTTP server.

## Preloader Animation
The loading screen features a beautifully coordinated center-focused design:
- **3D Rotating Cube**: Interactive cube with "P" on all six faces (280px, 200px, 120px orbits)
- **Orbiting Rings**: Three concentric rings rotating at different speeds in Crimson, Gold, and Cyan with glowing effects
- **Center-Stage Design**: Cube and rings perfectly centered and overlaid for maximum visual impact
- **Animated Particles**: Colorful symbols (✦, ◆, ✧, •) bursting outward from the center
- **Gradient Background**: Beautiful dark purple gradient (dark mode) / soft pastel gradient (light mode)
- **Progress Bar**: Animated gradient progress indicator with glowing effect
- **Loading Text**: Smooth fading "Loading your portfolio..." message
- **Professional Coordination**: All effects work together harmoniously with the best visuals highlighted in the center

## Visitor Counter Section
A complete, playful visitor tracking feature with stunning 3D sphere animation and space background:

**3D Sphere Design:**
- **Space Background**: Deep space gradient with animated twinkling stars floating across the sphere
- **3D Floating Sphere**: Beautiful gradient sphere (Purple to Cyan) with "P" letter and glowing effects
- **Orbiting Rings**: Three concentric rings rotating in different directions and speeds
  - Ring 1: Purple (#6633ff) - 6s rotation speed
  - Ring 2: Gold - 8s reverse rotation speed
  - Ring 3: Cyan - 5s rotation speed
- **Glowing Effects**: Radial gradient glow that pulses and breathes
- **Floating Animation**: Sphere smoothly floats up and down with scale effect
- **Inset Shadow**: 3D depth effect with inset shadows and highlights

**Interactive Features:**
- **Click Burst**: 12-particle burst effect in all directions when clicked
- **Hover Effects**: Sphere floats faster on hover (3s to 1.5s)
- **Chaseable Mechanic**: Sphere runs away when cursor gets within 150px - playable escape game!
- **Smart Movement**: Calculates direction and smoothly animates away from cursor
- **Elastic Return**: Bounces back to center with fun elastic animation when mouse moves away
- **Celebration Particles**: Stars and sparkles burst out when counter button clicked
- **Pulse Effect**: Sphere pulses on interaction for visual feedback

**Live Features:**
- **Animated Counter**: Smooth number increment animation when page loads
- **Interactive Button**: Shows ordinal visitor number (1st, 2nd, 3rd, etc.)
- **Live CountAPI Integration**: Uses `api.countapi.xyz` for real-time visitor tracking
- **Live Statistics**: Footer updates with visitor count in real-time

**Responsive Design:**
- Fully optimized for mobile and desktop
- Beautiful animations on all devices
- Scales perfectly on all screen sizes

**Customization:**
- Unique counter ID: `prasanna-portfolio-2024/visits`
- Can be changed in `js/main.js` in the fetch URL
- Colors follow your Crimson & Gold & Cyan theme

## Navigation Structure

### Main Portfolio (index.html)
- Home → Hero section with call-to-action
- About → Personal info, skills, experience
- Friends → Links to friends.html (separate immersive page)
- Personal Questions → FAQ and contact form
- Visitors → Interactive 3D counter
- Contact → Social links and contact info

### Friends Page (friends.html)
- Completely separate experience with unique design
- Back button returns to main portfolio
- No direct navigation to other portfolio sections (intentional separation)
- Standalone immersive friend showcase

## Mobile Optimization

### Main Portfolio
- Animations optimized for low-end devices (max-width: 768px)
- Background animations disabled on mobile
- Cursor effects hidden
- Hover effects simplified
- Particle count reduced

### Friends Page
- Responsive card sizing (220px on tablets, full-width on mobile)
- Curtain animations work smoothly on all devices
- Card text scales appropriately
- Touch-friendly deck box size

**Result:** Fast loading on low-end devices with full visual experience on desktop.
