/**
 * @jest-environment jsdom
 */
import Error404 from '../../src/pages/Error404.js';

jest.mock('../../src/images.js', () => ({
  logo404: '',
  luna: '',
  vaca: '',
  goog: '',
  gg: '',
  vaca2: '',
  alien: '',
  ovni: '',
  github: '',
}));

describe('Error404', () => {
  it('Debería ser una función', () => {
    expect(typeof Error404).toBe('function');
  });
});
