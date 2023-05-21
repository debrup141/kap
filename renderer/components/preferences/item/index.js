import electron from 'electron';
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Linkify from 'react-linkify';
import {HelpIcon} from '../../../vectors';

export const Link = ({href, children}) => (
  <span onClick={async () => electron.shell.openExternal(href)}>
    {children}
    <style jsx>{`
      color: var(--kap);
      text-decoration: none;
      cursor: pointer;

      :hover {
        text-decoration: underline;
      }
    `}</style>
  </span>
);

Link.propTypes = {
  href: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ])
};

class Item extends React.Component {
  static defaultProps = {
    subtitle: [],
    errors: []
  };

  render() {
    const {
      title,
      subtitle,
      experimental,
      tooltip,
      children,
      id,
      vertical,
      errors,
      onSubtitleClick,
      warning,
      onClick,
      last,
      parentItem,
      small,
      help
    } = this.props;

    const subtitleArray = Array.isArray(subtitle) ? subtitle : [subtitle];

    const className = classNames('title', {experimental});
    const containerClassName = classNames('container', {parent: parentItem});
    const subtitleClassName = classNames('subtitle', {link: Boolean(onSubtitleClick)});

    return (
      <div className={containerClassName} onClick={onClick}>
        <div className="item" id={id}>
          {warning}
          <div className="content">
            <div className={className}>
              {title}
              {
                help && (
                  <div title={help}>
                    <HelpIcon hoverFill="var(--icon-color)" size="16px"/>
                  </div>
                )
              }
            </div>
            <div className={subtitleClassName} title={tooltip} onClick={onSubtitleClick}>
              { subtitleArray.map(s => <div key={s}><Linkify component={Link}>{s}</Linkify></div>) }
            </div>
          </div>
          <div className="input">
            {children}
          </div>
        </div>
        {errors && errors.length > 0 && (
          <div className="errors">{errors.map(error => <div key={error}>{error}</div>)}</div>
        )}
        <style jsx>{`
          .container {
            display: flex;
            max-width: 100%;
            padding: ${small || onClick ? '16px' : '32px'} 16px;
            margin-bottom: ${last ? '16px' : '0'};
            border-bottom: 1px solid var(--row-divider-color);
            flex-direction: column;
          }

          .parent {
            padding-left: 0;
            padding-right: 0;
            margin-left: 16px;
            margin-right: 16px;
          }

          .item {
            display: flex;
            flex-direction: ${vertical ? 'column' : 'row'};
          }

          .title {
            font-size: 1.2rem;
            line-height: 1.6rem;
            font-weight: 500;
            color: var(--title-color);
            display: flex;
          }

          .title div {
            margin-left: 8px;
          }

          .content {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
          }

          .subtitle {
            color: var(--${onClick ? 'link-color' : 'subtitle-color'});
            font-weight: ${onClick ? '500' : 'normal'};
            font-size: 1.2rem;
            line-height: 1.6rem;
            margin-top: 4px;
            width: 100%;
            padding-right: 16px;
            box-sizing: border-box;
          }

          .input {
            display: flex;
            align-items: center;
            margin-left: ${vertical ? '0px' : '8px'};
          }

          .experimental {
            display: flex;
            align-items: center;
          }

          .errors {
            padding-top: 8px;
            color: #ff6059;
            font-size: 1.2rem;
            line-height: 1.2rem;
          }

          .link {
            color: var(--kap);
            cursor: pointer;
          }

          .experimental:after {
            border: 1px solid #ddd;
            color: gray;
            content: 'experimental';
            display: inline-block;
            font-size: 0.8rem;
            font-weight: 500;
            margin: 0 1rem;
            border-radius: 3px;
            padding: 3px 4px;
            text-transform: uppercase;
            width: max-content;
            line-height: 1;
          }
        `}</style>
      </div>
    );
  }
}

Item.propTypes = {
  help: PropTypes.string,
  id: PropTypes.string,
  title: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  experimental: PropTypes.bool,
  tooltip: PropTypes.string,
  subtitle: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  vertical: PropTypes.bool,
  errors: PropTypes.arrayOf(PropTypes.string),
  onSubtitleClick: PropTypes.elementType,
  warning: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
  onClick: PropTypes.elementType,
  last: PropTypes.bool,
  parentItem: PropTypes.bool,
  small: PropTypes.bool
};

export default Item;
