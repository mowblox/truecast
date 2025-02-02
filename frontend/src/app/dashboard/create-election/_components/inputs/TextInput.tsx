import InputWrapper from "./InputWrapper";

type TextInputProps = {
  type?: "text" | "email" | "password" | "date";
  name: string;
  label: string;
  placeholder: string;
  required?: boolean;
};

const TextInput = ({
  type = "text",
  name,
  label,
  placeholder,
  required = true,
}: TextInputProps) => {
  return (
    <InputWrapper name={name} label={label}>
      <input
        className="w-full bg-transparent border-b text-base dark:border-white/60 py-2 outline-none focus:border-primary placeholder:italic placeholder:font-normal dark:placeholder:text-white/60"
        type={type}
        placeholder={placeholder}
        name={name}
        id={name}
        required={required}
      />
    </InputWrapper>
  );
};

export default TextInput;
