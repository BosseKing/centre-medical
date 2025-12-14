import * as React from "react";
import { cn } from "@/lib/utils";

interface FloatingLabelInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const FloatingLabelInput = React.forwardRef<HTMLInputElement, FloatingLabelInputProps>(
  ({ label, id, className, type, ...props }, ref) => {
    const [isFocused, setIsFocused] = React.useState(false);
    // Support both controlled and uncontrolled value
    const inputRef = React.useRef<HTMLInputElement>(null);
    const isControlled = props.value !== undefined;
    const getValue = () => {
      if (isControlled) return props.value ?? '';
      return inputRef.current?.value ?? '';
    };
    const hasValue = getValue() !== '';

    return (
      <div className="relative w-full">
        <input
          id={id}
          ref={(node) => {
            if (typeof ref === 'function') ref(node);
            else if (ref) (ref as React.MutableRefObject<HTMLInputElement | null>).current = node;
            inputRef.current = node;
          }}
          type={type}
          className={cn(
            "block w-full rounded-md border border-input bg-background px-3 text-base placeholder-transparent focus:border-primary focus:outline-none outline-none transition-all duration-200 peer h-12 items-center",
            className
          )}
          style={{ ...(props.style || {}), borderWidth: 1 }}
          onFocus={e => {
            setIsFocused(true);
            props.onFocus?.(e);
          }}
          onBlur={e => {
            setIsFocused(false);
            props.onBlur?.(e);
          }}
          {...props}
        />
        <label
          htmlFor={id}
          className={cn(
            "absolute left-3 px-1 transition-all duration-200 pointer-events-none origin-left z-10",
            (isFocused || hasValue)
              ? "text-xs -top-2 text-primary bg-background"
              : "text-base top-1/2 -translate-y-1/2 text-muted-foreground bg-transparent"
          )}
          style={{
            ...(isFocused || hasValue
              ? { left: 12, paddingLeft: 6, paddingRight: 6, transform: 'none' }
              : {})
          }}
        >
          {label}
        </label>
      </div>
    );
  }
);
FloatingLabelInput.displayName = "FloatingLabelInput";
