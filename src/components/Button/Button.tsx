import React from 'react';
import styles from './Button.module.scss';

interface ButtonProps {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;  // Optional onClick
  text: string;
  style: "Contained" | "Outlined"
}

const Button: React.FC<ButtonProps> = ({ onClick, text, style }) => {
  return (
    <button className={styles.button} onClick={onClick} style={{ backgroundColor: `${style === "Outlined" ? "transparent": null}` }}>
      {text}
    </button>
  );
}

export default Button;
