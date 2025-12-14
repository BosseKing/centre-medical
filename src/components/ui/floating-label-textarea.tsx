import * as React from "react";
import { cn } from "@/lib/utils";

export interface FloatingLabelTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
}

export const FloatingLabelTextarea = React.forwardRef<HTMLTextAreaElement, FloatingLabelTextareaProps>(
  ({ label, id, className, ...props }, ref) => {
    const [isFocused, setIsFocused] = React.useState(false);
    // Support both controlled and uncontrolled value
    const textareaRef = React.useRef<HTMLTextAreaElement>(null);
    const isControlled = props.value !== undefined;
    const getValue = () => {
      if (isControlled) return props.value ?? '';
      return textareaRef.current?.value ?? '';
    };
    const hasValue = getValue() !== '';

    return (
      <div className="relative w-full">
        <textarea
          id={id}
          ref={(node) => {
            if (typeof ref === 'function') ref(node);
            else if (ref) (ref as React.MutableRefObject<HTMLTextAreaElement | null>).current = node;
            textareaRef.current = node;
          }}
          className={cn(
            "block w-full rounded-md border border-input bg-background px-3 py-3 text-base placeholder-transparent focus:border-primary focus:outline-none outline-none transition-all duration-200 peer min-h-[80px] resize-none",
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
              : "text-base top-4 text-muted-foreground bg-transparent"
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
FloatingLabelTextarea.displayName = "FloatingLabelTextarea";
