import React, { useState ,useRef } from 'react';
import { useForm } from "react-hook-form"
import axios from 'axios'
function UPIPaymentForm() {
  const { register, handleSubmit } = useForm()
  const [qrCode, setQrCode] = useState(null)
  const onSubmit = async data => {
    try {
      const response = await axios.post('https://qr-api-sigma.vercel.app/upi', data)
      setQrCode(response.data.qrCode)

    } catch (error) {
      console.error(error)
    }
  }


  return (
    <form  onSubmit={handleSubmit(onSubmit)} className='mt-10 flex flex-col w-10/12 mx-auto'>
      <label >
        Your UPI Address:
        <input className='mb-2 p-2 rounded-lg bg-black border-2 border-red-500 mt-2 w-full  ' type="text" {...register("payee_address")}  />
      </label>
      <br />
      <label >
        Name:
        <input type="text" className='mb-2 p-2 bg-black rounded-lg  border-2 border-red-500 mt-2 w-full' {...register("payee_name")}  />
      </label>
      <br />
      <label>
        Amount in ₹:
        <input className='mb-2 p-2 rounded-lg bg-black border-2 border-red-500 mt-2 w-full' type="number" {...register("amount")}  />
      </label>
      <br />
     
      
      <input type="submit" className='p-2 bg-red-500 justify-center rounded-xl mb-10' value="Submit" />
      {
qrCode && <div className='flex gap-2'>
        <img className='w-[200px]' src={qrCode} alt="UPI Payment QR Code" />
        <button onClick={()=>setQrCode('')} className='bg-red-500 w-fit h-fit p-3 rounded-full m-2'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
</svg>
</button>
</div>
      }
    </form>
  )
}

export default UPIPaymentForm
