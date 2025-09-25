// Client-side constants and presets based on actual training dataset

// Categorized presets for better organization
export const PRESET_CATEGORIES = {
  "Tech & Futuristic": [
    "holographic_ui", "quantum_interface", "blade_runner",
    "minority_report", "star_wars_hologram", "tron_grid"
  ],
  "Retro & Nostalgia": [
    "geocities_1999", "gameboy_retro", "retro_arcade",
    "retro_terminal", "vaporwave"
  ],
  "Pop Culture": [
    "cyberpunk_2077", "matrix_digital", "marvel_comics",
    "studio_ghibli", "tim_burton", "rick_morty", "harry_potter"
  ],
  "Gaming": [
    "fortnite", "mario_kingdom", "animal_crossing",
    "overwatch", "sonic_speed", "tetris", "zelda_ancient"
  ],
  "Materials": [
    "lego_brick", "paper_cut", "clay_3d",
    "liquid_metal", "playdoh"
  ],
  "Artistic Styles": [
    "brutalist", "art_deco", "memphis", "warhol_pop",
    "banksy", "basquiat", "japanese_ukiyoe", "nordic_minimal"
  ],
  "Cultural": [
    "aztec", "egyptian"
  ],
  "Entertainment": [
    "netflix_ui", "spotify", "tiktok", "twitch", "disney"
  ],
  "Positioning": [
    "seasonal", "premium_device", "real_world", "artistic_install",
    "floating_effect", "product_present", "social_media"
  ],
  "Add Components": [
    "add_floating_chat", "add_dark_mode", "add_social_proof",
    "add_cookie_banner", "add_progress_bars", "add_animations",
    "add_notifications", "add_search"
  ],
  "Create Pages": [
    "create_login", "create_dashboard", "create_pricing",
    "create_profile", "create_hero", "create_blog",
    "create_checkout", "create_404"
  ],
  "Replace Elements": [
    "replace_logo_tech", "replace_logo_vintage", "replace_logo_minimal",
    "replace_bg_gradient", "replace_bg_ghibli", "replace_bg_pattern", "replace_bg_particles"
  ],
  "Typography": [
    "change_font_modern", "change_font_serif", "change_font_mono",
    "change_font_handwritten", "change_font_display"
  ],
  "Color Schemes": [
    "change_colors_dark", "change_colors_pastel", "change_colors_neon",
    "change_colors_mono", "change_colors_earth"
  ],
  "Enhancements": [
    "enhance_hover", "enhance_forms", "enhance_navigation",
    "enhance_accessibility", "enhance_performance"
  ]
};

export const TRANSFORMATION_PRESETS = {
  // Tech & Futuristic Theme
  holographic_ui: {
    display_name: "Holographic UI",
    positive_prompt: "Transform this webpage to holographic_ui aesthetic with translucent interfaces, floating panels, gesture controls, and glowing cyan/blue overlays. Maintain the original layout while applying the tech_futuristic theme comprehensively.",
    category: "Tech & Futuristic",
    cfg: 1.0,
    guidance: 5.0,
  },
  quantum_interface: {
    display_name: "Quantum Interface",
    positive_prompt: "Restyle this webpage to quantum_interface aesthetic featuring particle effects, quantum entanglement visualizations, probabilistic UI elements, and wave function animations. Maintain the original layout while applying the tech_futuristic theme comprehensively.",
    category: "Tech & Futuristic",
    cfg: 1.0,
    guidance: 5.0,
  },
  blade_runner: {
    display_name: "Blade Runner",
    positive_prompt: "Transform this webpage to blade_runner_dystopia aesthetic with neon-lit interfaces, rain effects, retrofuturistic terminals, amber and cyan color schemes, and noir atmospheric lighting. Maintain the original layout while applying the tech_futuristic theme comprehensively.",
    category: "Tech & Futuristic",
    cfg: 1.0,
    guidance: 5.0,
  },
  minority_report: {
    display_name: "Minority Report",
    positive_prompt: "Convert this webpage to minority_report_gesture aesthetic featuring transparent screens, hand gesture interactions, predictive interface elements, and floating data visualizations. Maintain the original layout while applying the tech_futuristic theme comprehensively.",
    category: "Tech & Futuristic",
    cfg: 1.0,
    guidance: 5.0,
  },
  star_wars_hologram: {
    display_name: "Star Wars Hologram",
    positive_prompt: "Change this webpage to star_wars_hologram aesthetic with blue holographic projections, scan lines, flickering effects, and futuristic terminal interfaces. Maintain the original layout while applying the tech_futuristic theme comprehensively.",
    category: "Tech & Futuristic",
    cfg: 1.0,
    guidance: 5.0,
  },
  tron_grid: {
    display_name: "Tron Grid",
    positive_prompt: "Apply this webpage to tron_legacy_grid aesthetic featuring glowing circuit patterns, neon orange and cyan lines, dark backgrounds with light trails, and geometric grid layouts. Maintain the original layout while applying the tech_futuristic theme comprehensively.",
    category: "Tech & Futuristic",
    cfg: 1.0,
    guidance: 5.0,
  },

  // Retro & Nostalgia Theme
  geocities_1999: {
    display_name: "GeoCities 1999",
    positive_prompt: "Change this webpage to geocities_1999 aesthetic with animated GIFs, visitor counters, under construction signs, starry backgrounds, marquee text, and web 1.0 design elements. Maintain the original layout while applying the retro_nostalgia theme comprehensively.",
    category: "Retro & Nostalgia",
    cfg: 1.0,
    guidance: 5.0,
  },
  gameboy_retro: {
    display_name: "GameBoy Classic",
    positive_prompt: "Transform this webpage to gameboy_dot_matrix aesthetic featuring green monochrome display, pixel art elements, 8-bit graphics, dot matrix patterns, and retro LCD screen effects. Maintain the original layout while applying the retro_nostalgia theme comprehensively.",
    category: "Retro & Nostalgia",
    cfg: 1.0,
    guidance: 5.0,
  },
  retro_arcade: {
    display_name: "Retro Arcade",
    positive_prompt: "Convert this webpage to retro_arcade aesthetic with neon signage, arcade cabinet designs, pixel art sprites, scan lines, CRT monitor effects, and 80s arcade color palettes. Maintain the original layout while applying the retro_nostalgia theme comprehensively.",
    category: "Retro & Nostalgia",
    cfg: 1.0,
    guidance: 5.0,
  },
  retro_terminal: {
    display_name: "Retro Terminal",
    positive_prompt: "Redesign this webpage to retro_terminal aesthetic featuring green phosphor text, command line interfaces, ASCII art, terminal fonts, and vintage computer monitor effects. Maintain the original layout while applying the retro_nostalgia theme comprehensively.",
    category: "Retro & Nostalgia",
    cfg: 1.0,
    guidance: 5.0,
  },
  vaporwave: {
    display_name: "Vaporwave",
    positive_prompt: "Redesign this webpage to retro vaporwave style with pink and purple neon gradients, 80s computer graphics, glitch effects, palm trees, geometric shapes, and sunset aesthetics. Maintain the original layout while applying the artistic theme comprehensively.",
    category: "Retro & Nostalgia",
    cfg: 1.0,
    guidance: 5.0,
  },

  // Pop Culture Theme
  cyberpunk_2077: {
    display_name: "Cyberpunk 2077",
    positive_prompt: "Convert this webpage to cyberpunk_2077 aesthetic with neon yellow accents, glitch effects, high-tech low-life elements, holographic advertisements, and dystopian UI overlays. Maintain the original layout while applying the pop_culture theme comprehensively.",
    category: "Pop Culture",
    cfg: 1.0,
    guidance: 5.0,
  },
  matrix_digital: {
    display_name: "The Matrix",
    positive_prompt: "Transform this webpage to matrix_digital aesthetic featuring falling green code rain, terminal-style interfaces, digital glitch effects, and monochrome green color schemes. Maintain the original layout while applying the pop_culture theme comprehensively.",
    category: "Pop Culture",
    cfg: 1.0,
    guidance: 5.0,
  },
  marvel_comics: {
    display_name: "Marvel Comics",
    positive_prompt: "Change this webpage to marvel_comic_panels aesthetic with comic book panels, speech bubbles, halftone dots, bold action lines, and superhero color schemes. Maintain the original layout while applying the pop_culture theme comprehensively.",
    category: "Pop Culture",
    cfg: 1.0,
    guidance: 5.0,
  },
  studio_ghibli: {
    display_name: "Studio Ghibli",
    positive_prompt: "Apply this webpage to studio_ghibli aesthetic featuring soft watercolor textures, whimsical animations, nature elements, hand-drawn illustrations, and pastel color palettes. Maintain the original layout while applying the pop_culture theme comprehensively.",
    category: "Pop Culture",
    cfg: 1.0,
    guidance: 5.0,
  },
  tim_burton: {
    display_name: "Tim Burton Gothic",
    positive_prompt: "Modify this webpage to tim_burton_gothic aesthetic with dark whimsical elements, spiraling designs, gothic architecture, striped patterns, and monochromatic color schemes with splashes of red. Maintain the original layout while applying the pop_culture theme comprehensively.",
    category: "Pop Culture",
    cfg: 1.0,
    guidance: 5.0,
  },
  rick_morty: {
    display_name: "Rick & Morty",
    positive_prompt: "Transform this webpage to rick_morty_portal aesthetic featuring interdimensional portals, sci-fi gadgets, drooling effects, alien interfaces, and chaotic multiverse elements. Maintain the original layout while applying the pop_culture theme comprehensively.",
    category: "Pop Culture",
    cfg: 1.0,
    guidance: 5.0,
  },
  harry_potter: {
    display_name: "Harry Potter",
    positive_prompt: "Apply this webpage to Harry Potter magical newspaper style with moving photographs, wizarding fonts, parchment textures, golden snitch animations, spell effects, and Daily Prophet layouts. Maintain the original layout while applying the pop_culture theme comprehensively.",
    category: "Pop Culture",
    cfg: 1.0,
    guidance: 5.0,
  },

  // Gaming Theme
  fortnite: {
    display_name: "Fortnite",
    positive_prompt: "Convert this webpage to fortnite_battle_royale aesthetic with vibrant cartoon graphics, building mechanics UI, victory royale elements, storm circle effects, and colorful material textures. Maintain the original layout while applying the gaming theme comprehensively.",
    category: "Gaming",
    cfg: 1.0,
    guidance: 5.0,
  },
  mario_kingdom: {
    display_name: "Super Mario",
    positive_prompt: "Redesign this webpage to mario_mushroom_kingdom aesthetic featuring pipes, coins, power-ups, brick patterns, question blocks, and bright Nintendo color palettes. Maintain the original layout while applying the gaming theme comprehensively.",
    category: "Gaming",
    cfg: 1.0,
    guidance: 5.0,
  },
  animal_crossing: {
    display_name: "Animal Crossing",
    positive_prompt: "Transform this webpage to animal_crossing_cozy aesthetic with rounded corners, soft pastels, wood textures, leaf patterns, cute character elements, and comfortable home decorations. Maintain the original layout while applying the gaming theme comprehensively.",
    category: "Gaming",
    cfg: 1.0,
    guidance: 5.0,
  },
  overwatch: {
    display_name: "Overwatch",
    positive_prompt: "Apply this webpage to overwatch_ui aesthetic featuring hero portraits, ultimate meters, objective markers, futuristic HUD elements, and team-based color coding. Maintain the original layout while applying the gaming theme comprehensively.",
    category: "Gaming",
    cfg: 1.0,
    guidance: 5.0,
  },
  sonic_speed: {
    display_name: "Sonic Speed",
    positive_prompt: "Restyle this webpage to sonic_speed_blur aesthetic with motion blur effects, loop-de-loops, gold rings, speed lines, and blue streak trails. Maintain the original layout while applying the gaming theme comprehensively.",
    category: "Gaming",
    cfg: 1.0,
    guidance: 5.0,
  },
  tetris: {
    display_name: "Tetris",
    positive_prompt: "Convert this webpage to tetris_falling_blocks aesthetic featuring tetromino shapes, falling block animations, grid patterns, score counters, and classic Tetris color schemes. Maintain the original layout while applying the gaming theme comprehensively.",
    category: "Gaming",
    cfg: 1.0,
    guidance: 5.0,
  },
  zelda_ancient: {
    display_name: "Zelda Ancient Tech",
    positive_prompt: "Change this webpage to Zelda Breath of the Wild ancient technology with glowing orange Sheikah patterns, geometric runes, guardian aesthetics, shrine interfaces, and mystical blue energy effects. Maintain the original layout while applying the gaming theme comprehensively.",
    category: "Gaming",
    cfg: 1.0,
    guidance: 5.0,
  },

  // Material & Texture Theme
  lego_brick: {
    display_name: "LEGO Bricks",
    positive_prompt: "Convert this webpage to lego_brick_build aesthetic with interlocking brick textures, stud patterns, primary colors, modular construction, and plastic material rendering. Maintain the original layout while applying the material_texture theme comprehensively.",
    category: "Materials",
    cfg: 1.0,
    guidance: 5.0,
  },
  paper_cut: {
    display_name: "Paper Cut Art",
    positive_prompt: "Change this webpage to paper_cut_art aesthetic featuring layered paper effects, shadow depth, craft textures, folded edges, and handmade artistic elements. Maintain the original layout while applying the material_texture theme comprehensively.",
    category: "Materials",
    cfg: 1.0,
    guidance: 5.0,
  },
  clay_3d: {
    display_name: "Clay 3D",
    positive_prompt: "Redesign this webpage to clay_3d_render aesthetic with soft clay textures, fingerprint details, matte surfaces, sculpted forms, and stop-motion animation style. Maintain the original layout while applying the material_texture theme comprehensively.",
    category: "Materials",
    cfg: 1.0,
    guidance: 5.0,
  },
  liquid_metal: {
    display_name: "Liquid Metal",
    positive_prompt: "Modify this webpage to liquid_metal aesthetic featuring chrome reflections, mercury-like surfaces, fluid animations, metallic gradients, and T-1000 terminator effects. Maintain the original layout while applying the material_texture theme comprehensively.",
    category: "Materials",
    cfg: 1.0,
    guidance: 5.0,
  },
  playdoh: {
    display_name: "PlayDoh",
    positive_prompt: "Convert this webpage to playdoh_sculptural aesthetic with soft moldable textures, bright primary colors, squeezed forms, childhood craft aesthetics, and tactile material rendering. Maintain the original layout while applying the material_texture theme comprehensively.",
    category: "Materials",
    cfg: 1.0,
    guidance: 5.0,
  },

  // Artistic Theme
  brutalist: {
    display_name: "Brutalist",
    positive_prompt: "Redesign this webpage to brutalist_concrete aesthetic featuring raw concrete textures, monolithic forms, harsh shadows, minimal ornamentation, and fortress-like structures. Maintain the original layout while applying the artistic theme comprehensively.",
    category: "Artistic Styles",
    cfg: 1.0,
    guidance: 5.0,
  },
  art_deco: {
    display_name: "Art Deco",
    positive_prompt: "Convert this webpage to art_deco_luxury aesthetic with geometric patterns, gold accents, fan motifs, stepped forms, luxurious materials, and 1920s elegance. Maintain the original layout while applying the artistic theme comprehensively.",
    category: "Artistic Styles",
    cfg: 1.0,
    guidance: 5.0,
  },
  memphis: {
    display_name: "Memphis Design",
    positive_prompt: "Modify this webpage to memphis_design aesthetic featuring bold geometric shapes, clashing colors, squiggle patterns, terrazzo textures, and 80s postmodern style. Maintain the original layout while applying the artistic theme comprehensively.",
    category: "Artistic Styles",
    cfg: 1.0,
    guidance: 5.0,
  },
  warhol_pop: {
    display_name: "Warhol Pop Art",
    positive_prompt: "Transform this webpage to warhol_pop_art aesthetic with repeated imagery, bold color blocks, screen print effects, celebrity portraits, and Campbell's soup can colors. Maintain the original layout while applying the artistic theme comprehensively.",
    category: "Artistic Styles",
    cfg: 1.0,
    guidance: 5.0,
  },
  banksy: {
    display_name: "Banksy Street Art",
    positive_prompt: "Apply this webpage to banksy_stencil aesthetic featuring spray paint stencils, political messaging, rats and monkeys, dripping paint effects, and street art composition. Maintain the original layout while applying the artistic theme comprehensively.",
    category: "Artistic Styles",
    cfg: 1.0,
    guidance: 5.0,
  },
  basquiat: {
    display_name: "Basquiat",
    positive_prompt: "Restyle this webpage to basquiat_street_art aesthetic with crown motifs, crude figures, text overlays, vibrant colors on dark backgrounds, and neo-expressionist elements. Maintain the original layout while applying the artistic theme comprehensively.",
    category: "Artistic Styles",
    cfg: 1.0,
    guidance: 5.0,
  },
  japanese_ukiyoe: {
    display_name: "Japanese Ukiyo-e",
    positive_prompt: "Convert this webpage to japanese_ukiyoe aesthetic featuring woodblock print textures, wave patterns, Mount Fuji elements, traditional Japanese colors, and floating world imagery. Maintain the original layout while applying the artistic theme comprehensively.",
    category: "Artistic Styles",
    cfg: 1.0,
    guidance: 5.0,
  },
  nordic_minimal: {
    display_name: "Nordic Minimalism",
    positive_prompt: "Transform this webpage to nordic_minimalism aesthetic with clean lines, neutral colors, natural materials, hygge elements, functional beauty, and Scandinavian simplicity. Maintain the original layout while applying the artistic theme comprehensively.",
    category: "Artistic Styles",
    cfg: 1.0,
    guidance: 5.0,
  },

  // Cultural Theme
  aztec: {
    display_name: "Aztec Geometric",
    positive_prompt: "Change this webpage to aztec_geometric aesthetic featuring stepped pyramids, sun stone patterns, feathered serpent motifs, turquoise and gold colors, and Mesoamerican geometric designs. Maintain the original layout while applying the cultural theme comprehensively.",
    category: "Cultural",
    cfg: 1.0,
    guidance: 5.0,
  },
  egyptian: {
    display_name: "Egyptian Hieroglyphic",
    positive_prompt: "Redesign this webpage to egyptian_hieroglyphic aesthetic with pyramid structures, hieroglyphic text, papyrus textures, gold and lapis lazuli colors, ankh symbols, and ancient Egyptian motifs. Maintain the original layout while applying the cultural theme comprehensively.",
    category: "Cultural",
    cfg: 1.0,
    guidance: 5.0,
  },

  // Entertainment Theme
  netflix_ui: {
    display_name: "Netflix UI",
    positive_prompt: "Apply this webpage to netflix_binge_ui aesthetic featuring content cards, horizontal scrolling, preview hover effects, percentage match scores, and streaming platform interfaces. Maintain the original layout while applying the entertainment theme comprehensively.",
    category: "Entertainment",
    cfg: 1.0,
    guidance: 5.0,
  },
  spotify: {
    display_name: "Spotify",
    positive_prompt: "Restyle this webpage to spotify_music_wave aesthetic with audio waveforms, playlist cards, dark mode with green accents, album artwork grids, and music streaming interfaces. Maintain the original layout while applying the entertainment theme comprehensively.",
    category: "Entertainment",
    cfg: 1.0,
    guidance: 5.0,
  },
  tiktok: {
    display_name: "TikTok",
    positive_prompt: "Transform this webpage to tiktok_vertical_scroll aesthetic featuring vertical video layouts, heart animations, music notes, swipe interactions, and social media engagement elements. Maintain the original layout while applying the entertainment theme comprehensively.",
    category: "Entertainment",
    cfg: 1.0,
    guidance: 5.0,
  },
  twitch: {
    display_name: "Twitch Stream",
    positive_prompt: "Convert this webpage to twitch_stream_overlay aesthetic with chat boxes, donation alerts, subscriber notifications, emote reactions, purple accents, and live streaming interfaces. Maintain the original layout while applying the entertainment theme comprehensively.",
    category: "Entertainment",
    cfg: 1.0,
    guidance: 5.0,
  },
  disney: {
    display_name: "Disney Magic",
    positive_prompt: "Redesign this webpage to disney_magic_kingdom aesthetic featuring castle silhouettes, fairy dust particles, character animations, magical sparkles, and theme park wonder. Maintain the original layout while applying the entertainment theme comprehensively.",
    category: "Entertainment",
    cfg: 1.0,
    guidance: 5.0,
  },

  // Positioning & Presentation
  seasonal: {
    display_name: "Seasonal Theme",
    positive_prompt: "Position this webpage with seasonal theming featuring weather-appropriate decorations, holiday elements, natural transitions, and time-of-year aesthetics.",
    cfg: 1.0,
    guidance: 5.0,
  },
  premium_device: {
    display_name: "Premium Device",
    positive_prompt: "Position this webpage in a premium device setting with latest technology displays, elegant environments, professional staging, and high-end product presentation.",
    cfg: 1.0,
    guidance: 5.0,
  },
  real_world: {
    display_name: "Real World",
    positive_prompt: "Position this webpage within a real-world environment featuring natural settings, authentic contexts, lifestyle integration, and environmental storytelling.",
    cfg: 1.0,
    guidance: 5.0,
  },
  artistic_install: {
    display_name: "Art Installation",
    positive_prompt: "Position this webpage as an artistic installation with gallery lighting, museum displays, creative exhibitions, and immersive art experiences.",
    cfg: 1.0,
    guidance: 5.0,
  },
  floating_effect: {
    display_name: "Floating Effect",
    positive_prompt: "Feature this webpage in a premium device setting with levitation effects, professional shadows, ambient lighting, depth of field, and three-dimensional presentation.",
    cfg: 1.0,
    guidance: 5.0,
  },
  product_present: {
    display_name: "Product Showcase",
    positive_prompt: "Feature this webpage as a product presentation with hero shots, feature callouts, benefit highlights, comparison tables, and commercial photography.",
    cfg: 1.0,
    guidance: 5.0,
  },
  social_media: {
    display_name: "Social Media",
    positive_prompt: "Position this webpage for social media marketing with shareable formats, engagement elements, viral potential, influencer aesthetics, and platform-optimized layouts.",
    cfg: 1.0,
    guidance: 5.0,
  },

  // Add Elements & Components
  add_floating_chat: {
    display_name: "Add Chat Widget",
    positive_prompt: "Add a modern floating chat widget in the bottom right corner with smooth animations, message bubbles, typing indicators, online status, and glassmorphic design that complements the existing webpage aesthetics based on my webpage.",
    category: "Add Components",
    cfg: 1.0,
    guidance: 5.0,
  },
  add_dark_mode: {
    display_name: "Add Dark Mode",
    positive_prompt: "Add an elegant dark mode toggle switch in the top navigation bar featuring smooth transitions, moon/sun icons, persistent state memory, and automatic system preference detection while preserving all existing functionality based on my webpage.",
    category: "Add Components",
    cfg: 1.0,
    guidance: 5.0,
  },
  add_social_proof: {
    display_name: "Add Social Proof",
    positive_prompt: "Add social proof elements including customer testimonials carousel, trust badges, review stars, client logos marquee, and real-time visitor counter integrated seamlessly into the existing layout based on my webpage.",
    category: "Add Components",
    cfg: 1.0,
    guidance: 5.0,
  },
  add_cookie_banner: {
    display_name: "Add Cookie Banner",
    positive_prompt: "Add a GDPR-compliant cookie consent banner at the bottom with customization options, accept/reject buttons, preference center link, and slide-in animation that doesn't obstruct the main content based on my webpage.",
    category: "Add Components",
    cfg: 1.0,
    guidance: 5.0,
  },
  add_progress_bars: {
    display_name: "Add Progress Indicators",
    positive_prompt: "Add progress indicators throughout the page including reading progress bar, scroll percentage, form completion meters, and step indicators for multi-part processes with smooth animations based on my webpage.",
    category: "Add Components",
    cfg: 1.0,
    guidance: 5.0,
  },
  add_animations: {
    display_name: "Add Micro Animations",
    positive_prompt: "Add subtle micro-animations to all interactive elements including button hover effects, card lift animations, smooth scrolling, parallax effects, and entrance animations on scroll without overwhelming the user based on my webpage.",
    category: "Add Components",
    cfg: 1.0,
    guidance: 5.0,
  },
  add_notifications: {
    display_name: "Add Notifications",
    positive_prompt: "Add a toast notification system with success/error/warning/info variants, auto-dismiss timers, action buttons, stacking behavior, and smooth slide-in animations positioned in the top-right corner based on my webpage.",
    category: "Add Components",
    cfg: 1.0,
    guidance: 5.0,
  },
  add_search: {
    display_name: "Add Search Overlay",
    positive_prompt: "Add a full-screen search overlay activated by CMD+K or search icon, featuring instant results, keyboard navigation, recent searches, popular suggestions, and smooth fade-in transition effects based on my webpage.",
    category: "Add Components",
    cfg: 1.0,
    guidance: 5.0,
  },

  // Create Page Templates
  create_login: {
    display_name: "Create Login Page",
    positive_prompt: "Create a modern login page with centered card layout, email/password fields with floating labels, remember me checkbox, forgot password link, social login buttons for Google/GitHub/Microsoft, animated background gradient, and form validation feedback based on my webpage.",
    category: "Create Pages",
    cfg: 1.0,
    guidance: 5.0,
  },
  create_dashboard: {
    display_name: "Create Dashboard",
    positive_prompt: "Create an analytics dashboard with sidebar navigation, metric cards showing KPIs, interactive charts and graphs, data tables with sorting/filtering, date range picker, export buttons, and responsive grid layout with dark mode support based on my webpage.",
    category: "Create Pages",
    cfg: 1.0,
    guidance: 5.0,
  },
  create_pricing: {
    display_name: "Create Pricing Page",
    positive_prompt: "Create a SaaS pricing page featuring three-tier pricing cards, monthly/annual toggle switch, feature comparison table, highlighted recommended plan, FAQ accordion section, customer testimonials, and compelling CTA buttons with hover effects based on my webpage.",
    category: "Create Pages",
    cfg: 1.0,
    guidance: 5.0,
  },
  create_profile: {
    display_name: "Create Profile Settings",
    positive_prompt: "Create a user profile settings page with tabbed interface for account/privacy/notifications, avatar upload with crop tool, form fields for personal information, password change section, two-factor authentication toggle, and save/cancel buttons with confirmation modals based on my webpage.",
    category: "Create Pages",
    cfg: 1.0,
    guidance: 5.0,
  },
  create_hero: {
    display_name: "Create Hero Section",
    positive_prompt: "Create a compelling hero landing section with bold headline, supporting subtext, dual CTA buttons, product mockup or hero image, trust indicators, animated elements on scroll, and video background option with overlay text based on my webpage.",
    category: "Create Pages",
    cfg: 1.0,
    guidance: 5.0,
  },
  create_blog: {
    display_name: "Create Blog Article",
    positive_prompt: "Create a blog article page with readable typography, table of contents sidebar, author bio section, publication date and reading time, social share buttons, related posts grid, comments section, and newsletter signup form based on my webpage.",
    category: "Create Pages",
    cfg: 1.0,
    guidance: 5.0,
  },
  create_checkout: {
    display_name: "Create Checkout",
    positive_prompt: "Create an e-commerce checkout page with step indicator, billing/shipping forms, payment method selection, order summary sidebar, promo code input, express checkout options, and security badges with SSL indicators based on my webpage.",
    category: "Create Pages",
    cfg: 1.0,
    guidance: 5.0,
  },
  create_404: {
    display_name: "Create 404 Page",
    positive_prompt: "Create a creative 404 error page with playful illustration or animation, apologetic headline, helpful error message, search bar for finding content, popular page links, and home button with engaging micro-interactions based on my webpage.",
    category: "Create Pages",
    cfg: 1.0,
    guidance: 5.0,
  },

  // Replace Specific Elements
  replace_logo_tech: {
    display_name: "Tech Logo",
    positive_prompt: "Replace the existing logo with a modern tech company logo featuring abstract geometric shapes, gradient colors, clean sans-serif typography, and scalable vector design that works across all device sizes.",
    category: "Replace Elements",
    cfg: 1.0,
    guidance: 5.0,
  },
  replace_logo_vintage: {
    display_name: "Vintage Logo",
    positive_prompt: "Replace the current logo with a vintage-inspired badge logo containing ornate borders, serif typography, distressed textures, muted color palette, and classic emblematic design elements.",
    category: "Replace Elements",
    cfg: 1.0,
    guidance: 5.0,
  },
  replace_logo_minimal: {
    display_name: "Minimal Logo",
    positive_prompt: "Replace the logo with an ultra-minimalist design using single line art, monochrome palette, negative space utilization, lowercase typography, and Scandinavian design principles.",
    category: "Replace Elements",
    cfg: 1.0,
    guidance: 5.0,
  },
  replace_bg_gradient: {
    display_name: "Gradient Background",
    positive_prompt: "Replace the webpage background with a modern mesh gradient featuring vibrant color transitions, smooth blending, animated movement, noise texture overlay, and complementary color harmonies.",
    category: "Replace Elements",
    cfg: 1.0,
    guidance: 5.0,
  },
  replace_bg_ghibli: {
    display_name: "Ghibli Background",
    positive_prompt: "Replace the background with Studio Ghibli-inspired 8-bit pixel art featuring rolling hills, fluffy clouds, Totoro forest elements, soft pastel colors, parallax scrolling layers, and whimsical animated sprites.",
    category: "Replace Elements",
    cfg: 1.0,
    guidance: 5.0,
  },
  replace_bg_pattern: {
    display_name: "Pattern Background",
    positive_prompt: "Replace the background with subtle geometric patterns including hexagons, dots, or waves, low opacity overlay, seamless tiling, complementary colors to content, and CSS-based responsive scaling.",
    category: "Replace Elements",
    cfg: 1.0,
    guidance: 5.0,
  },
  replace_bg_particles: {
    display_name: "Particle Background",
    positive_prompt: "Replace the background with interactive particle system featuring floating orbs, connection lines between nearby particles, mouse interaction effects, gradient colors, and smooth WebGL animations.",
    category: "Replace Elements",
    cfg: 1.0,
    guidance: 5.0,
  },

  // Change Typography & Fonts
  change_font_modern: {
    display_name: "Modern Sans",
    positive_prompt: "Change all typography to modern sans-serif font stack with Inter for body text, Space Grotesk for headings, improved line height, optimal letter spacing, and responsive font scaling using fluid typography.",
    category: "Typography",
    cfg: 1.0,
    guidance: 5.0,
  },
  change_font_serif: {
    display_name: "Elegant Serif",
    positive_prompt: "Change the font system to elegant serif typography using Playfair Display for headings, Lora for body text, increased line height for readability, classic ligatures, and newspaper-style text columns.",
    category: "Typography",
    cfg: 1.0,
    guidance: 5.0,
  },
  change_font_mono: {
    display_name: "Monospace",
    positive_prompt: "Change all fonts to monospace typography with JetBrains Mono or Fira Code, programming ligatures enabled, terminal-style appearance, consistent character width, and hacker aesthetic.",
    category: "Typography",
    cfg: 1.0,
    guidance: 5.0,
  },
  change_font_handwritten: {
    display_name: "Handwritten",
    positive_prompt: "Change typography to handwritten fonts featuring Caveat for headings, Kalam for body text, slight rotation variations, organic line flow, and personal notebook aesthetic.",
    category: "Typography",
    cfg: 1.0,
    guidance: 5.0,
  },
  change_font_display: {
    display_name: "Bold Display",
    positive_prompt: "Change hero section fonts to bold display typography using Bebas Neue, Oswald, or Anton, massive font sizes, tight letter spacing, uppercase styling, and high visual impact.",
    category: "Typography",
    cfg: 1.0,
    guidance: 5.0,
  },

  // Modify Color Schemes
  change_colors_dark: {
    display_name: "Dark Mode",
    positive_prompt: "Change the entire color scheme to dark mode with rich black backgrounds, elevated surface colors, reduced eye strain contrast, accent color preservation, and proper WCAG compliance.",
    category: "Color Schemes",
    cfg: 1.0,
    guidance: 5.0,
  },
  change_colors_pastel: {
    display_name: "Pastel Palette",
    positive_prompt: "Change all colors to soft pastel palette featuring mint green, lavender, peach, baby blue, with gentle transitions, reduced saturation, and dreamy aesthetic while maintaining readability.",
    category: "Color Schemes",
    cfg: 1.0,
    guidance: 5.0,
  },
  change_colors_neon: {
    display_name: "Neon Colors",
    positive_prompt: "Change the color palette to vibrant neon colors with electric blue, hot pink, lime green, bright purple on dark backgrounds, glowing effects, and cyberpunk vibes.",
    category: "Color Schemes",
    cfg: 1.0,
    guidance: 5.0,
  },
  change_colors_mono: {
    display_name: "Monochrome",
    positive_prompt: "Change to monochromatic color scheme using only shades of blue or green, tonal variations for hierarchy, subtle gradients, professional appearance, and accessible contrast ratios.",
    category: "Color Schemes",
    cfg: 1.0,
    guidance: 5.0,
  },
  change_colors_earth: {
    display_name: "Earth Tones",
    positive_prompt: "Change colors to earthy natural tones including terracotta, sage green, warm browns, cream, muted orange, creating organic, sustainable, and environmentally conscious aesthetic.",
    category: "Color Schemes",
    cfg: 1.0,
    guidance: 5.0,
  },

  // Interactive Enhancements
  enhance_hover: {
    display_name: "Enhanced Hovers",
    positive_prompt: "Enhance all hover states with smooth transitions, color shifts, scale transforms, shadow elevations, cursor changes, and tooltip reveals for improved interactive feedback.",
    category: "Enhancements",
    cfg: 1.0,
    guidance: 5.0,
  },
  enhance_forms: {
    display_name: "Better Forms",
    positive_prompt: "Enhance form user experience with floating labels, real-time validation, password strength meters, auto-formatting inputs, progress indicators, and helpful inline instructions.",
    category: "Enhancements",
    cfg: 1.0,
    guidance: 5.0,
  },
  enhance_navigation: {
    display_name: "Smart Navigation",
    positive_prompt: "Enhance navigation with sticky header, smooth scroll to sections, active state indicators, mobile hamburger menu, breadcrumbs, and search functionality integration.",
    category: "Enhancements",
    cfg: 1.0,
    guidance: 5.0,
  },
  enhance_accessibility: {
    display_name: "Accessibility",
    positive_prompt: "Enhance accessibility with proper ARIA labels, keyboard navigation support, focus visible indicators, skip links, alt text, and screen reader optimizations throughout.",
    category: "Enhancements",
    cfg: 1.0,
    guidance: 5.0,
  },
  enhance_performance: {
    display_name: "Performance",
    positive_prompt: "Enhance perceived performance with skeleton screens, lazy loading images, progressive enhancement, optimistic UI updates, and smooth transition animations.",
    category: "Enhancements",
    cfg: 1.0,
    guidance: 5.0,
  },
};