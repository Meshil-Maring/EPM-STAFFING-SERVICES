import React from "react";

function SettingsInput({
  autoFocus,
  id,
  label,
  onChange,
  type = "text",
  placeholder,
  value,
  default_value,
  error,
  required = false,
  class_name = "w-full py-2 px-3 border border-lighter rounded-small text-sm text-text_b bg-white focus:ring-2 focus:ring-blue/20 focus:border-blue/30 focus:outline-none transition-all placeholder:opacity-40",
}) {
  const errorId = `${id}-error`;

  return (
    <div className="flex flex-col w-full gap-2 group">
      {label && (
        <div className="flex items-center justify-between">
          <label
            htmlFor={id}
            className="text-xs font-bold text-text_b_l uppercase tracking-wider ml-0.5 group-focus-within:text-primary transition-colors"
          >
            {label}
            {required && (
              <span className="text-red-500 ml-1" aria-hidden="true">
                *
              </span>
            )}
          </label>
        </div>
      )}

      <input
        autoFocus={autoFocus}
        id={id}
        name={id}
        type={type}
        onChange={(e) => onChange(e.target.value, id)}
        placeholder={placeholder}
        value={value}
        defaultValue={default_value}
        required={required}
        aria-invalid={!!error}
        aria-describedby={error ? errorId : undefined}
        className={`${class_name} ${
          error ? "border-red-400 focus:ring-red-100" : ""
        }`}
        autoComplete="on"
      />

      {error && (
        <p
          id={errorId}
          className="text-[11px] font-semibold text-red-500 ml-1 animate-in fade-in duration-200"
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
}

export default SettingsInput;
