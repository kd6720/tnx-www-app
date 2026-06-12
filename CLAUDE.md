# TrustedNetworx Website

## Stack
- React 18 + TypeScript + Vite
- Tailwind CSS v3 (styling)
- React Router v6 (SPA routing)
- Netlify (hosting, auto-deploy from main)

## Architecture
- src/components/ — Navbar.tsx, Footer.tsx
- src/pages/ — Home, About, Contact, PotsReplacement, AiConsulting, InternetConnectivity, IpPbx, MobilitySolutions, VoiceSolutions
- 9 total routes, fleet-management aliased to AiConsulting
- SPA — Netlify redirects all routes to index.html

## Brand
- TrustedNetworx — telecom managed solutions provider
- Services: POTS Replacement, AI Consulting, Internet Connectivity, IP PBX, Mobility, Voice
- Target: enterprise, multi-site, property management, senior living, hospitality, healthcare, gov/edu
- Professional, modern, trustworthy — not flashy

## Key Commands
- npm run dev — start dev server
- npm run build — production build (outputs to dist/)
- npm run lint — eslint

## Current Issues to Fix
- No meta tags per page (install react-helmet-async)
- All pages share the same page title
- No lead capture forms work (contact form has no backend)
- No blog/content section
- Design is functional but basic
