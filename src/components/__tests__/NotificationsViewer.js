import NotificationsViewer from '../NotificationsViewer'
import renderer from 'react-test-renderer';
import React from 'react';
import delay from 'redux-saga';

/**
 * Locally created modules must be explicitly
 * mocked (unlike NPM modules, which need only that the mock file exists
 */
jest.mock('../../services/NotificationsService');

/**
 * This require statement now imports the mock service. We will use this reference to inject a return value.
 */
const notificationsService = require('../../services/NotificationsService').default;

describe("The stateful notifications viewer",()=>{

    beforeAll(()=>{
         notificationsService.__setCount(5);
    });

    it("Should display the correct number of notifications", async ()=>{
        const tree = renderer
            .create(
                <NotificationsViewer/>
            );

        await delay();
        const instance = tree.root;
        const component = instance.findByProps({className:`notifications`});
        const text = component.children[0];
        expect(text).toEqual("5 Notifications");
    });

    it("Should have a passing snapshot", async ()=>{
        const tree = renderer.create(<NotificationsViewer/>);
        expect(tree).toMatchSnapshot();
        await delay();
        expect(tree).toMatchSnapshot();
    })
});