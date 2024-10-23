import { render, screen, fireEvent } from '@testing-library/react';
import { ResultRecordModal } from './result-record-modal';

const onCloseMock = vi.fn();

const defaultProps = {
  open: true,
  result: 'Success',
  onClose: onCloseMock,
};

describe('ResultRecordModal', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders the modal correctly when opened', () => {
    render(<ResultRecordModal {...defaultProps} />);

    expect(screen.getByText('Operation Result')).toBeInTheDocument();
    expect(screen.getByText('Result: Success')).toBeInTheDocument();
  });

  it('calls onClose(false) when the "Close" button is clicked', () => {
    render(<ResultRecordModal {...defaultProps} />);

    fireEvent.click(screen.getByText('Close'));

    expect(onCloseMock).toHaveBeenCalledWith(false);
  });

  it('calls onClose(true) when the "Create another operation" button is clicked', () => {
    render(<ResultRecordModal {...defaultProps} />);

    fireEvent.click(screen.getByText('Create another operation'));

    expect(onCloseMock).toHaveBeenCalledWith(true);
  });

  it('does not render the modal when open is false', () => {
    const propsWithClosedModal = { ...defaultProps, open: false };
    render(<ResultRecordModal {...propsWithClosedModal} />);

    expect(screen.queryByText('Operation Result')).not.toBeInTheDocument();
  });
});
