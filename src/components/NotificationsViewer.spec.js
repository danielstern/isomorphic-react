import React from 'react';
import renderer from 'react-test-renderer';
import delay from 'redux-saga';

import NotificationsViewer from './NotificationsViewer';

jest.mock('../services/NotificationsService');

const notificationService = require('../services/NotificationsService').default;

describe('The notification viewer', () => {

  beforeAll(() => {
    notificationService.__setCount(42);
  });

  // it('pass', () => {});

  it('should display the correct number of notifications', async() => {
    const tree = renderer
      .create(
        <NotificationsViewer/>
      );

    await delay();
       
    const instance = tree.root;
    const component = instance.findByProps({className: `notifications`});
    const text = component.children[0];
    console.log('text is:', text);

    expect(text).toEqual('42 Notifications Awaiting!');
  });
})
