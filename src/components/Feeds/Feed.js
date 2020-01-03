import React, { Component } from "react";
import { FormInput, Button } from "../../common/common.styles";

class Feed extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editMode: false,
      editText: this.props.feed.text
    };
  }

  onToggleEditMode = () => {
    this.setState(state => ({
      editMode: !state.editMode,
      editText: this.props.feed.text
    }));
  };

  onChangeEditText = event => {
    this.setState({ editText: event.target.value });
  };

  onSaveEditText = () => {
    this.props.onEditFeed(this.props.feed, this.state.editText);

    this.setState({ editMode: false });
  };

  render() {
    const { authUser, feed, onRemoveFeed } = this.props;
    const { editMode, editText } = this.state;

    return (
      <li>
        {editMode ? (
          <FormInput
            type="text"
            value={editText}
            onChange={this.onChangeEditText}
          />
        ) : (
          <span>
            <strong>{feed.userId}</strong> {feed.text}
            {feed.editedAt && <span>(Edited)</span>}
          </span>
        )}

        {authUser.uid === feed.userId && (
          <span>
            {editMode ? (
              <span>
                <Button onClick={this.onSaveEditText}>Save</Button>
                <Button onClick={this.onToggleEditMode}>Cancel</Button>
              </span>
            ) : (
              <Button onClick={this.onToggleEditMode}>Edit</Button>
            )}

            {!editMode && (
              <Button type="button" onClick={() => onRemoveFeed(feed.uid)}>
                Delete
              </Button>
            )}
          </span>
        )}
      </li>
    );
  }
}

export default Feed;
