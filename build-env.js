const fs = require('fs');
const path = require('path');

const envKeys = [
  'GEMINI_API_KEY',
  'EMAILJS_PUBLIC_KEY',
  'EMAILJS_SERVICE_ID',
  'EMAILJS_TEMPLATE_ID',
  'GOOGLE_SHEETS_URL',
  'ADMIN_CODE',
  'FIREBASE_API_KEY',
  'FIREBASE_AUTH_DOMAIN',
  'FIREBASE_PROJECT_ID',
  'FIREBASE_STORAGE_BUCKET',
  'FIREBASE_MESSAGING_SENDER_ID',
  'FIREBASE_APP_ID',
];

const env = {};
const envPath = path.join(__dirname, '.env');

// 1) .env 파일이 있으면 파일에서 읽기 (로컬 개발용)
if (fs.existsSync(envPath)) {
  fs.readFileSync(envPath, 'utf-8').split('\n').forEach(line => {
    line = line.trim();
    if (!line || line.startsWith('#')) return;
    const idx = line.indexOf('=');
    if (idx === -1) return;
    const key = line.slice(0, idx).trim();
    const val = line.slice(idx + 1).trim();
    env[key] = val;
  });
  console.log('✓ .env 파일에서 환경변수 로드');
}

// 2) process.env에서 보충 (Vercel 배포용)
envKeys.forEach(key => {
  if (!env[key] && process.env[key]) {
    env[key] = process.env[key];
  }
});

const js = `// 이 파일은 build-env.js가 자동 생성합니다. 직접 수정하지 마세요.\nconst ENV = ${JSON.stringify(env, null, 2)};\n`;
fs.writeFileSync(path.join(__dirname, 'env.js'), js);
console.log('✓ env.js 생성 완료');
