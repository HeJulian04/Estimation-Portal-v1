import EstimationForm from "./Partials/EstimationForm/EstimationForm";
import type { EstimationPortalStoryblok } from "../../stores/models/storyblok";
import React from "react";

const EstimationPortal = (blok: EstimationPortalStoryblok) => {
    return (
        <div className="flex justify-center flex-col">
            <EstimationForm {...blok} />
        </div>
    )
}

export default EstimationPortal;
