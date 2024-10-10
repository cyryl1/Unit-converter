import React, { useState } from 'react';
import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// import './home.css'

function Home() {
  // const navigate = useNavigate()
  const [object, setObject] = useState("length")
  const [quantity, setQuantity] = useState(0);
  const [unitFrom, setUnitFrom] = useState('');
  const [unitTo, setUnitTo] = useState('');
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  // const [data, setData] = useState(null)
  // const navigate = useNavigate();

  const Submit = async (event) => {
    event.preventDefault(); // Prevent form from submitting normally
    if (isNaN(quantity) ||!unitFrom ||!unitTo) {
      alert('Please fill in all the fields')
      return
    }
    const data = {
      quantity: parseFloat(quantity),
      unitFrom: unitFrom,
      unitTo: unitTo
    }
    axios.post(`http://127.0.0.1:5001/${object}/`, data)
    .then((response) => {
      setResponse(response.data.result);
      console.log(response.data)
      setTimeout(() => {
        // navigate('/result', { state: { response: response.data } })
        setLoading(true)
      }, 1000)
    })
    .catch((error) => {
      console.error("Error fetching data", error);
    });
    // setLoading(true)
    // try {
    //   const result = axios.post(`http://127.0.0.1:5001/${object}/`, data)
    //   setResponse(result.data)
    //   console.log(result.data.json())
    //   // navigate('/result', { state: { response: result.data } })
    // } catch (error) {
    //   console.error("Error fetching data:", error);
    // } finally {
    //   setLoading(false)
    // }
  }   
    
  return (
    <div className='flex items-center justify-center h-screen p-4'>
      <div className='border border-black w-[60%] lg:w-[30%] p-6 lg:p-8 rounded'>
        <h1 className='font-extrabold text-2xl lg:text-3xl'>Unit Converter</h1>
        <nav className='flex gap-4 lg:gap-8 mt-[10px]'>
          <p onClick={() => setObject("length")} className={`text-xl cursor-pointer font-semibold border-b-4 ${object === 'length' ? 'border-black' : 'border-transparent'} rounded`}>Length</p>
          <p onClick={() => setObject("weight")} className={`text-xl cursor-pointer font-semibold border-b-4 ${object === 'weight' ? 'border-black' : 'border-transparent'} rounded`}>Weight</p>
          <p onClick={() => setObject("temperature")} className={`text-xl cursor-pointer font-semibold border-b-4 ${object === 'temperature' ? 'border-black' : 'border-transparent'} rounded`}>Temperature</p>
        </nav>

        {!loading && <main className='mt-[20px]'>
          {object === "length" &&  <section>
            <form action="" className='flex flex-col w-[80%]'>
              <label htmlFor="length" className='mt-[10px] font-semibold'>Enter the length to convert</label>
              <input 
                type="number" 
                id="length" 
                name="length" 
                onChange={(e) => setQuantity(e.target.value)}
                className='border border-black rounded'
              />
              <label htmlFor="unitFrom" className='mt-[20px] font-semibold'>Unit to convert from</label>
              <select name="unitFrom" id="unitFrom" value={unitFrom} onChange={(e) => setUnitFrom(e.target.value)} className='border border-black rounded'>
                <option value="" disabled>select</option>
                <option value="millimeter">mm</option>
                <option value="centimeter">cm</option>
                <option value="meter">m</option>
                <option value="kilometer">km</option>
                <option value="inches">in</option>
                <option value="foot">ft</option>
                <option value="yard">yard</option>
                <option value="mile">mile</option>
              </select>
              <label htmlFor="unitTo" className='mt-[20px]'>Unit to convert from</label>
               <select name="unitTo" id="unitTo" value={unitTo} onChange={(e) => setUnitTo(e.target.value)} className='border border-black rounded'>
                <option value="" disabled>select</option>
                <option value="millimeter">mm</option>
                <option value="centimeter">cm</option>
                <option value="meter">m</option>
                <option value="kilometer">km</option>
                <option value="inches">in</option>
                <option value="foot">ft</option>
                <option value="yard">yard</option>
                <option value="mile">mile</option>
              </select>
              <button type="submit" onClick={Submit} className='mt-[20px] border border-black w-20 rounded cursor-pointer'>Convert</button>
              {/* {loading && <p>Loading...</p>} */}
            </form>
          </section>
          }
        
        {object === "weight" &&  <section>
          <form action="" className='flex flex-col w-[80%]'>
              <label htmlFor="weight" className='mt-[10px] font-semibold'>Enter the weight to convert</label>
              <input 
                type="number" 
                id="weight" 
                name="weight" 
                onChange={(e) => setQuantity(e.target.value)}
                className='border border-black rounded'
              />
              <label htmlFor="unitFrom" className='mt-[20px] font-semibold'>Unit to convert from</label>
              <select name="unitFrom" id="unitFrom" value={unitFrom} onChange={(e) => setUnitFrom(e.target.value)} className='border border-black rounded'>
                <option value="" disabled>select</option>
                <option value="milligram">mg</option>
                <option value="gram">g</option>
                <option value="kilogram">kg</option>
                <option value="ounce">ounce</option>
                <option value="pound">pound</option>
              </select>
              <label htmlFor="unitTo" className='mt-[20px] font-semibold'>Unit to convert to</label>
              <select name="unitTo" id="unitTo" value={unitTo} onChange={(e) => setUnitTo(e.target.value)} className='border border-black rounded'>
                <option value="" disabled>select</option>
                <option value="milligram">mg</option>
                <option value="gram">g</option>
                <option value="kilogram">kg</option>
                <option value="ounce">ounce</option>
                <option value="pound">pound</option>
              </select>
              <button type="submit" onClick={Submit} className='mt-[20px] border border-black w-20 rounded cursor-pointer'>Convert</button>
            </form>
          </section>
          }

          {object === "temperature" &&  <section>
            <form action="" className='flex flex-col w-[80%]'>
              <label htmlFor="temp" className='mt-[10px] font-semibold'>Enter the temperature to convert</label>
              <input 
                type="number" 
                id="temp" 
                name="temp" 
                onChange={(e) => setQuantity(e.target.value)}
                className='border border-black rounded'
              />
              <label htmlFor="unitFrom" className='mt-[20px] font-semibold'>Unit to convert from</label>
              <select name="unitFrom" id="unitFrom" value={unitFrom} onChange={(e) => setUnitFrom(e.target.value)} className='border border-black rounded'>
                <option value="" disabled>select</option>
                <option value="celsius">celsius</option>
                <option value="fahrenheit">Fahrenheit</option>
                <option value="kelvin">Kelvin</option>
              </select>
              <label htmlFor="unitTo" className='mt-[20px] font-semibold'>Unit to convert to</label>
              <select name="uniTo" id="unitTo" value={unitTo} onChange={(e) => setUnitTo(e.target.value)} className='border border-black rounded'>
                <option value="" disabled>select</option>
                <option value="celsius">celsius</option>
                <option value="fahrenheit">Fahrenheit</option>
                <option value="kelvin">Kelvin</option>
              </select>
              <button type="submit" onClick={Submit} className='mt-[20px] border border-black w-20 rounded cursor-pointer'>Convert</button>
            </form>
          </section>
          }
        </main>}
        {loading && <main>
          <p className='mt-[30px] font-semibold'>The result of your calculation</p>
          <p>{quantity} {unitFrom} = {response} {unitTo}</p>
          <div className='w-fit m-auto'><button 
            className='border border-black w-10 mt-[20px]' 
            onClick={() => {
              setLoading(false); 
              setQuantity(null);
              setUnitFrom('');
              setUnitTo('');
              setResponse(null);
              }}
              >OK</button></div>
        </main>}
      </div>
    </div>
  )
}

export default Home