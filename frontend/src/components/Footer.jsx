import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div>
        <div className='grid grid-cols-1 sm:grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>

    <div>
        <img src={assets.logo} className='mb-5 w-32' alt="" />
        <p className='w-full md:w-2/3 text-gray-600'>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nulla nam quis natus recusandae libero accusantium ratione maxime adipisci consequatur dolor. Suscipit optio, vero enim porro ipsa cum autem inventore obcaecati.
        </p>
    </div>

    <div>
        <p className='text-lg font-bold mb-4'>COMPANY</p>
        <ul className='flex flex-col gap-1 text-gray-600'>
            <li>Home</li>
            <li>About</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
        </ul>
    </div>

    <div>
        <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
        <ul className='flex flex-col gap-1 text-gray-600'>
          <li>+1-212-456-7890</li>
          <li>contact@ablemind.com</li>  


        </ul>
    </div>
</div>

      
    </div>
  )
}

export default Footer
