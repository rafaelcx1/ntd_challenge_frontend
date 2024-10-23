import axios from 'axios';
import { toast } from 'react-toastify';
import { vi } from 'vitest';
import { handleApi } from './api-handler.util';

vi.mock('react-toastify', () => ({
  toast: {
    loading: vi.fn(),
    update: vi.fn(),
  },
}));

vi.mock('axios', () => ({
  default: {
    isAxiosError: vi.fn(),
  }
}));

describe('handleApi', () => {
  const mockSetSubmitting = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should handle a successful API call and display a success toast', async () => {
    const mockApiCall = vi.fn().mockResolvedValue({ data: 'Success' });
    const successMessage = 'Operation Successful';

    const mockToastId = 'toast-id';
    vi.mocked(toast.loading).mockReturnValue(mockToastId);

    const result = await handleApi(mockApiCall, successMessage, mockSetSubmitting);

    expect(toast.loading).toHaveBeenCalledWith('Loading...');
    expect(toast.update).toHaveBeenCalledWith(mockToastId, {
      render: successMessage,
      type: 'success',
      closeOnClick: true,
      isLoading: false,
      closeButton: true,
      pauseOnHover: true,
      draggable: true,
      autoClose: 5000,
    });

    expect(mockSetSubmitting).toHaveBeenCalledWith(true);
    expect(mockSetSubmitting).toHaveBeenCalledWith(false);

    expect(result).toEqual({ data: 'Success' });
  });

  it('should handle an Axios error and display an error toast with API error details', async () => {
    const mockError = {
      response: { data: { detail: 'API Error' } },
    };
    const mockApiCall = vi.fn().mockRejectedValue(mockError);
    const successMessage = 'Operation Successful';

    const mockToastId = 'toast-id';
    vi.mocked(toast.loading).mockReturnValue(mockToastId);
    vi.mocked(axios.isAxiosError).mockReturnValue(true);

    const result = await handleApi(mockApiCall, successMessage, mockSetSubmitting);

    expect(toast.loading).toHaveBeenCalledWith('Loading...');
    expect(toast.update).toHaveBeenCalledWith(mockToastId, {
      render: 'API Error',
      type: 'error',
      closeOnClick: true,
      isLoading: false,
      closeButton: true,
      pauseOnHover: true,
      draggable: true,
      autoClose: 5000,
    });

    expect(mockSetSubmitting).toHaveBeenCalledWith(true);
    expect(mockSetSubmitting).toHaveBeenCalledWith(false);

    expect(result).toBeNull();
  });

  it('should handle a non-Axios error and display a generic error toast', async () => {
    const mockError = new Error('Non-Axios error');
    const mockApiCall = vi.fn().mockRejectedValue(mockError);
    const successMessage = 'Operation Successful';

    const mockToastId = 'toast-id';
    vi.mocked(toast.loading).mockReturnValue(mockToastId);
    vi.mocked(axios.isAxiosError).mockReturnValue(false);

    const result = await handleApi(mockApiCall, successMessage, mockSetSubmitting);

    expect(toast.loading).toHaveBeenCalledWith('Loading...');
    expect(toast.update).toHaveBeenCalledWith(mockToastId, {
      render: 'An unexpected error occurred',
      type: 'error',
      closeOnClick: true,
      isLoading: false,
      closeButton: true,
      pauseOnHover: true,
      draggable: true,
      autoClose: 5000,
    });

    expect(mockSetSubmitting).toHaveBeenCalledWith(true);
    expect(mockSetSubmitting).toHaveBeenCalledWith(false);
    expect(result).toBeNull();
  });
});
