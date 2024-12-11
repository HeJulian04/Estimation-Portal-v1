import React from "react";
import type {BillModel} from "../../../../stores/models/BillModel";

const EstimationBill = ({numberOfPieces, unitPrice, priceTotalNet, priceTotalBrut, tax, additionalServices, smallQuantitiesSurcharge}: BillModel) => {
    return (
       <div>
           <div className="text-base">
               <div className="flex flex-row justify-between mb-1">
                   <p>Einstelstückpreis</p>
                   <p>{unitPrice?.toFixed(2)} CHF</p>
               </div>
               {(smallQuantitiesSurcharge !== 0) && (
                   <div className="flex flex-row justify-between border-b text-xs">
                       <p>Kleinmengenzuschlag</p>
                       <p>+ {smallQuantitiesSurcharge} CHF</p>
                   </div>
               )}
               {additionalServices && additionalServices.length > 0 && (
                   <>
                       <div className="border-y-2 py-2">
                           <p className="ml-4">Zusatzleistungen:</p>
                           <div className="ml-8">
                               {additionalServices.map((additionalService) => (
                                   <div key={additionalService.service} className="flex flex-row justify-between mb-2 text-xs">
                                       <p>{additionalService.service}</p>
                                       <p>+ {additionalService.price_name}</p>
                                   </div>
                               ))}
                           </div>
                       </div>
                   </>
               )}
               <div className="flex flex-row justify-between mb-2">
                   <p>Gesamterpreis/Netto</p>
                   <p>{priceTotalNet?.toFixed(2)} CHF</p>
               </div>
               <div className="flex flex-row justify-between border-b text-xs">
                   <p>zzgl. MwSt</p>
                   <p>+ {tax?.toFixed(2)} CHF</p>
               </div>
               <div className="flex flex-row justify-between border-b font-bold py-3">
                   <p>Gesamtpreis/Brutto</p>
                   <p>{priceTotalBrut?.toFixed(2)} CHF</p>
               </div>
           </div>
       </div>
    )
}

export default EstimationBill;
