import React from 'react';
import styled from '@emotion/styled';
import 'nes.css/css/nes.min.css'; 

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  color: #24292e;
  font-family: 'NeoDunggeunmoPro-Regular', sans-serif; 
  text-align: center;
`;

const Title = styled.h1`
  font-size: 5rem;
  margin: 0;
  color: #d73a49;
`;

const SubTitle = styled.h2`
  font-size: 2rem;
  margin: 0.5rem 0;
  color: #586069;
`;

const Message = styled.p`
  font-size: 1.25rem;
  color: #6a737d;
  margin: 1rem 0;
`;

const Button = styled.button`
  background-color: #007bff;
  color: #ffffff;
  border: none;
  border-radius: 6px;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 1rem;
  transition: background-color 0.2s ease;
  &:hover {
    background-color: #0056b3;
  }
`;

const ErrorPage = ({ errorCode }) => {
  const getErrorMessage = (code) => {
    switch (code) {
      case 404:
        return "앗! 페이지를 찾을 수 없습니다.";
      case 505:
        return "서버 오류입니다. 나중에 다시 시도해 주세요.";
      default:
        return "포켓몬 데이터를 가져오는 데 실패했습니다. 나중에 다시 시도해 주세요.";
    }
  };

  return (
    <Container>
      <Title>{errorCode}</Title>
      <SubTitle>{errorCode === 404 ? '페이지를 찾을 수 없습니다.' : '서버 오류입니다.'}</SubTitle>
      <Message>{getErrorMessage(errorCode)}</Message>
      <Button onClick={() => window.location.href = '/'}>홈으로 돌아가기</Button>
    </Container>
  );
};

export default ErrorPage;