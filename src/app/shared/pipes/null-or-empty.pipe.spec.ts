import { NullOrEmptyPipe } from './null-or-empty.pipe';

describe('NullOrEmptyPipe', () => {
  it('create an instance', () => {
    const pipe = new NullOrEmptyPipe();
    expect(pipe).toBeTruthy();
  });
});
