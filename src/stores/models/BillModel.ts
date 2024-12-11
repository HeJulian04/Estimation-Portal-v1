import type {AdditionalServiceStoryblok} from "./storyblok";

export interface BillModel {
    unitPrice?: number,
    smallQuantitiesSurcharge?: number,
    priceTotalNet?: number,
    priceTotalBrut?: number,
    tax?: number,
    additionalServices?: AdditionalServiceStoryblok[],
}
