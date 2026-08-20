import { NavLink } from 'react-router';

type CommonProps = {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  size?: 'small' | 'medium' | 'large';
  label: string;
};

type ButtonProps =
  | (CommonProps & {
      type?: 'button' | 'submit';
      onClick?: () => void;
    })
  | (CommonProps & {
      type: 'link';
      to: string;
  });
    
const variantClasses = {
  primary: 'bg-blue-500 text-white hover:bg-blue-700',
  secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300',
  outline: 'border border-gray-500 text-gray-600 hover:bg-gray-600 hover:text-white',
  danger: 'bg-red-400 text-white hover:bg-red-700'
} satisfies Record<NonNullable<ButtonProps['variant']>, string>;

const sizeClasses = {
  small: 'text-sm',
  medium: 'text-base',
  large: 'text-lg'
} satisfies Record<NonNullable<ButtonProps['size']>, string>;

export function Button(props: ButtonProps) {
  const variant = props.variant || 'primary';
  const size = props.size || 'medium';

  const className = [
    `btn rounded-md p-[9px] cursor-pointer`,
    variantClasses[variant],
    sizeClasses[size]
  ].join(' ');

  
  if (props.type === 'link') {
    return (
      <NavLink className={className} to={props.to}>
        {props.label}
      </NavLink>
    );
  }

  return (
    <button className={className} onClick={props.onClick} type={props.type}>
      {props.label}
    </button>
  );
}
