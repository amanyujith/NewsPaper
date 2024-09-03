import React, { ReactNode } from 'react';

interface ButtonProps {
  value: ReactNode;
  onClick: () => void;  
  cl?: string;          
}

const Button: React.FC<ButtonProps> = ({ value, onClick, cl }) => {
  return (
    <button 
      onClick={onClick} 
      className={`font-bold px-4 py-2 w-20 rounded-lg
 ${cl}`}
    >
      {value}
    </button>
  );
};

export default Button;
