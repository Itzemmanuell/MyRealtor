import {housesData} from '../Data'

import {useParams, Link} from 'react-router-dom'

import {BiBed, BiBath, BiArea} from 'react-icons/bi'


export default function PropertyDetails() {

    const {id} =useParams();

    const house = housesData.find(house => {
        return house.id === parseInt(id);
    })

    return(
        <section>
            <div className='container mx-auto px-8 md:px-0 min-h-[800px] mb-14'>
                <div className='flex flex-col lg:flex-row lg:items-center lg:justify-between'>
                    <div>
                        <h2 className='text-2xl font-semibold'>
                           {house.name} 
                        </h2>
                        <h3 className='mb-4 text-lg'>
                           {house.address} 
                        </h3>
                    </div>
                    <div className='flex mb-4 text-sm mr-14 lg:mb-0 gap-x-2'>
                        <div className='px-3 text-white bg-green-500 rounded-full'>
                            {house.type}
                              
                        </div>
                        <div className='px-3 text-white rounded-full bg-cyan-500'>
                            {house.country}
                        </div>
                    </div>
                    <div className='text-3xl font-semibold text-cyan-500'>
                        $ {house.price}
                    </div>
                </div>
                <div className='flex flex-col items-start gap-8 lg:flex-row'>
                    <div className='max-w-[768px]'>
                        <div className='mb-8'>
                            <img src={house.imageLg} alt="House Image" />
                        </div>
                        <div className='flex mb-6 gap-x-6 text-cyan-600'>
                            <div className='flex items-center gap-x-2'>
                                <BiBed className='text-2xl' />
                                <div>
                                    {house.bedrooms} 
                                </div>
                            </div>
                            <div className='flex items-center gap-x-2'>
                                <BiBath className='text-2xl' />
                                <div>
                                    {house.bathrooms}
                                </div>
                            </div>
                            <div className='flex items-center gap-x-2'>
                                <BiArea className='text-2xl'  />
                                <div>
                                    {house.surface} 
                                </div>
                            </div>
                        </div>
                        <div>
                            {house.description}
                        </div>
                    </div>
                    <div className='flex-1 w-full px-6 py-8 mb-8 bg-white border border-gray-300 rounded-lg '>
                        <div className='flex items-center mb-8 gap-x-4'>
                            <div className='w-20 h-20 p-1 border border-gray-300 rounded-full'>
                               <img src={house.agent.image} alt="Realtor agent" /> 
                            </div>
                            <div>
                                <div className='text-lg font-bold'>
                                    {house.agent.name}
                                </div>
                                <Link to='' className='text-sm font-medium text-cyan-600 hover:text-cyan-500'>
                                    View Listings
                                </Link>
                            </div>
                        </div>
                        <form className='flex flex-col gap-y-4'>
                            <input className='w-full px-4 text-sm border border-gray-300 rounded outline-none focus:border-cyan-500 h-14 text-slate-950'  type="text"
                            placeholder='Name' />
                            <input className='w-full px-4 text-sm border border-gray-300 rounded outline-none focus:border-cyan-500 h-14 text-slate-950'  type="tel"
                            placeholder='Phone Number' />
                             <input className='w-full px-4 text-sm border border-gray-300 rounded outline-none focus:border-cyan-500 h-14 text-slate-950'
                             type="email"
                             placeholder='Email' />
                            <textarea className='w-full p-4 text-sm border border-gray-300 rounded outline-none resize-none focus:border-cyan-500 h-36 text-slate-950'
                            placeholder='Message'>
                            </textarea>
                            <div className='flex gap-x-2'>
                                <button className='w-full p-4 text-sm text-white transition rounded bg-cyan-800 hover:bg-cyan-600'>
                                    Send message
                                </button>
                                <button className='w-full p-4 text-sm transition border rounded border-cyan-700 text-cyan-700 hover:border-cyan-500 hover:text-cyan-500'>
                                    Call
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}