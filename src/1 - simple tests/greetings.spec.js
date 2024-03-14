import { it, expect, describe } from 'vitest';
import { greetings } from './greetings';

describe('greetings function', () => {
  it('should return correct greeting for given param(name,pl)', () => {
    // given
    const name = 'Maks';
    const lang = 'pl';

    // when
    const result = greetings(name, lang);

    // then
    expect(result).toBe('Hej Maks!');
  });

  it('should return correct greeting for given param(name,en)', () => {
    // given
    const name = 'Maks';
    const lang = 'en';

    // when
    const result = greetings(name, lang);

    // then
    expect(result).toBe('Hello Maks!');
  });

  it('should return correct greeting without params', () => {
    // when
    const result = greetings();

    // then
    expect(result).toBe('Hej nieznajomy');
  });

  it('should return correct greeting with only name', () => {
    // given
    const name = 'Dorota';

    // when
    const result = greetings(name);

    // then
    expect(result).toBe('Hej Dorota!');
  });

  it('should return correct greeting with empty name and en lang', () => {
    // given
    const name = '';
    const lang = 'en';

    // when
    const result = greetings(name, lang);

    // then
    expect(result).toBe('Hello nieznajomy');
  });
});
