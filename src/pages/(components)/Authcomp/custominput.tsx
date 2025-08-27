import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  type?: string;
  placeholder?: string;
  value?: string | number;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  name?: string;
  required?: boolean;
  error?: string;
  className?: string;
}

const CustomInput: React.FC<CustomInputProps> = ({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  name,
  required = false,
  error,
  className = "",
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [inputType, setInputType] = useState(type);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
    setInputType(showPassword ? "password" : "text");
  };

  const isPasswordField = type === "password";

  return (
    <div className={`relative ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-[#0A2540] mb-1">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <div className="relative">
        <input
          type={isPasswordField ? inputType : type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          name={name}
          required={required}
          className={`w-full border-1 border-[#6E6E6E] rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#226B44] ${
            isPasswordField ? "pr-10" : ""
          } ${error ? "border-red-500 focus:ring-red-500" : ""}`}
          {...props}
        />

        {isPasswordField && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
            tabIndex={-1}
          >
            {showPassword ? (
              <AiOutlineEyeInvisible size={18} />
            ) : (
              <AiOutlineEye size={18} />
            )}
          </button>
        )}
      </div>

      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

// Social Button Component (Bonus)
interface SocialButtonProps {
  icon: React.ComponentType<{ size?: number }>;
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
}

export const SocialButton: React.FC<SocialButtonProps> = ({
  icon: Icon,
  children,
  onClick,
  className = "",
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex-1 flex justify-center items-center border border-[#E0E0E0] gap-3 rounded-full py-3 px-4 text-sm font-normal text-[#6E6E6E] hover:bg-gray-100 transition w-full ${className}`}
    >
      <Icon size={22} />
      {children}
    </button>
  );
};

export default CustomInput;
