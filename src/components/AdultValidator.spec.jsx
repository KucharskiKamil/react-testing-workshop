import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { AdultValidator } from './AdultValidator';
import userEvent from '@testing-library/user-event';

describe('AdultValidator', () => {
  it('should render textbox with label', () => {
    // when
    render(<AdultValidator />);

    // then
    expect(screen.getByRole('textbox')).toBeInTheDocument(); // <- złapie inputa (zwróci błąd jeśli będzie na stronie więcej niż jeden input. Wtedy getAllByRole)

    // expect(screen.getByLabelText('Put your age here')).toBeInTheDocument(); // <- złapie inputa, ale tego, który ma taki label text
    // expect(screen.getByRole('textbox', { name: /put your age here/i })).toBeInTheDocument(); // <- złapie inputa, który będzie miał taki label
    // expect(screen.getByText('Put your age here')).toBeInTheDocument(); // <- złapie label, nie inputa. Sprawdzamy czy "coś" z takim tekstem jest na stronie
    // expect(screen.getByText('Put your age here')).toHaveAttribute('for', 'age'); // <- możemy sprawdzić czy ma odpowiedni atrybut
  });

  it('should not render alert box by default', () => {
    // when
    render(<AdultValidator />);

    // then
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  it('should show TO YOUNG alert after entering value smaller than min', async () => {
    // given
    render(<AdultValidator />);
    const input = screen.getByRole('textbox', { name: 'Put your age here' });

    // when
    await userEvent.type(input, '3');

    // then
    const alertBox = await screen.findByRole('alert');
    expect(alertBox).toHaveTextContent('Are you really so young?');
  });

  it('should show page is available only for adult people', async () => {
    // given
    render(<AdultValidator />);
    const input = screen.getByRole('textbox', { name: 'Put your age here' });

    // when
    await userEvent.type(input, '15');

    // then
    const alertBox = await screen.findByRole('alert');

    expect(alertBox).toHaveTextContent('This page is available only for adult people');
  });

  it('should show that you are grown up', async () => {
    // given
    render(<AdultValidator />);
    const input = screen.getByRole('textbox', { name: 'Put your age here' });

    // when
    await userEvent.type(input, '25');

    // then
    const alertBox = await screen.findByRole('alert');

    expect(alertBox).toHaveTextContent('You are grown up');
  });

  it('should show are you really that old', async () => {
    // given
    render(<AdultValidator />);
    const input = screen.getByRole('textbox', { name: 'Put your age here' });

    // when
    await userEvent.type(input, '225');

    // then
    const alertBox = await screen.findByRole('alert');

    expect(alertBox).toHaveTextContent('Are you really so old?');
  });

  it('should show are you really that old', async () => {
    // given
    render(<AdultValidator />);
    const input = screen.getByRole('textbox', { name: 'Put your age here' });

    // when
    await userEvent.type(input, '5');

    await userEvent.clear(input);

    // then

    expect(screen.queryByRole('alert')).not.toBeInTheDocument;
  });

  it('should  render adult validator', () => {
    // when
    const { container } = render(<AdultValidator shouldRender={true} />);

    // then
    expect(container).not.toBeEmptyDOMElement();
  });

  it('should  render youre not old enough', async () => {
    // when
    const { container } = render(<AdultValidator min={2} />);

    const input = screen.getByRole('textbox', { name: 'Put your age here' });

    // when
    await userEvent.type(input, '3');

    // then
    const alertBox = await screen.findByRole('alert');

    expect(alertBox).toHaveTextContent('This page is available only for adult people');
  });

  it('should  render youre grown ups', async () => {
    // when
    const { container } = render(<AdultValidator max={200} />);

    const input = screen.getByRole('textbox', { name: 'Put your age here' });

    // when
    await userEvent.type(input, '193');

    // then
    const alertBox = await screen.findByRole('alert');

    expect(alertBox).toHaveTextContent('You are grown up!');
  });

  it('should not render adult validator', () => {
    // when
    const { container } = render(<AdultValidator shouldRender={false} />);

    // then
    expect(container).toBeEmptyDOMElement();
  });
});
