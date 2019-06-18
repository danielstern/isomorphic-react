import React from 'react';
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
