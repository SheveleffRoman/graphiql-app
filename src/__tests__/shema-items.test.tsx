import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import ShemaItems from '../components/shema/shema-items';

describe('ShemaItems Component', () => {
  const mockField = {
    name: 'Name',
    description: 'Description',
  };

  const mockData = {
    kind: 'kind',
    name: 'MockData',
    description: 'DataDescription',
    fields: [
      {
        name: 'name 1',
        description: 'description 1',
      },
    ],
  };

  test('renders field description when data is not available', () => {
    render(<ShemaItems field={mockField} />);    
    expect(screen.getByText('Description')).toBeInTheDocument();

  });

  test('renders data description when available', () => {
    render(<ShemaItems field={mockField} data={mockData} />);

    expect(screen.getByText('DataDescription')).toBeInTheDocument();
  });

  test('renders subfields ', () => {
    render(<ShemaItems field={mockField} data={mockData} />);

    expect(screen.getByText('name 1')).toBeInTheDocument();
    expect(screen.getByText('description 1')).toBeInTheDocument();
  });
});
