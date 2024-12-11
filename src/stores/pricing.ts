import {atom} from 'nanostores'
import type {PriceModel} from "./models/PriceModel";
import stickPricingJsonData from './datasource/stick_pricing.json';

export const $pricings = atom<PriceModel[]>(getJsonPricingData());

function getJsonPricingData() :any[] {

    return stickPricingJsonData.map((object) => {
        return mapPricingModel(object);
    })
}

// parseFloat(priceModelOld['von cm²'].replace(',', '.')), ---- for replace elements in value
function mapPricingModel(priceModelOld: { [x: string]: any; "von cm²"?: number; "bis cm²"?: number; Stiche?: number; Stückzahl_1?: string; Preis_1?: number; Stückzahl_2?: string; Preis_2?: number; Stückzahl_3?: string; Preis_3?: number; Stückzahl_4?: string; Preis_4?: number; Stückzahl_5?: string; Preis_5?: number; Stückzahl_6?: string; Preis_6?: number; Stückzahl_7?: string; Preis_7?: number; }):PriceModel {
    const priceModelNew: PriceModel = {
        area_min: priceModelOld['von cm²'],
        area_max: priceModelOld['cm² bis'],
        fill: priceModelOld['Füllung'],
        stitches_number: priceModelOld['Stiche'],
        quantity_1: priceModelOld['Stückzahl_1'],
        price_1: priceModelOld['Preis_1'],
        quantity_2: priceModelOld['Stückzahl_2'],
        price_2: priceModelOld['Preis_2'],
        quantity_3: priceModelOld['Stückzahl_3'],
        price_3: priceModelOld['Preis_3'],
        quantity_4: priceModelOld['Stückzahl_4'],
        price_4: priceModelOld['Preis_4'],
        quantity_5: priceModelOld['Stückzahl_5'],
        price_5: priceModelOld['Preis_5'],
        quantity_6: priceModelOld['Stückzahl_6'],
        price_6: priceModelOld['Preis_6'],
        quantity_7: priceModelOld['Stückzahl_7'],
        price_7: priceModelOld['Preis_7']
    }
    return priceModelNew;
}

export function amountRange(amountValue: number) {
    if (amountValue >= 1 && amountValue <= 5) {
        return 1;
    } else if (amountValue >= 6 && amountValue <= 15) {
        return 2;
    }
    else if (amountValue >= 16 && amountValue <= 24) {
        return 3;
    }
    else if (amountValue >= 25 && amountValue <= 49) {
        return 4;
    }
    else if (amountValue >= 50 && amountValue <= 99) {
        return 5;
    }
    else if (amountValue >= 100 && amountValue <= 199) {
        return 6;
    }
    else if (amountValue >= 200 && amountValue <= 500) {
        return 7;
    }
    else {
        return null;
    }
}
