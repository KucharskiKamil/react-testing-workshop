import { describe, it, expect, vi } from 'vitest';
import { greetings, randomGreetings } from './greetings';
import { config } from '../utils/config';
import { random } from '../utils/random';

describe('greeting function', () => {
  it('should return correct greeting for lang other than pl', () => {
    // setup
    const originalLang = config.lang;
    config.lang = 'en';

    // when
    const result = greetings('Ola');

    // then
    expect(result).toBe('Hello Ola!');

    // cleanup
    config.lang = originalLang;
  });
});

describe('randomGreetings function', () => {
  it('should return correct greeting for given random', () => {
    // setup
    const originalRandom = random.getRandomGreeting;
    random.getRandomGreeting = vi.fn(() => 'Hi');

    // when
    const result = randomGreetings('Ola');

    // then
    expect(result).toBe('Hi Ola!');

    // cleanup
    random.getRandomGreeting = originalRandom;
  });
});
