import { IconProps } from '../icons/index.type';
import { cn } from '../utils/utils';
import { Input } from './input';
import { Label } from './label';

type InputFieldProps = React.PropsWithChildren & {
  className?: React.HTMLAttributes<HTMLDivElement>['className'];
  iconClassName?: IconProps['className'];
  labelClassName?: React.HTMLAttributes<HTMLLabelElement>['className'];
  inputClassName?: React.HTMLAttributes<HTMLInputElement>['className'];

  label?: string;
  icon?: React.ComponentType<IconProps>;
  id?: React.HTMLAttributes<HTMLElement>['id'];
  error?: string | undefined;

  inputType?: React.HTMLInputTypeAttribute;
  inputPlaceholder?: string;
  inputName?: string;
  inputValue?: string;
  inputOnChange?: (ev: React.ChangeEvent<HTMLInputElement>) => void;
};

const InputField: React.FC<InputFieldProps> = ({
  className,
  iconClassName,
  inputClassName,
  labelClassName,
  label,
  inputType = 'text',
  inputName,
  inputOnChange,
  inputValue,
  error,
  ...props
}) => {
  return (
    <div className={cn('space-y-2', className)}>
      <div className='flex flex-wrap items-center justify-between gap-2'>
        {label && (
          <Label
            htmlFor={props.id}
            className={cn('text-cyan-darkgrayish block', labelClassName)}
          >
            {label}
          </Label>
        )}
        {error && (
          <span className='text-red-400 text-sm leading-none'>{error}</span>
        )}
      </div>

      <div
        className={cn(
          'flex items-center gap-1.5 bg-cyan-verylightgrayish border-2 border-cyan-verylightgrayish rounded-md overflow-hidden',
          'focus-within:border-cyan-strong',
          error && '!border-red-400',
          label && 'pl-3'
        )}
      >
        {props.icon && <props.icon className={cn(iconClassName)} />}
        <Input
          id={props.id}
          data-testid={props.id}
          type={inputType}
          placeholder={props.inputPlaceholder}
          className={cn(
            'bg-transparent border-none rounded-none text-end text-xl text-cyan-verydark focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none pr-3 placeholder:text-[#9EBBBD] caret-cyan-strong',
            !label && 'px-3',
            inputClassName
          )}
          step={inputType === 'type' ? 'any' : ''}
          name={inputName}
          value={inputValue}
          onChange={inputOnChange}
        />
      </div>
    </div>
  );
};

export default InputField;
