# Copilot Instructions for Flowermarket

## Project Overview

Flowermarket is a **Next.js 16.1.6 application** with React 19, TypeScript, and Tailwind CSS 4. It's a complete flower marketplace where users can purchase bundled gifts containing flowers, chocolates, and necklaces.

## Architecture

### Core Structure

- **App Router**: Pages live in `/app/` (Next.js App Router, not Pages Router)
- **Root Layout**: [app/layout.tsx](app/layout.tsx) - Sets up metadata, fonts (Geist), and global styles
- **Home Page**: [app/page.tsx](app/page.tsx) - Landing page with hero section and CTA buttons
- **Products Listing**: [app/products/page.tsx](app/products/page.tsx) - Server component showing grid of flower bundles
- **Product Details**: [app/products/[id]/page.tsx](app/products/[id]/page.tsx) - Client component with bundle details, add-to-cart, and related products
- **Shopping Cart**: [app/cart/page.tsx](app/cart/page.tsx) - Client component with cart management, quantity controls, and order summary
- **Products Data**: [lib/products.ts](lib/products.ts) - TypeScript interface and array of 5 example bundles
- **Global Styles**: [app/globals.css](app/globals.css) - Tailwind CSS 4 configuration
- **Public Assets**: `/public/` - Static SVG images

### Tech Stack

- **Framework**: Next.js 16.1.6 (App Router, server components by default)
- **Language**: TypeScript 5 (strict mode)
- **Styling**: Tailwind CSS 4 with PostCSS
- **Fonts**: Next.js font optimization (Geist Sans/Mono from Google)
- **Linting**: ESLint 9 with Next.js core web vitals and TypeScript rules

## Key Developer Workflows

### Development

```bash
npm run dev
```

Starts dev server on http://localhost:3000 with hot reload. Requires Node.js ≥20.9.0.

### Building & Deployment

```bash
npm run build    # Production build (Next.js compilation)
npm start        # Run production server locally
npm run lint     # Run ESLint on the codebase
```

## Marketplace Features & Data Flow

### Product Model

Each bundle (`Product` interface) contains:

- **Flower**: name and color (e.g., "Red Rose", "Deep Crimson")
- **Chocolate**: type and flavor (e.g., "Dark Chocolate Truffles", "Ganache")
- **Necklace**: material and style (e.g., "Gold Plated", "Heart Pendant")
- **Price**: USD amount
- **Image**: SVG path placeholder

See [lib/products.ts#L1-L18](lib/products.ts) for the interface.

### Shopping Flow

1. User browses [app/page.tsx](app/page.tsx) (hero) → clicks "Shop Now"
2. Sees product grid at [app/products/page.tsx](app/products/page.tsx)
3. Clicks product → [app/products/[id]/page.tsx](app/products/[id]/page.tsx) with full bundle details
4. Selects quantity, clicks "Add to Cart" → stored in localStorage
5. Navigates to [app/cart/page.tsx](app/cart/page.tsx) to review order and see total
6. Checkout button ready for Stripe/PayPal integration

## Code Conventions & Patterns

### TypeScript & Strict Mode

- **Strict mode enabled** - always provide proper type annotations, no `any`
- Use `Readonly<T>` for immutable props (see [app/layout.tsx#L17](app/layout.tsx#L17))
- **Product Interface**: [lib/products.ts#L1-L18](lib/products.ts#L1-L18) - reuse this for all product operations

### React & Next.js Patterns

- **Server Components by Default**: [app/products/page.tsx](app/products/page.tsx) is server (static product grid)
- **Client Components**: Use `"use client"` only for interactivity:
  - [app/products/[id]/page.tsx](app/products/[id]/page.tsx) - quantity state, add-to-cart
  - [app/cart/page.tsx](app/cart/page.tsx) - cart state management
- **Metadata**: Use `Metadata` type from `next` (see [app/layout.tsx#L5](app/layout.tsx#L5))
- **Next.js Image**: Use `<Image>` component with proper sizing
- **Import Paths**: Use `@/*` alias configured in `tsconfig.json` (e.g., `@/lib/products`)
- **Local Storage**: Client components use `localStorage.getItem("cart")` / `setItem` for persistence

### Tailwind CSS

- Use utility classes directly (no component abstractions)
- Color scheme: pink-600 (primary), zinc (neutrals)
- Responsive: `sm:`, `md:`, `lg:` breakpoints for mobile-first
- Dark mode: use `dark:` prefix (e.g., `dark:bg-zinc-900`)
- Gradients: Use `bg-linear-to-b` or `bg-linear-to-br` (Tailwind CSS 4 syntax)

### ESLint

- Enforced via `eslint-config-next/core-web-vitals` and `/typescript`
- Auto-ignore: `.next/`, `out/`, `build/`, `next-env.d.ts`
- Run `npm run lint` before committing

## Integration Points & Dependencies

- **Next.js Built-ins**: Font optimization, Image component, dynamic routing (`[id]`)
- **No Backend Yet**: Product data hardcoded in [lib/products.ts](lib/products.ts)
- **No Payments**: Checkout button is placeholder - integrate Stripe/PayPal before go-live
- **No Authentication**: No user accounts or order history
- **CSS**: PostCSS for Tailwind (configured in `postcss.config.mjs`)

## File Structure Reference

```
app/
  ├─ layout.tsx              # Root layout
  ├─ page.tsx                # Home/hero page
  ├─ products/
  │   ├─ page.tsx            # Product listing (server)
  │   └─ [id]/
  │       └─ page.tsx        # Product detail (client)
  ├─ cart/
  │   └─ page.tsx            # Shopping cart (client)
  ├─ globals.css             # Tailwind styles
  └─ favicon.ico
lib/
  └─ products.ts             # Product interface & data array
public/                       # Static SVG images
```

## Getting Started for AI Agents

1. **New Bundles**: Add to `products` array in [lib/products.ts](lib/products.ts)
2. **New Routes**: Create `.tsx` files in `/app/` following App Router pattern
3. **Server vs Client**: Default to server; add `"use client"` only for state/hooks
4. **Type Safety**: Import `Product` interface from `@/lib/products` for type-safe operations
5. **Styling**: Use Tailwind utilities with dark mode support
6. **Cart Logic**: Client components use localStorage - add error handling for edge cases

## Gotchas & Notes

- **Cart Persistence**: localStorage on client only - data lost on browser clear. Plan backend migration before scaling.
- **No Database**: Product data hardcoded. Ready for CMS or database integration.
- **No Payments**: Checkout is placeholder - not production-ready.
- **No Auth**: No user accounts or order history yet.
- **Image Placeholders**: SVG paths in [lib/products.ts#L21-L25](lib/products.ts) - add real images to `/public/`
- **Dynamic Routes**: Product `[id]` handles missing products gracefully (404 fallback)
- **Node Version**: Requires Node.js ≥20.9.0
