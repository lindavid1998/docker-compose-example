import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [message, setMessage] = useState(null)
  
  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3000');
      const data = await response.json()
      if (response.ok) {
        // setMessage(data.message)
        setMessage(`${data.year}: ${data.brand} ${data.model}`);
      } else {
        setMessage(data.error);
      }
    } catch (error) {
      setMessage(error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <>
      <p>{message}</p>
    </>
  )
}

export default App
