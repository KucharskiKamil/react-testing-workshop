export function sumOfNumbers(numbers) {
  try {
    return numbers.reduce((a, b) => a + b, 0);
  } catch (error) {
    return 0;
  }
}
