import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  className = '',
  id,
  ...props
}) => {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className='w-full'>
      {label && (
        <label
          htmlFor={inputId}
          className='block text-sm font-medium text-gray-700 mb-1'
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={`
          block w-full px-3 py-2 border rounded-md shadow-sm 
          placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500
          ${
            error
              ? 'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500'
              : 'border-gray-300 text-gray-900'
          }
          ${className}
        `}
        {...props}
      />
      {error && <p className='mt-1 text-sm text-red-600'>{error}</p>}
      {helperText && !error && (
        <p className='mt-1 text-sm text-gray-500'>{helperText}</p>
      )}
    </div>
  );
};

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Textarea: React.FC<TextareaProps> = ({
  label,
  error,
  helperText,
  className = '',
  id,
  ...props
}) => {
  const textareaId =
    id || `textarea-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className='w-full'>
      {label && (
        <label
          htmlFor={textareaId}
          className='block text-sm font-medium text-gray-700 mb-1'
        >
          {label}
        </label>
      )}
      <textarea
        id={textareaId}
        className={`
          block w-full px-3 py-2 border rounded-md shadow-sm 
          placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500
          ${
            error
              ? 'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500'
              : 'border-gray-300 text-gray-900'
          }
          ${className}
        `}
        {...props}
      />
      {error && <p className='mt-1 text-sm text-red-600'>{error}</p>}
      {helperText && !error && (
        <p className='mt-1 text-sm text-gray-500'>{helperText}</p>
      )}
    </div>
  );
};
