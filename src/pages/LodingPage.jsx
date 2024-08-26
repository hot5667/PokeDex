import React, { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import sprite1 from '../asset/image/달리는 새싹 르탄이_1.png'; 
import sprite2 from '../asset/image/달리는 새싹 르탄이_2.png'; 

const LoadingBarWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff; 
  flex-direction: column;
`;

const LoadingBarProgress = styled.div`
  width: 110px; 
  height: 160px;
  position: relative;
  background-size: cover;
  background-repeat: no-repeat;
  background-image: url(${sprite1}); 
`;

const LoadingText = styled.div`
  margin-top: 20px;
  font-size: 24px;
  font-family: 'NeoDunggeunmoPro-Regular', sans-serif;
  color: #333;
  white-space: nowrap;
`;

const LoadingPage = () => {
  const [text, setText] = useState('로딩중.');
  const [showSprite1, setShowSprite1] = useState(true); 
  const progressRef = useRef(null);

  useEffect(() => {
    const spriteInterval = setInterval(() => {
      setShowSprite1((prev) => !prev);
      if (progressRef.current) {
        progressRef.current.style.backgroundImage = showSprite1
          ? `url(${sprite2})`
          : `url(${sprite1})`;
      }
    }, 100); 

    return () => clearInterval(spriteInterval);
  }, [showSprite1]);

  useEffect(() => {
    const textInterval = setInterval(() => {
      setText((prevText) => {
        if (prevText === '로딩중...') return '로딩중.';
        if (prevText === '로딩중.') return '로딩중..';
        return '로딩중...';
      });
    }, 100); 

    return () => clearInterval(textInterval);
  }, []);

  return (
    <LoadingBarWrapper>
      <LoadingBarProgress ref={progressRef} />
      <LoadingText>{text}</LoadingText>
    </LoadingBarWrapper>
  );
};

export default LoadingPage;
