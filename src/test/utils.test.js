import { debounce } from "../utils";

describe('utils', () => {
  it('debounce', () => {
    jest.useFakeTimers();
    const callback = jest.fn();
    const debounced = debounce(callback, 1000);
    debounced();
    expect(callback).not.toHaveBeenCalled();
    jest.runAllTimers();
    expect(callback).toHaveBeenCalled();
  });
})