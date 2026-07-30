# lawn

Video review platform for creative teams. Built by Theo.

## Design Language

### Philosophy

Brutalist, typographic, minimal. The design should feel bold and direct—like a poster, not a dashboard. Prioritize clarity over decoration. Let typography and whitespace do the heavy lifting.

### Colors (Numan brand)

- **Background**: `#f5f5f9` (lilac-white canvas)
- **Text**: `#272357` (dark indigo)
- **Muted text**: `#6b6b8a`
- **Primary accent**: `#5252e6` (Numan indigo)
- **Accent hover**: `#4343cf`
- **Highlight**: `#8c8cf0` (light indigo for emphasis)
- **Borders**: `#272357` (strong) or `#dadae8` (subtle keyline)
- **Inverted sections**: `#272357` background with `#f5f5f9` text
- **Semantic**: success `#0a9d63` · error `#e50000` · warning `#ffa32c`

### Typography

- **Headings**: Font-black (900 weight), tight tracking
- **Typeface**: DM Sans (body) + DM Mono (technical info) — Numan brand
- **Body**: Regular weight, clean and readable
- **Monospace**: For technical info, timestamps, stats
- Use size contrast dramatically—massive headlines with small supporting text

### Borders & Spacing

- Strong 2px borders in `#272357` for section dividers and cards
- Generous padding (p-6 to p-8 typical)
- Clear visual hierarchy through spacing

### Interactive Elements

- Buttons: Solid backgrounds with bold text, clear hover states
- Links: Underlines, not color-only differentiation
- Hover states: Background fills or color shifts, no subtle opacity changes

### Component Patterns

- **Cards**: 2px black border, cream background, bold title
- **Sections**: Often alternate between cream and dark backgrounds
- **Forms**: Simple inputs with strong borders, no rounded corners or minimal
- **Navigation**: Minimal, text-based, appears on scroll when needed

### Do's

- Use bold typography to create hierarchy
- Embrace whitespace
- Keep interactions obvious and direct
- Use green sparingly as accent, not primary

### Don'ts

- No gradients or shadows (except subtle where functional)
- No rounded corners on primary UI (square/sharp edges)
- No decorative icons—only functional ones
- Don't hide information behind hover states

<!-- convex-ai-start -->

This project uses [Convex](https://convex.dev) as its backend.

When working on Convex code, **always read
`convex/_generated/ai/guidelines.md` first** for important guidelines on
how to correctly use Convex APIs and patterns. The file contains rules that
override what you may have learned about Convex from training data.

Convex agent skills for common tasks can be installed by running
`npx convex ai-files install`.

<!-- convex-ai-end -->
