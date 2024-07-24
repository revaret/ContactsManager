/* eslint-disable jest/valid-expect */
import {describe, expect, test} from '@jest/globals';
import {renderHook} from '@testing-library/react-hooks';
import useContacts from '../hooks/useContacts';

describe('useContacts', () => {
  test('should return all contacts when permission is granted', async () => {
    const mockContacts = ['John Doe', 'Jane Smith'];
    const mockCheckPermission = jest.fn().mockResolvedValue('authorized');
    const mockGetAll = jest.fn().mockResolvedValue(mockContacts);

    jest.mock('react-native-contacts', () => ({
      checkPermission: mockCheckPermission,
      getAll: mockGetAll,
    }));

    const {result, waitForNextUpdate} = renderHook(() => useContacts());

    await waitForNextUpdate();

    expect(result.current.getAllContacts()).resolves.toEqual(mockContacts);
    expect(mockCheckPermission).toHaveBeenCalled();
    expect(mockGetAll).toHaveBeenCalled();
  });

  test('should request permission and return all contacts when permission is not granted initially', async () => {
    const mockContacts = ['John Doe', 'Jane Smith'];
    const mockCheckPermission = jest.fn().mockResolvedValue('denied');
    const mockRequestPermission = jest.fn().mockResolvedValue('authorized');
    const mockGetAll = jest.fn().mockResolvedValue(mockContacts);

    jest.mock('react-native-contacts', () => ({
      checkPermission: mockCheckPermission,
      requestPermission: mockRequestPermission,
      getAll: mockGetAll,
    }));

    const {result, waitForNextUpdate} = renderHook(() => useContacts());

    await waitForNextUpdate();

    expect(result.current.getAllContacts()).resolves.toEqual(mockContacts);
    expect(mockCheckPermission).toHaveBeenCalled();
    expect(mockRequestPermission).toHaveBeenCalled();
    expect(mockGetAll).toHaveBeenCalled();
  });
});
