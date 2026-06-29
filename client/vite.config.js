import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// В dev режим всички заявки към /api се препращат към Express сървъра,
// така че няма нужда от CORS настройки на бекенда.
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:3000',
    },
  },
});
