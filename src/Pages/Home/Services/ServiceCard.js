import React from 'react';
import { Link } from 'react-router-dom';

const ServiceCard = ({service}) => {

    const {title, img, description, price, _id} = service;

    return (
        <div className="card card-compact bg-base-100 shadow-xl">
            <figure><img src={img} alt="Shoes" /></figure>
            <div className="card-body">
                <h2 className="card-title">{title}</h2>
                <p className='text-2xl text-orange-600 font-semibold'>Price: ${price}</p>
                {/* <p>{description.length>250 ? `${description.substring(0,250)}...` : description}</p> */}
                <div className="card-actions justify-end">
                    <Link to= {`/checkout/${_id}`}>
                        <button className="btn btn-primary">Buy Now</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ServiceCard;