const faithgpt = require('./src/faithgpt.js').default;

console.log('Testing FaithGPT Module\n');
console.log('='.repeat(50));

const tests = [
  { input: 'Hello, how are you?', expected: 'greeting' },
  { input: 'I am so worried about my future', expected: 'mentalHealth' },
  { input: 'I have doubts about God', expected: 'faith' },
  { input: 'Christian worship music', expected: 'music' },
  { input: 'Send me a pastor sermon', expected: 'preaching' },
  { input: 'I want to kill myself', expected: 'crisis' },
  { input: 'What is grace?', expected: 'general' }
];

let passed = 0;
tests.forEach((test, i) => {
  const resp = faithgpt.getResponse(test.input);
  const match = resp.type === test.expected;
  const status = match ? '✓' : '✗';
  console.log(`${status} Test ${i+1}: "${test.input.substring(0, 30)}..."`);
  console.log(`  Expected: ${test.expected}, Got: ${resp.type}`);
  if (match) passed++;
});

console.log('\n' + '='.repeat(50));
console.log(`✓ ${passed}/${tests.length} tests passed!\n`);
