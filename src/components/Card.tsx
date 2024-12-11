import React from "react";

interface Props {
    title?: string,
    description?: string,
    link?: string,
    imageUrl?: string;
}

const Card = ({title, description, link, imageUrl}: Props) => {
    return (
        <>
            <div className="card w-96 bg-base-100 shadow-xl image-full">
                <figure><img src={imageUrl} alt={title} /></figure>
                <div className="card-body">
                    <h2 className="card-title">{title}</h2>
                    {description && (
                        <div dangerouslySetInnerHTML={{__html: description}}></div>
                    )}
                    <div className="card-actions justify-end">
                        <a href={`/${link}`}>
                            <button className="btn btn-primary">Calculate Now</button>
                        </a>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Card;
