import axios from 'axios';
import { throttledGetDataFromApi,  THROTTLE_TIME } from './index';

const baseURL = 'https://jsonplaceholder.typicode.com';
const relativePath = '/posts';
const responseData = [{ id: 1, title: 'title' }];

describe('throttledGetDataFromApi', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });
  afterAll(() => {
    jest.useRealTimers();
  });
  beforeEach(async () => {
    jest.advanceTimersByTime(THROTTLE_TIME);
    jest.spyOn(axios, 'create');
    jest
      .spyOn(axios.Axios.prototype, 'get')
      .mockResolvedValueOnce({ data: responseData });
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  test('should create instance with provided base url', async () => {
    await throttledGetDataFromApi(relativePath);
    expect(axios.create).toHaveBeenCalledWith({
      baseURL,
    });
  });

  test('should perform request to correct provided url', async () => {
    await throttledGetDataFromApi(relativePath);
    expect(axios.Axios.prototype.get).toHaveBeenCalledWith(relativePath);
  });

  test('should return response data', async () => {
    const response = await throttledGetDataFromApi(relativePath);
    expect(response).toBe(responseData);
  });
});
