import { useQuery } from '@tanstack/react-query';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { CreateRecordModal } from './create-record-modal';

vi.mock('../../../services/operations/operations-service', () => ({
    getAllOperations: vi.fn(),
}));

vi.mock('@tanstack/react-query', () => ({
    useQuery: vi.fn(),
}));

const mockOnClose = vi.fn();

describe('CreateRecordModal', () => {
    beforeEach(() => {
        vi.mocked(useQuery).mockClear();
        mockOnClose.mockClear();
    });

    it('renders modal with title and buttons', () => {
        vi.mocked(useQuery).mockReturnValue({
            data: [],
            isLoading: false,
        } as any);

        render(<CreateRecordModal open={true} onClose={mockOnClose} />);

        expect(screen.getByLabelText(/select operation/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /get result/i })).toBeInTheDocument();
    });

    it('calls onClose when the cancel button is clicked', () => {
        vi.mocked(useQuery).mockReturnValue({
            data: [],
            isLoading: false,
        } as any);

        render(<CreateRecordModal open={true} onClose={mockOnClose} />);

        const cancelButton = screen.getByRole('button', { name: /cancel/i });
        fireEvent.click(cancelButton);

        expect(mockOnClose).toHaveBeenCalledWith(false, null);
    });
});
