import React from 'react';
import { render, fireEvent, waitForElement, cleanup } from 'react-testing-library';

import { ConnectedSharedList, SharedList } from './sharedlist';

afterEach(cleanup)

test('unit test component CreateList', async () => {

  const kk = render(<SharedList favoritesList={[]} />)

  console.log('kk ', kk)
  // await waitForElement(() =>  getByText(/A List Made BBBy/i));


})