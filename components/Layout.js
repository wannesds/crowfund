import React from 'react';
import { Container, Segment } from 'semantic-ui-react';
import Head from 'next/head';
import Header from './Header';

export default (props) => {
  return (
    <div style={{
      backgroundColor: "#191A1E", 
      minHeight: "100vh", 
      marginTop: "-10px", 
      paddingTop: "20px",
      color: "white"
      }}>
      <Container>
      <Head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/semantic-ui@2/dist/semantic.min.css"/>
      </Head>
      
      <Header />
      {props.children}
      </Container>
    </div>
     
  );
};