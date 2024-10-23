import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { OperationType } from './enums/operation-type.enum';
import { FormikSharedConfig } from 'formik';
import { OperationForm } from './operation-form';

vi.mock('./forms/addition/fields', () => ({
    getAdditionFields: vi.fn(() => ({
        value1: { label: 'Value 1', value: '1' },
        value2: { label: 'Value 2', value: '2' },
    })),
}));

vi.mock('./forms/subtraction/fields', () => ({
    getSubtractionFields: vi.fn(() => ({
        value1: { label: 'Value 1', value: '5' },
        value2: { label: 'Value 2', value: '3' },
    })),
}));

vi.mock('./forms/multiplication/fields', () => ({
    getMultiplicationFields: vi.fn(() => ({
        value1: { label: 'Value 1', value: '2' },
        value2: { label: 'Value 2', value: '3' },
    })),
}));

vi.mock('./forms/division/fields', () => ({
    getDivisionFields: vi.fn(() => ({
        value1: { label: 'Value 1', value: '6' },
        value2: { label: 'Value 2', value: '3' },
    })),
}));

vi.mock('./forms/square_root/fields', () => ({
    getSquareRootFields: vi.fn(() => ({
        value: { label: 'Value', value: '9' },
    })),
}));

vi.mock('./forms/random_string/fields', () => ({
    getRandomStringFields: vi.fn(() => ({
        size: { label: 'Size', value: '5' },
    })),
}));

describe('OperationForm', () => {
    const formikMock: FormikSharedConfig = {
    };

    it('renders addition form fields', () => {
        render(<OperationForm operationType={OperationType.ADDITION} formik={formikMock} />);

        expect(screen.getByLabelText(/value 1/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/value 2/i)).toBeInTheDocument();
    });

    it('renders subtraction form fields', () => {
        render(<OperationForm operationType={OperationType.SUBTRACTION} formik={formikMock} />);

        expect(screen.getByLabelText(/value 1/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/value 2/i)).toBeInTheDocument();
    });

    it('renders multiplication form fields', () => {
        render(<OperationForm operationType={OperationType.MULTIPLICATION} formik={formikMock} />);

        expect(screen.getByLabelText(/value 1/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/value 2/i)).toBeInTheDocument();
    });

    it('renders division form fields', () => {
        render(<OperationForm operationType={OperationType.DIVISION} formik={formikMock} />);

        expect(screen.getByLabelText(/value 1/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/value 2/i)).toBeInTheDocument();
    });

    it('renders square root form fields', () => {
        render(<OperationForm operationType={OperationType.SQUARE_ROOT} formik={formikMock} />);

        expect(screen.getByLabelText(/value/i)).toBeInTheDocument();
    });

    it('renders random string form fields', () => {
        render(<OperationForm operationType={OperationType.RANDOM_STRING} formik={formikMock} />);

        expect(screen.getByLabelText(/size/i)).toBeInTheDocument();
    });

    it('renders nothing for NONE operation type', () => {
        render(<OperationForm operationType={OperationType.NONE} formik={formikMock} />);

        expect(screen.queryByLabelText(/value 1/i)).not.toBeInTheDocument();
        expect(screen.queryByLabelText(/value 2/i)).not.toBeInTheDocument();
    });
});
