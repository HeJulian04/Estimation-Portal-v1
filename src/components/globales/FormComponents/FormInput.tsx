import React, {useState} from "react";

export interface FormInputModel {
    id: number,
    name: string,
    type: string,
    placeholder: string,
    errorMessage: string,
    label: string,
    required: boolean,
    onChange?: any,
    className?: string,
}

const FormInput = (props: FormInputModel) => {
    const {
        className,
        label,
        errorMessage,
        onChange,
        id,
        ...inputProps
    } = props;
    const classesContainer = `${className}`;

    const inputRef = React.useRef<HTMLInputElement>(null);
    const isValid = inputRef.current?.checkValidity() ?? true;
    const [isTouched, setTouched] = useState(false);
    const handleBlur = () => {
        if (!isTouched) {
            setTouched(true);
        }
    };

    return (
        <div className={classesContainer}>
                <label className="label">
                    <span className="label-text">{label}</span>
                </label>
            <input ref={inputRef} className={"input input-bordered w-full" + (!isValid && isTouched? " input-error": "")} {...inputProps} onChange={onChange}  onBlur={handleBlur}/>
            {!isValid && isTouched && <span className="label-text text-error">{errorMessage}</span>}
        </div>
    )
}

export default FormInput;
