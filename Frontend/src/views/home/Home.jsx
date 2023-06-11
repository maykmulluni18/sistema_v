import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getMe } from "../home/auth/Authen"
import React, { useEffect } from 'react';
import Layout from './Layout';
import Welcome from './Welcome';
import Stocks from './stocks/Stocks';
import StocksNeas from './stocks/StocksNeas';

const Home = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isError } = useSelector((state) => state.auth);


  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);


  useEffect(() => {
    if (isError) {
      navigate("/");
    }
  }, [isError, navigate]);



  return (
    <Layout>
      <Welcome />
      <Stocks />
     {/*  <StocksNeas />*/}
    </Layout>

  );
}
export default Home;

