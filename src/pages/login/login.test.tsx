import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { authenticate } from '../../services/auth/auth-service';
import { handleApi } from '../../utils/api-handler.util';
import { Login } from './login';

vi.mock('../../services/auth/auth-service', () => ({
    authenticate: vi.fn(),
}));

vi.mock('../../utils/api-handler.util', () => ({
    handleApi: vi.fn(),
}));

vi.mock('react-router-dom', () => ({
    useNavigate: vi.fn(),
}));

describe('Login', () => {

    beforeEach(() => {
        vi.mocked(authenticate).mockClear();
        vi.mocked(handleApi).mockClear();
    });

    afterEach(() => {
        vi.clearAllMocks();
    });

    it('should render the login form with email and password fields and submit button', () => {
        render(<Login />);

        expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
    });

    it('should show error messages if form is submitted with empty fields', async () => {
        render(<Login />);

        fireEvent.click(screen.getByRole('button', { name: /login/i }));

        await waitFor(() => {
            expect(screen.getByText(/email is required/i)).toBeInTheDocument();
            expect(screen.getByText(/password is required/i)).toBeInTheDocument();
        });
    });

    it('should disable the submit button when form is submitting', async () => {
        render(<Login />);

        fireEvent.change(screen.getByLabelText(/email/i), {
            target: { value: 'test@example.com' },
        });
        fireEvent.change(screen.getByLabelText(/password/i), {
            target: { value: 'Password@123' },
        });

        const submitButton = screen.getByRole('button', { name: /login/i });
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(submitButton).toBeDisabled();
        });
    });
});
