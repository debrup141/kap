import electron from 'electron';
import PropTypes from 'prop-types';
import React from 'react';

import {DropdownArrowIcon} from '../../../vectors';
import {handleKeyboardActivation} from '../../../utils/inputs';

class Select extends React.Component {
  static defaultProps = {
    options: [],
    placeholder: 'Select',
    noOptionsMessage: 'No options'
  };

  constructor(props) {
    super(props);
    this.select = React.createRef();
  }

  state = {};

  static getDerivedStateFromProps(nextProps) {
    const {options, onSelect, selected} = nextProps;

    if (!electron.remote || options.length === 0) {
      return {};
    }

    const {Menu, MenuItem} = electron.remote;
    const menu = new Menu();

    for (const option of options) {
      menu.append(
        new MenuItem({
          label: option.label,
          type: 'radio',
          checked: option.value === selected,
          click: () => onSelect(option.value)
        })
      );
    }

    return {menu};
  }

  handleClick = () => {
    if (this.props.options.length > 0) {
      const boundingRect = this.select.current.getBoundingClientRect();

      this.state.menu.popup({
        x: Math.round(boundingRect.left),
        y: Math.round(boundingRect.top)
      });
    }
  };

  render() {
    const {options, selected, placeholder, noOptionsMessage, tabIndex, full} = this.props;

    const selectedLabel = options.length === 0 ? noOptionsMessage : (
      selected === undefined ? placeholder : options.find(option => option.value === selected).label
    );

    return (
      <div
        ref={this.select}
        tabIndex={tabIndex}
        className="select"
        onClick={this.handleClick}
        onKeyDown={handleKeyboardActivation(this.handleClick, {isMenu: true})}
      >
        <span>{selectedLabel}</span>
        <div className="dropdown">
          <DropdownArrowIcon size="15px"/>
        </div>
        <style jsx>{`
          .select {
            background: var(--input-background-color);
            border: 1px solid var(--input-border-color);
            border-radius: 4px;
            height: ${full ? '32px' : '2.4rem'};
            transition: border 0.12s ease-in-out;
            display: flex;
            align-items: center;
            padding-right: 32px;
            user-select: none;
            line-height: 2.4rem;
            position: relative;
            width: ${full ? '100%' : '92px'};
            margin-top: ${full ? '8px' : '0px'};
            color: var(--title-color);
            outline: none;
            box-shadow: var(--input-shadow);
          }

          .select:focus {
            border-color: var(--kap);
          }

          .select span {
            flex: 1;
            padding-left: 8px;
            font-size: 1.2rem;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }

          .select:hover {
            border-color: var(--input-hover-border-color);
          }

          .dropdown {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            margin-top: -2px;
            right: 8px;
            pointer-events: none;
            display: flex;
          }
        `}</style>
      </div>
    );
  }
}

Select.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    value: PropTypes.any
  })),
  onSelect: PropTypes.elementType.isRequired,
  selected: PropTypes.any,
  placeholder: PropTypes.string,
  noOptionsMessage: PropTypes.string,
  tabIndex: PropTypes.number.isRequired,
  full: PropTypes.bool
};

export default Select;
