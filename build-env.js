const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '.env');
if (!fs.existsSync(envPath)) {
  console.log('.env 파일이 없습니다. 기본값으로 실행합니다.');
  fs.writeFileSync(path.join(__dirname, 'env.js'), 'const ENV = {};');
  process.exit(0);
}

const env = {};
fs.readFileSync(envPath, 'utf-8').split('\n').forEach(line => {
  line = line.trim();
  if (!line || line.startsWith('#')) return;
  const idx = line.indexOf('=');
  if (idx === -1) return;
  const key = line.slice(0, idx).trim();
  const val = line.slice(idx + 1).trim();
  env[key] = val;
});

const js = `// 이 파일은 build-env.js가 .env에서 자동 생성합니다. 직접 수정하지 마세요.\nconst ENV = ${JSON.stringify(env, null, 2)};\n`;
fs.writeFileSync(path.join(__dirname, 'env.js'), js);
console.log('✓ .env → env.js 변환 완료');
