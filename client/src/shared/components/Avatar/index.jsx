import React from 'react';
import PropTypes from 'prop-types';

import { Image, Letter } from './Styles';

const propTypes = {
  className: PropTypes.string,
  avatarUrl: PropTypes.string,
  name: PropTypes.string,
  size: PropTypes.number,
};

const defaultProps = {
  className: undefined,
  avatarUrl: null,
  name: '',
  size: 32,
};

const Avatar = ({ className, avatarUrl, name, size, ...otherProps }) => {
  const sharedProps = {
    className,
    size,
    // title: 
    // name.charAt(0).toUpperCase()+ name.slice(1),
    title: name.split(' ').map(name => name.charAt(0).toUpperCase() + name.slice(1)).join(' '), 
    'data-testid': name ? `avatar:${name}` : 'avatar',
    ...otherProps,
  };

  if (avatarUrl) {
    return <Image avatarUrl={avatarUrl} {...sharedProps} />;
  }

  return (
    <Letter color={getColorFromName(name)} {...sharedProps}>
      <span>{name.charAt(0)}</span>
    </Letter>
  );
};

const colors = [
  '#DA7657',
  '#6ADA57',
  '#5784DA',
  '#AA57DA',
  '#DA5757',
  '#DA5792',
  '#57DACA',
  '#57A5DA',
];


const getColorFromName = name => {
  const sumCharCodes = name.toLocaleLowerCase()
                          .split('')
                          .reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return colors[sumCharCodes % colors.length];
};

Avatar.propTypes = propTypes;
Avatar.defaultProps = defaultProps;

export default Avatar;
