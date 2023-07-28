function demo_test() {
  return true;
}

test('returnung true', () => {
  const result = demo_test();
  expect(result).toBeTruthy();
});
