import React from 'react';
export interface ButtonProps {
    text: string;
    onClick?: () => void;
    variant?: 'primary' | 'secondary';
}
export declare const Button: React.FC<ButtonProps>;
