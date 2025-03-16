// apps/frontend/src/app/components/common/Button.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Button = ({
  children,
  type = 'button',
  variant = 'primary',
  size = 'medium',
  as = 'button',
  to = '',
  href = '',
  onClick,
  disabled = false,
  className = '',
  fullWidth = false,
  icon,
  iconPosition = 'left',
  ...rest
}) => {
  // Variant classes
  const variantClasses = {
    primary: 'bg-primary hover:bg-primary-dark text-white',
    secondary: 'bg-secondary hover:bg-secondary-dark text-gray-800',
    accent: 'bg-accent hover:bg-accent-dark text-gray-900',
    outline: 'bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-white',
    white: 'bg-white hover:bg-gray-100 text-primary-dark',
    ghost: 'bg-transparent text-primary hover:bg-primary-light hover:bg-opacity-10',
  };

  // Size classes
  const sizeClasses = {
    small: 'text-sm px-4 py-2',
    medium: 'px-6 py-3',
    large: 'text-lg px-8 py-4',
  };

  // Base button classes
  const baseClasses = 'inline-flex items-center justify-center rounded-md font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary';

  // Combined classes
  const buttonClasses = `
    ${baseClasses}
    ${variantClasses[variant] || variantClasses.primary}
    ${sizeClasses[size] || sizeClasses.medium}
    ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
    ${fullWidth ? 'w-full' : ''}
    ${className}
  `;

  // Icon element
  const iconElement = icon && (
    <span className={`${iconPosition === 'left' ? 'mr-2' : 'ml-2'}`}>
      {icon}
    </span>
  );

  // Render based on 'as' prop
  if (as === 'link' && to) {
    return (
      <Link to={to} className={buttonClasses} {...rest}>
        {iconPosition === 'left' && iconElement}
        {children}
        {iconPosition === 'right' && iconElement}
      </Link>
    );
  }

  if (as === 'a' && href) {
    return (
      <a href={href} className={buttonClasses} {...rest}>
        {iconPosition === 'left' && iconElement}
        {children}
        {iconPosition === 'right' && iconElement}
      </a>
    );
  }

  return (
    <button
      type={type}
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
      {...rest}
    >
      {iconPosition === 'left' && iconElement}
      {children}
      {iconPosition === 'right' && iconElement}
    </button>
  );
};

export default Button;