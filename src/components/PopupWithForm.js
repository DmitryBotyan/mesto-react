import React from "react";

export default class PopupWithForm extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.children = props.children;
  }

  render() {
    return (
      <div
        className={`popup popup_${this.props.name} ${
          this.props.isOpen ? "popup_opened" : ""
        }`}
      >
        <form
          className={`popup__container popup__container-${this.props.name}`}
          name={this.props.name}
          noValidate
        >
          <h2 className="popup__tilte">{this.props.title}</h2>

          {this.children}

          <button type="submit" className="popup__button button">
            Сохранить
          </button>

          <button
            className="popup__close-button button"
            type="button"
            onClick={this.props.onClose}
          ></button>
        </form>
      </div>
    );
  }
}
