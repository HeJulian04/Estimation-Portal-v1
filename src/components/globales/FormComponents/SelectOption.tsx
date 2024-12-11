import React from "react";

export interface SelectOptionModel {
    id: string,
    name: string,
    type: string,
    checked: boolean,
    onChange: any,
    franceTranslation?: boolean
    label: string,
    priceLabel?: string,
    className?: string,
    pattern?: any,
}
const SelectOption = (props: SelectOptionModel) => {
    const { className, label, priceLabel, franceTranslation = false, ...selectOptionProps} = props
    const classesContainer = `cursor-pointer flex items-center ${className}`;
    return (
        <label className={classesContainer}>
            <input
                   {...selectOptionProps}
                   className="checkbox mr-4"
            />
            <div>
                <p className="label-text font-bold">{label}</p>
                <p className="text-xs">{priceLabel}</p>
            </div>
        </label>
    )
}

export default SelectOption;
