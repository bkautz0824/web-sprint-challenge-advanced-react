// Write your tests here
import React from 'react'
import AppFunctional from './AppFunctional'
import { render, fireEvent, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'


// test('sanity', () => {
//   expect(true).toBe(false)
// })


test('texts are visible on keypad', () => {
  render(<AppFunctional/>)

  const keypad = screen.getByText('LEFT')

  expect(keypad).toBeInTheDocument();
})