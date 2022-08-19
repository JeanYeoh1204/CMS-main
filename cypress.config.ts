import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    //baseUrl: 'http://localhost:3000',
    baseUrl: 'https://cms-lyart.vercel.app/',
  },
});
