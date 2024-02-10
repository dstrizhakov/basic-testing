// Uncomment the code below and write your tests
import {
  getBankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
} from '.';
import _ from 'lodash';

describe('BankAccount', () => {
  const firstAccount = getBankAccount(200);
  const secondAccount = getBankAccount(700);

  test('should create account with initial balance', () => {
    expect(firstAccount.getBalance()).toBe(200);
    expect(secondAccount.getBalance()).toBe(700);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    expect(() => firstAccount.withdraw(300)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    expect(() => firstAccount.transfer(300, secondAccount)).toThrow();
  });

  test('should throw error when transferring to the same account', () => {
    expect(() => firstAccount.transfer(100, firstAccount)).toThrow();
  });

  test('should deposit money', () => {
    firstAccount.deposit(50);
    expect(firstAccount.getBalance()).toBe(250);
  });

  test('should withdraw money', () => {
    firstAccount.withdraw(50);
    expect(firstAccount.getBalance()).toBe(200);
  });

  test('should transfer money', () => {
    firstAccount.transfer(50, secondAccount);
    expect(firstAccount.getBalance()).toBe(150);
    expect(secondAccount.getBalance()).toBe(750);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const mock = jest.spyOn(_, 'random').mockReturnValue(10);
    const balance = await firstAccount.fetchBalance();
    expect(balance).toBe(10);
    mock.mockRestore();
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const mock = jest.spyOn(_, 'random').mockReturnValue(10);
    const balance = await firstAccount.fetchBalance();
    expect(balance).toBe(10);
    mock.mockRestore();
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const mock = jest.spyOn(_, 'random').mockReturnValue(0);
    await expect(() => firstAccount.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
    mock.mockRestore();
  });
});
