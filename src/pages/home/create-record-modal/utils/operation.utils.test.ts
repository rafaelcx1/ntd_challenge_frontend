import { describe, expect, it, vi } from 'vitest';
import {
    add,
    divide,
    multiply,
    randomString,
    squareRoot,
    subtract,
} from '../../../../services/operations/operations-service';
import {
    AddRequest,
    DivisionRequest,
    MultiplyRequest,
    RandomStringRequest,
    SquareRootRequest,
    SubtractRequest,
} from '../../../../services/operations/operations-types';
import { OperationType } from '../enums/operation-type.enum';
import { getOperationApiCall } from './operation.utils';

vi.mock('../../../../services/operations/operations-service', () => ({
  add: vi.fn(),
  subtract: vi.fn(),
  multiply: vi.fn(),
  divide: vi.fn(),
  squareRoot: vi.fn(),
  randomString: vi.fn(),
}));

describe('Operation Util', () => {
  const mockValues = {
    addition: { value1: 1, value2: 2 } as AddRequest,
    subtraction: { value1: 5, value2: 3 } as SubtractRequest,
    multiplication: { value1: 2, value2: 3 } as MultiplyRequest,
    division: { value1: 6, value2: 3 } as DivisionRequest,
    squareRoot: { value: 9 } as SquareRootRequest,
    randomString: { size: 5 } as RandomStringRequest,
  };

  it('should return the correct API call for ADDITION', async () => {
    const apiCall = getOperationApiCall(mockValues, OperationType.ADDITION);
    await apiCall();

    expect(add).toHaveBeenCalledWith(mockValues.addition);
  });

  it('should return the correct API call for SUBTRACTION', async () => {
    const apiCall = getOperationApiCall(mockValues, OperationType.SUBTRACTION);
    await apiCall();

    expect(subtract).toHaveBeenCalledWith(mockValues.subtraction);
  });

  it('should return the correct API call for MULTIPLICATION', async () => {
    const apiCall = getOperationApiCall(mockValues, OperationType.MULTIPLICATION);
    await apiCall();

    expect(multiply).toHaveBeenCalledWith(mockValues.multiplication);
  });

  it('should return the correct API call for DIVISION', async () => {
    const apiCall = getOperationApiCall(mockValues, OperationType.DIVISION);
    await apiCall();

    expect(divide).toHaveBeenCalledWith(mockValues.division);
  });

  it('should return the correct API call for SQUARE_ROOT', async () => {
    const apiCall = getOperationApiCall(mockValues, OperationType.SQUARE_ROOT);
    await apiCall();

    expect(squareRoot).toHaveBeenCalledWith(mockValues.squareRoot);
  });

  it('should return the correct API call for RANDOM_STRING', async () => {
    const apiCall = getOperationApiCall(mockValues, OperationType.RANDOM_STRING);
    await apiCall();

    expect(randomString).toHaveBeenCalledWith(mockValues.randomString);
  });

  it('should return null when NONE operation type is provided', async () => {
    const apiCall = getOperationApiCall(mockValues, OperationType.NONE);
    const result = await apiCall();

    expect(result).toBe(null);
  });
});
