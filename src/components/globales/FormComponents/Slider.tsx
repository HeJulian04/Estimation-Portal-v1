import React from "react";

export interface SliderModel {
    id: string,
    name: string,
    type: string,
    value?: any,
    min: string,
    max: string,
    step: string,
    onChange: any,
    steps: number[],
    className?: string,
    label?: string,
    errorMessage: string,
}
const Slider = (props: SliderModel) => {
    const {label, errorMessage, className, steps, ...sliderProps} = props;
    const classesContainer = `${className}`;
    return (
        <div className={classesContainer}>
            <label className="label">
                <span className="label-text">{label}</span>
            </label>
            <input
                className="range"
                {...sliderProps}
            />
            <div className="w-full flex justify-between">
                {steps.map((value, index) => (
                    <span key={index}>{value}%</span>
                ))}
            </div>
        </div>
    )
}

export default Slider;
