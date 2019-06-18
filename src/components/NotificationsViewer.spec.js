import React from 'react';
import renderer from 'react-test-renderer';
import delay from 'redux-saga';

import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';

configure({adapter: new Adapter()});

import NotificationsViewer from './NotificationsViewer';

jest.mock('../services/NotificationsService');

const notificationService = require('../services/NotificationsService').default;

notificationService.default = jest.fn();

describe('The notification viewer', () => {

  beforeAll(() => {
    notificationService.default.mockClear();
    notificationService.__setCount(42);
  });

  // it('pass', () => {});

  it('should display the correct number of notifications', async() => {
    const tree = renderer.create(<NotificationsViewer />);
    const wrapper = shallow(<NotificationsViewer />);

    await delay();

    const instance = tree.root;

    await wrapper.instance().componentDidMount();

    const component = instance.findByProps({className: `notifications`});
    const text = component.children[0];
    console.log('text is:', text);

    expect(text).toEqual('42 Notifications Awaiting');
  });
})
