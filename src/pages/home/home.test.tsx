import { useQuery, useQueryClient } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Home } from './home';

vi.mock('./records-table/records-table', () => ({
    RecordsTable: () => <div>Mocked RecordsTable</div>,
}));

vi.mock('./create-record-modal/create-record-modal', () => ({
    CreateRecordModal: () => (
        <div>
            Mocked CreateRecordModal
        </div>
    ),
}));

vi.mock('./result-record-modal/result-record-modal', () => ({
    ResultRecordModal: () => (
        <div>
            Mocked ResultRecordModal
        </div>
    ),
}));

vi.mock('@tanstack/react-query', () => {
    return {
        useQueryClient: vi.fn(),
        useQuery: vi.fn(),
        keepPreviousData: vi.fn()
    };
});

describe('Home component with mocked QueryClient', () => {
    const queryClient = {
        invalidateQueries: vi.fn(),
    };

    vi.mocked(useQuery).mockReturnValue({ loading: false, data: [] } as any);
    vi.mocked(useQueryClient).mockReturnValue(queryClient as any);

    it('should render the Home component', () => {
        render(<Home />);

        expect(screen.getByText('Records')).toBeInTheDocument();

        const createButton = screen.getByRole('button', { name: /create operation/i });
        expect(createButton).toBeInTheDocument();
    });
});
