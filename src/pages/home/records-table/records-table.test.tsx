import { render, screen } from '@testing-library/react';
import { describe, it } from 'vitest';
import { useQuery } from '@tanstack/react-query';
import { RecordsTable } from './records-table';

vi.mock('@tanstack/react-query', () => ({
    useQuery: vi.fn(),
    keepPreviousData: vi.fn()
}));

describe('RecordsTable', () => {
    it('renders the RecordsTable component', () => {
        vi.mocked(useQuery).mockReturnValue({
            data: {
                content: [],
                page: { totalElements: 0 },
            },
            isLoading: false,
        } as any);

        render(<RecordsTable />);

        expect(screen.getByRole('grid')).toBeInTheDocument();
        expect(screen.getByText('ID')).toBeInTheDocument();
        expect(screen.getByText('Operation')).toBeInTheDocument();
        expect(screen.getByText('Amount')).toBeInTheDocument();
        expect(screen.getByText('User Balance')).toBeInTheDocument();
        expect(screen.getByText('Response')).toBeInTheDocument();
        expect(screen.getByText('Date (DD/MM/YYYY HH:MM:SS)')).toBeInTheDocument();
    });
});
