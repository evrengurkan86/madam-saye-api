import { test } from 'node:test';
import assert from 'node:assert/strict';
import { validate, makeServer } from './server.mjs';
const base = { kind: 'Günlük yorum', topic: 'Genel', question: '' };
test('valid daily request', () => assert.equal(validate(base), base));
test('reject missing coffee image', () => assert.throws(() => validate({...base, kind: 'Kahve falı'})));
test('reject duplicate tarot cards', () => assert.throws(() => validate({...base, kind: 'Tarot', cards: ['Ay','Ay','Güneş']})));
test('accept three distinct cards', () => assert.ok(validate({...base, kind: 'Tarot', cards: ['Ay','Dünya','Güneş']})));
test('reject spoofed photo MIME', () => assert.throws(() => validate({...base, image: {mime_type:'image/png', data:'aGVsbG8='}})));
test('reject long question', () => assert.throws(() => validate({...base, question:'a'.repeat(501)})));
test('unconfigured service fails honestly', async () => {
  const old = process.env.GEMINI_API_KEY; delete process.env.GEMINI_API_KEY;
  const server = makeServer(); await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  try { const response = await fetch(`http://127.0.0.1:${server.address().port}/reading`, {method:'POST'}); assert.equal(response.status, 503); }
  finally { await new Promise(resolve => server.close(resolve)); if (old) process.env.GEMINI_API_KEY = old; }
});
