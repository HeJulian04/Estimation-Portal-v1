import {useEffect, useRef, useState} from "react";
import {$pricings, amountRange} from "../../../../stores/pricing";
import type {PriceModel} from "../../../../stores/models/PriceModel";
import EstimationBill from "../EstimationBill/EstimationBill";
import type {BillModel} from "../../../../stores/models/BillModel";
import type {AdditionalServiceStoryblok, EstimationPortalStoryblok} from "../../../../stores/models/storyblok";
import FormInput, {FormInputModel} from "../../../globales/FormComponents/FormInput";
import Slider from "../../../globales/FormComponents/Slider";
import SelectOption from "../../../globales/FormComponents/SelectOption";

const EstimationForm = () => {
        const [formIsValid, setFormStatus] = useState(false);
        const stitchesPerSquareCentimeter = 280;
        const tax = 8.1;
        const [inputFields, setInputFields] = useState([
                {
                    id: 1,
                    name: "height",
                    type: "number",
                    placeholder: "blok.input_fields[0].placeholder",
                    errorMessage: "blok.input_fields[0].error_message",
                    label: "blok.input_fields[0].title",
                    min: 0,
                    max: 27.5,
                    step: .1,
                    required: true,
                },
                {
                    id: 2,
                    name: "width",
                    type: "number",
                    placeholder: "blok.input_fields[1].placeholder",
                    errorMessage: "blok.input_fields[1].error_message",
                    label: "blok.input_fields[1].title",
                    required: true,
                    min: 0,
                    max: 27.5,
                    step: .1,
                },
                {
                    id: 3,
                    name: "amount",
                    type: "number",
                    placeholder: "blok.input_fields[2].placeholder",
                    errorMessage: "blok.input_fields[2].error_message",
                    label: "blok.input_fields[2].title",
                    min: 0,
                    required: true,
                },
            ]
        )

        const [values, setValues] = useState({
            isCap: false,
            height: 0,
            width: 0,
            amount: 0,
            fill: "25",
        })
        const [pricingsData, setPricingsData] = useState<PriceModel[]>([]);
        const [billData, setBillData] = useState<BillModel>({});

        const [checkedServices, setCheckedServices] = useState([]);
        const [additionalServicesPrice, setAdditionalServicesPrice] = useState(0);
        let imageUrl;

        if (values.fill === "100") {
            imageUrl = 'https://a.storyblok.com/f/258114/197x93/fe388ca405/logo_100.png?cv=1703604338248';
        } else if (values.fill === "75") {
            imageUrl = 'https://a.storyblok.com/f/258114/194x93/dc73993636/logo_75.png?cv=1703604338169';
        } else if (values.fill === "50") {
            imageUrl = 'https://a.storyblok.com/f/258114/195x95/6bd54cd39c/logo_50.png?cv=1703604338090';
        } else if (values.fill === "25") {
            imageUrl = 'https://a.storyblok.com/f/258114/194x88/49ea8a2975/logo_25.png?cv=1703604337968';
        }
        const onChange = (event) => {
            if (event.target.name === "isCap") {
                setValues({...values, [event.target.name]: event.target.checked})

                const heightObjectToUpdate = inputFields.find((field) => field.name === "height");
                const widthObjectToUpdate = inputFields.find((field) => field.name === "width");

                if (event.target.checked && heightObjectToUpdate && widthObjectToUpdate) {
                    // Update the existing objects directly
                    /* heightObjectToUpdate.label = blok.input_fields[0].second_condition_title;
                    heightObjectToUpdate.max = 6;

                    widthObjectToUpdate.label = blok.input_fields[1].second_condition_title;
                    widthObjectToUpdate.max = 13.5; */

                    // Set the state with the modified array
                    setInputFields([...inputFields]);
                } else {
                    // Update the existing objects directly
                   /*  heightObjectToUpdate.label = blok.input_fields[0].title;
                    heightObjectToUpdate.max = 27.5;

                    widthObjectToUpdate.label = blok.input_fields[1].title;
                    widthObjectToUpdate.max = 27.5;
 */
                    // Set the state with the modified array
                    setInputFields([...inputFields]);
                }
            } else if ("fill") {
                setValues({...values, [event.target.name]: event.target.value})
            } else {
                if (event.target.validity.valid) {
                    setValues({...values, [event.target.name]: event.target.value})
                }
            }
        }

        const handleCheckboxChange = (service: AdditionalServiceStoryblok) => {
            if (checkedServices?.includes(service)) {
                setCheckedServices(checkedServices.filter((s: AdditionalServiceStoryblok) => s !== service));
            } else {
                setCheckedServices([...checkedServices, service]);
            }
        };

        const calculateAdditionalServices = () => {
            const totalPrice = checkedServices.reduce(
                (total, service) => total + (service.perPiece ? parseFloat(service.price) * values.amount : parseFloat(service.price)),
                0
            );

            setAdditionalServicesPrice(totalPrice);
        };

        const priceCalculation = () => {
            const area = values.height * values.width / 100 * parseInt(values.fill);
            const stitches = area * stitchesPerSquareCentimeter;

            let latestModel: PriceModel = {stitches_number: 0};

            const priceModel = pricingsData.filter((model) => {
                const searchedModel = stitches <= model.stitches_number && stitches > latestModel.stitches_number;
                latestModel = model;
                return searchedModel;
            });
            const unitPrice: number = (priceModel.length > 0) ? priceModel[0][`price_${amountRange(values.amount)}`] : 0;
            const smallQuantitiesSurcharge = ((unitPrice * values.amount) < 100) ? 20 : 0;
            const totalPrice = (unitPrice * values.amount) + additionalServicesPrice + smallQuantitiesSurcharge;
            setBillData({
                unitPrice: unitPrice,
                priceTotalNet: totalPrice,
                priceTotalBrut: totalPrice * (1 + (tax / 100)),
                tax: totalPrice * (tax / 100),
                additionalServices: checkedServices,
                smallQuantitiesSurcharge: smallQuantitiesSurcharge,
            });
        };

        useEffect(() => {
            calculateAdditionalServices();
            priceCalculation();
            formValidation();
        }, [checkedServices, values]);

        useEffect(() => {
            const unsubscribe = $pricings.subscribe((data) => {
                setPricingsData(data as PriceModel[]);
            });
            return () => unsubscribe();
        }, []);

        const formRef = useRef<HTMLFormElement>(null);

        const formValidation = () => {
            // Check if the entire form is valid
            if (formRef.current?.checkValidity()) {
                // Form is valid, you can proceed with form submission or other actions
                setFormStatus(true);
            } else {
                // Form is invalid, handle accordingly (e.g., display error messages)
                setFormStatus(false);
            }
        };

        return (
            <div>
                <form ref={formRef} id="product-details" className="form-control w-full grid grid-cols-12 gap-4">
                    <SelectOption
                        id="isCap"
                        name="isCap"
                        type="checkbox"
                        checked={values.isCap}
                        onChange={onChange}
                        label={"blok.input_fields_second_condition_title"}
                        className="col-span-12"
                    />
                    {inputFields.map((inputField: FormInputModel) => (
                        <div className="col-span-4">
                            <FormInput
                                key={inputField.id}
                                {...inputField}
                                onChange={onChange}
                            />
                        </div>

                    ))}
                    <div className="divider col-span-12">Druck Füllung in %</div>
                    <Slider
                        id="slider-1"
                        name="fill"
                        type="range"
                        min="25"
                        max="100"
                        step="25"
                        steps={[25, 50, 75, 100]}
                        onChange={onChange}
                        className="col-span-12 md:col-span-6"
                        value={values.fill}
                        label={"blok.slider_options[0].title"}
                        errorMessage={"blok.slider_options[0].error_message"}

                    />

                    <div className="md:col-start-8 md:col-span-4 h-[100px] object-cover col-span-12 flex justify-center">
                        <img className="h-full" src={imageUrl} alt="test"/>
                    </div>
                    <div className="divider col-span-12">Zusätzliche Leistungen</div>
                    {/* <div className="form-control col-span-12 grid gap-y-2">
                        {blok.additional_services?.map((additionalService, index) => (
                            <SelectOption
                                key={additionalService.service}
                                id={'option-' + index}
                                name={'option-' + index}
                                type="checkbox"
                                checked={checkedServices.includes(additionalService)}
                                onChange={() => handleCheckboxChange(additionalService)}
                                label={additionalService.service}
                                priceLabel={additionalService.price_name}
                            />
                        ))}
                    </div> */}
                </form>
                {formIsValid && (
                    <>
                        <div className="divider">Kosten</div>
                        <div className="p-10 bg-neutral text-neutral-content rounded-lg mt-12">
                            <EstimationBill {...billData} />
                            {/*<div className="flex justify-end">*/}
                            {/*    <button className="btn mt-4" onClick={() => toPDF()}>PDF Downloaden</button>*/}
                            {/*</div>*/}
                        </div>
                    </>
                )}
                {/*<div>*/}
                {/*    <p>IsCaü {values.isCap ? "true" : "false"}</p>*/}
                {/*    <p>Height {values.height}</p>*/}
                {/*    <p>width {values.width}</p>*/}
                {/*    <p>amoutn {values.amount}</p>*/}
                {/*    <p>fill {values.fill}</p>*/}
                {/*</div>*/}
                {/*<div>*/}
                {/*    {checkedServices.map(service => (*/}
                {/*        <p>{service.service}</p>*/}
                {/*    ))}*/}
                {/*</div>*/}
                {/*<div>*/}
                {/*    <p>{additionalServicesPrice}</p>*/}
                {/*</div>*/}
            </div>
        );
    }
;

export default EstimationForm;
