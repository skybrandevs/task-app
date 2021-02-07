import Head from "next/head";
import { useEffect } from "react";
import { useState } from "react";
import IndexTaskTable from "../components/IndexTaskTable";
import Sidebar from "../components/Sidebar";
import { auth } from "../middleware/auth";
import checkAuth from "../middleware/check-auth";
import { wrapper } from "../redux";
import axiosClient from "../services/axiosClient";
const Home = () => {
  const [products, setProducts] = useState([]);
  const [ count , setCount] = useState(0);
  const fetchData = async () => {
    let { data } = await axiosClient.get('/task');
    setProducts(data)
    return;
}

useEffect(()=> {
    fetchData()
},[count])

return (
  <div>
    <Head>
      <title>Create Next App</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <main>
     <div className='container-fluid background-grey'>
     
       <div className='row'>
       
        <div className='col-3 height-sidebar'>

          <div className='box-metrics pt-5'>
            <div className='pt-5'>
            <Sidebar  onUpdate={() => setCount(count + 1)} />
            </div>
           
          </div>

        </div>
        
        <div className='col-9 px-5'>
        <div className='row mx-auto w-100'>
         <h1 className='text-center mx-auto pt-5'>All Task Management System</h1>
       </div>
        <div className='p-5'>
        <IndexTaskTable onUpdate={() => setCount(count + 1)} data={products}/>
        </div>
        
          
        </div>
       </div>
     </div>
    </main>

    <style jsx>{``}</style>

    <style jsx global>{`
      html,
      body {
        padding: 0;
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
          Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
      }

      * {
        box-sizing: border-box;
      }
    `}</style>
  </div>
);
    }

export default Home;
export const getServerSideProps = wrapper.getServerSideProps(async function (context) {
  // Middleware
  const token = auth(context);
    //   Dispatch token for client Side actions
  checkAuth(context, token);

  return {
     props: null
  };
});

