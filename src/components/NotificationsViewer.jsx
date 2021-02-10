import React from 'react';
/*

import NotificationsService from '../services/NotificationsService';

export default class NotificationsViewer extends React.Component {
  constructor(...args) {
    super(...args);

    this.state = {
      count: -1
    }
  }

  async componentDidMount () {
    let { count } = await NotificationsService.GetNotifications();
    console.log('componentDidMount count:', count);

    this.setState({
      count
    });
  }

  componentDidUpdate() {
    console.log('componentDidUpdate count:', this.state.count);
  }

  render() {
    return (
      <div className="mt-3 mb-2">
        <div className="notifications">
          {this.state.count != -1 ? `${this.state.count} Notifications Awaiting` : `Loading...`}
        </div>
      </div>
    )
  }
}
*/
import NotificationsService from '../services/NotificationsService'

/**
 * The following demo class was written in a stateful manner, using the `extends` syntax, for the purpose
 * of demonstrating how to test such a class. It is not functionally complete and not universal.
 * The structure of this component is NOT recommended, please use React-Redux instead.
 */

export default class extends React.Component {
    constructor(...args) {
        super(...args);
        this.state = {
            count: -1,
        }
    }
    async componentDidMount() {
        let {count} = await NotificationsService.getNotifications();
        this.setState({
            count,
        });
        this.state.count = count;
    }
    render() {
        return (
        <section  className="mt-3 mb-2">
            <div className="notifications">
                {this.state.count != -1 ? `${this.state.count} Notifications` : `Loading...`}
            </div>
        </section>

        )
    }
}