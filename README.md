# PWA Store - Google Play Store Clone

Progressive Web App (PWA) yang meniru tampilan dan pengalaman Google Play Store dengan fitur instalasi aplikasi menggunakan custom install prompt.

## 🚀 Fitur

- **Design Google Play Store**: Tampilan yang mirip dengan Google Play Store
- **Custom Install Prompt**: Menggunakan `@khmyznikov/pwa-install` library untuk pengalaman instalasi yang lebih baik
- **Progressive Web App**: Dukungan penuh PWA dengan service worker
- **Responsive Design**: Optimized untuk desktop dan mobile
- **Offline Support**: Aplikasi dapat berjalan offline
- **Push Notifications**: Dukungan notifikasi push

## 🛠️ Tech Stack

- **Framework**: Next.js 14 dengan App Router
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **PWA Library**: @khmyznikov/pwa-install
- **Deployment**: Vercel

## 📦 Installation

1. Clone repository ini
2. Install dependencies:
   ```bash
   npm install
   ```

3. Jalankan development server:
   ```bash
   npm run dev
   ```

4. Buka [http://localhost:3000](http://localhost:3000) di browser

## 🚀 Deployment ke Vercel

### Otomatis via Vercel CLI

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Login ke Vercel:
   ```bash
   vercel login
   ```

3. Deploy:
   ```bash
   vercel
   ```

### Manual via Vercel Dashboard

1. Push code ke GitHub repository
2. Buka [vercel.com](https://vercel.com)
3. Import project dari GitHub
4. Vercel akan otomatis mendeteksi Next.js dan melakukan deployment

### Environment Variables

Tidak ada environment variables yang diperlukan untuk deployment dasar.

## 📱 PWA Features

### Install Prompt
- Custom install button menggunakan `@khmyznikov/pwa-install`
- Install banner yang muncul otomatis
- Support untuk Chrome, Safari, dan browser lainnya

### Service Worker
- Caching strategy untuk performa optimal
- Offline support
- Background sync
- Push notifications

### Manifest
- App icons (192x192, 512x512)
- Apple touch icon
- Theme colors
- Display mode: standalone

## 🎨 Customization

### Mengubah App Information
Edit file `src/app/page.tsx` untuk mengubah informasi aplikasi:

```typescript
const sampleApp = {
  name: "Nama Aplikasi Anda",
  developer: "Developer Anda",
  // ... other properties
}
```

### Mengubah Colors
Edit file `tailwind.config.js` untuk mengubah color scheme:

```javascript
extend: {
  colors: {
    'google-blue': '#4285f4',
    'google-green': '#34a853',
    // ... other colors
  }
}
```

### Mengubah Manifest
Edit file `public/manifest.json` untuk mengubah PWA configuration.

## 📁 Project Structure

```
├── public/
│   ├── manifest.json          # PWA manifest
│   ├── sw.js                  # Service worker
│   └── icons/                 # App icons
├── src/
│   ├── app/
│   │   ├── layout.tsx         # Root layout
│   │   ├── page.tsx           # Home page
│   │   └── globals.css        # Global styles
│   └── components/
│       ├── AppCard.tsx        # App card component
│       ├── CustomInstallButton.tsx  # Custom install button
│       ├── Header.tsx         # Header component
│       └── ServiceWorkerRegistration.tsx  # SW registration
├── vercel.json                # Vercel configuration
└── package.json
```

## 🔧 Development

### Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Testing PWA

1. Build aplikasi: `npm run build`
2. Start production server: `npm run start`
3. Buka Chrome DevTools > Application > Service Workers
4. Test install prompt dan offline functionality

## 📝 License

MIT License - feel free to use this project for your own purposes.

## 🤝 Contributing

1. Fork the project
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📞 Support

Jika ada pertanyaan atau issue, silakan buat issue di GitHub repository ini.