import React, { useContext } from 'react';
import { useLoaderData } from 'react-router-dom';
import  { AuthContext } from '../../Contexts/AuthProvider/AuthProvider';

const Checkout = () => {

    const {user} = useContext(AuthContext);
    const {title, price, _id} = useLoaderData();


    const handlePlaceOrder = event =>{
        event.preventDefault();
        const form = event.target;
        const name = `${form.firstName.value} ${form.lastName.value}`;
        const email = user?.email || 'unregistered';
        const message = form.message.value;
        const phone = form.phone.value;

        const order = {
            service: _id,
            serviceName: title,
            price,
            customer: name,
            email,
            phone,
            message 
        }

        fetch('http://localhost:5000/orders', {
            method: 'POST',
            headers: {
                'content-type' : 'application/json' 
            },
            body : JSON.stringify(order)
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data);
            if (data.acknowledged){
                alert("Order Placed Successfully");
                form.reset();
            }
        })
        .catch(err => console.error(err));

    }


    return (
        <form onSubmit={handlePlaceOrder} className='border-black border-2 rounded-lg p-10 my-10'>
            <h2 className="text-4xl">Oder item: {title}</h2>
            <h4 className="text-3xl">Price: {price}</h4>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <input name='firstName' type="text" placeholder="First Name" className="input input-bordered w-full" />
                <input name='lastName' type="text" placeholder="Last Name" className="input input-bordered w-full" />
                <input name='phone' type="phone" placeholder="Your Phone" className="input input-bordered w-full" required/>
                <input name='email' type="email" placeholder="Your Email" defaultValue={user?.email} className="input input-bordered w-full" readOnly />
            </div>
            <textarea name='message' className="textarea textarea-bordered w-full my-7" placeholder="Your Message" required></textarea>

            <input className='btn mb-5' type="submit" value="Place your order" />
        </form>
    );
};

export default Checkout;