# PaddlesPK Mobile App

Cross-platform (iOS + Android) mobile app for **PaddlesPK** — Pakistan's premier padel court booking platform. Built with React Native + Expo, connected to the same Supabase backend as the [PaddlesPK website](https://paddlespk.com), so bookings and profiles stay in sync across web and mobile.

## Features (v1)

- **Auth** — email/password sign up & sign in (Supabase Auth, shared with the website)
- **Browse courts** — all 26 arenas across Lahore, Karachi, Islamabad, Rawalpindi & Peshawar, with city filter and search
- **Book a court** — pick a date (next 14 days), hourly time slot (9 AM – 10 PM), and player count; bookings land in the same `bookings` table the website uses
- **My bookings** — view booking history, pull-to-refresh, cancel confirmed bookings
- **Profile** — edit name, city, skill level, and bio (same `profiles` table as the web app)

## Tech stack

- [Expo](https://expo.dev) SDK 57 / React Native 0.86
- [expo-router](https://docs.expo.dev/router/introduction/) (file-based navigation)
- TypeScript (strict)
- [Supabase](https://supabase.com) — auth + Postgres (`bookings`, `profiles`, …)

## Getting started

```bash
npm install
npm start
```

Then press `a` for Android emulator, `i` for iOS simulator, or scan the QR code with the [Expo Go](https://expo.dev/go) app on a physical device.

The Supabase URL and publishable key live in `app.json` under `expo.extra` (they are client-side credentials, same values the website ships).

## Project structure

```
app/
  _layout.tsx          Root stack + auth provider
  index.tsx            Auth-aware redirect
  (auth)/              Sign in / sign up screens
  (tabs)/              Courts · My Bookings · Profile
  arena/[name].tsx     Court detail + booking flow
components/ui.tsx      Button, Input, Card, Chip, Badge
contexts/AuthContext.tsx
data/arenas.ts         Arena catalog (mirrors the web app)
data/slots.ts          Hourly slot labels
lib/supabase.ts        Supabase client (AsyncStorage session persistence)
lib/theme.ts           PaddlesPK brand palette
```

## Store builds

Production binaries are built with [EAS Build](https://docs.expo.dev/build/introduction/):

```bash
npm install -g eas-cli
eas login
eas build --platform android   # .aab for Google Play
eas build --platform ios       # .ipa for the App Store
```

App identifiers are preconfigured: `com.paddlespk.app` (both platforms).
