import react, { useEffect, useState } from 'react'

import './App.css'
import axios from 'axios'


function App() {


  const [to, setTo] = useState("en")
  const [option, setOptions] = useState("")
  const [from, setFrom] = useState("en")
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")




// curl -X POST "https://libretranslate.org/detect" -H  "accept: application/json" -H  "Content-Type: application/x-www-form-urlencoded" -d "q=Hello%20world!&api_key=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"

  const getData =async () =>{
        const res = await axios.get("https://libretranslate.de/languages")
       
          setOptions(res.data)
  }

  

  const getTranslate = ()  =>{

    const params = new URLSearchParams();
  params.append('q', input);
  params.append('source', from);
  params.append('target', to);
  params.append('api_key',"xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx");
          axios.post("https://libretranslate.de/translate", params,{
          
            headers:{
              "accept": "application/json",
              "Content-Type": "application/x-www-form-urlencoded"
            },
            
          }).then((res) =>{
            setOutput(res.data.translatedText)
     
          }).catch((error) =>{
            console.log(error)
          })
  }
     


   useEffect(() => {
      getData();
   }, [])
  return(
   <>
     <h1>Google Translate</h1>
    <div className="container">
      <div className="from">
     <span>From: ({from})</span>  <select onChange={(e) => setFrom(e.target.value)}> 
          {
           option && option.map((item) => <option key={item.code} value={item.code}>{item.name}</option>)
          }
         
        </select>
       <span>To: ({to})</span>   <select onChange={(e) => setTo(e.target.value)}> 
        {
            option && option.map((item) => <option  key={item.code} value={item.code}>{item.name}</option>)
          }
        </select>
      </div>

      <div>
      <textarea name="" id="" cols="50" rows="5" value={input} onChange={(e) =>setInput(e.target.value)}>{input}</textarea>
      </div>
      <div>
      <textarea name="" id="" cols="50" rows="5" value={output}></textarea>
      </div>
      
    <div>
      <button onClick={() => getTranslate()}>Translate</button>
    </div>
       
    </div>
   
   </>
  )
}

export default App
