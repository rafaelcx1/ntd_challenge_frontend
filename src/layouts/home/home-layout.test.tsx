import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import HomeLayout from './home-layout';
import { TopBarProps } from '../../components/top-bar/top-bar';

vi.mock('react-router-dom', () => ({
    useNavigate: vi.fn(),
    Outlet: () => <div>Mocked Outlet</div>,
}));

vi.mock('@tanstack/react-query', () => ({
    useQuery: vi.fn(),
}));

vi.mock('../../components/top-bar/top-bar', () => ({
    TopBar: ({ email, userBalance, isLoading, onLogout }: TopBarProps) => (
        <div>
            {isLoading ? 'Loading...' : `Email: ${email}, Balance: ${userBalance}`}
            <button onClick={onLogout}>Logout</button>
        </div>
    ),
}));

describe('HomeLayout component', () => {
    const navigate = vi.fn();

    beforeEach(() => {
        vi.mocked(useNavigate).mockReturnValue(navigate);
    });

    it('should render the HomeLayout with TopBar and Outlet', () => {
        vi.mocked(useQuery).mockImplementation(({ queryKey }): any => {
            if (queryKey[0] === 'user') {
                return { data: { email: 'test@test.com' }, isLoading: false };
            }
            if (queryKey[0] === 'userBalance') {
                return { data: 100, isLoading: false };
            }
            return { data: null, isLoading: false };
        });

        render(<HomeLayout />);

        expect(screen.getByText('Email: test@test.com, Balance: 100')).toBeInTheDocument();
        expect(screen.getByText('Mocked Outlet')).toBeInTheDocument();
    });

    it('should handle logout and navigate to /login', () => {
        vi.mocked(useQuery).mockReturnValue({ data: { email: 'test@test.com' }, isLoading: false } as any);

        localStorage.setItem('token', 'test')

        render(<HomeLayout />);

        const logoutButton = screen.getByText('Logout');
        fireEvent.click(logoutButton);

        expect(localStorage.getItem('token')).toBe('');

        expect(navigate).toHaveBeenCalledWith('/login');
    });
});
