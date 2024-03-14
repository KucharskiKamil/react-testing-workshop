import { describe, it, expect, vi } from 'vitest';
import { greetings, randomGreetings } from './greetings';

vi.mock('../utils/config', () => ({
  config: {
    lang: 'en',
  },
}));

vi.mock('../utils/random', () => ({
  random: {
    getRandomGreeting: vi.fn(() => 'Hi'),
  },
}));

describe('greeting function', () => {
  it('should return correct greeting for lang other than pl', () => {
    // when
    const result = greetings('Ola');

    // then
    expect(result).toBe('Hello Ola!');
  });
});

describe('randomGreetings function', () => {
  it('should return correct greeting for given random', () => {
    // when
    const result = randomGreetings('Ola');

    // then
    expect(result).toBe('Hi Ola!');
  });
});
