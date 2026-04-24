"use client"
import { useState } from "react";

export default function ContactPage() {
const [inputs, setInputs] = useState({
  name: "",
  email: "",
  message: "",
});
const [message,setMessage]=useState("");

  const handleInput=(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>{
 setInputs((state)=>{ return {...state, [e.target.name]:e.target.value}});

  }
  const handleSubmit=(e:React.SubmitEvent<HTMLFormElement>)=>{
    e.preventDefault();
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/enquiry`,{
          method:"POST",
          body:JSON.stringify(inputs)
        })
        .then((res)=>res.json())
        .then((res)=>{setMessage(res.message)});
        setInputs({
  name: "",
  email: "",
  message: "",
});
  }
  return (
    <div className=" container mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-8 text-center">Contact Us</h1>

      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6">
        <div className="flex items-center mb-5">
          <label htmlFor="name" className="w-1/4 font-medium">
            Name
          </label>
          <input
            type="text"
            onChange={handleInput}
            value={inputs.name}
            name="name"
            id="name"
            placeholder="Enter your name"
            className="w-3/4 border border-gray-300 rounded-md p-2 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-center mb-5">
          <label htmlFor="email" className="w-1/4 font-medium">
            Email
          </label>
          <input
            type="email"
            onChange={handleInput}
            value={inputs.email}
            name="email"
            id="email"
            placeholder="Enter your email"
            className="w-3/4 border border-gray-300 rounded-md p-2 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex items-start mb-5">
          <label htmlFor="message" className="w-1/4 font-medium pt-2">
            Message
          </label>
          <textarea
            id="message"
            rows={5}
            onChange={handleInput}
            value={inputs.message}
            name="message"
            placeholder="Write your message"
            className="w-3/4 border border-gray-300 rounded-md p-2 outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Send Message
          </button>
        </div>
      </form>
      {message && <p>{message}</p>}
      
    </div>
  );
}