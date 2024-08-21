// ErrorPage.jsx
import React from 'react';
import styled from '@emotion/styled';
import 'nes.css/css/nes.min.css';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f0f0f0;
`;

const Message = styled.div`
  font-size: 2rem;
  text-align: center;
  margin-bottom: 1rem;
`;

const Button = styled.button`
  background-color: #ff4040;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  cursor: pointer;
  &:hover {
    background-color: #ff0000;
  }
`;

const ErrorPage = ({ errorCode }) => {
  const getErrorMessage = (code) => {
    switch (code) {
      case 404:
        return "Oops! Page not found.";
      case 505:
        return "Server error. Please try again later.";
      default:
        return "An unexpected error occurred.";
    }
  };

  return (
    <Container className="nes-container with-title is-centered">
      <p className="title">Error {errorCode}</p>
      <Message>{getErrorMessage(errorCode)}</Message>
      <Button onClick={() => window.location.href = '/'}>Go to Home</Button>
    </Container>
  );
};

export default ErrorPage;
