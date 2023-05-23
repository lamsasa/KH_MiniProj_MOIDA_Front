import React, { useContext, useEffect, useState } from "react";
import Slider from "react-slick";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { MyStudyBlock } from "./MyStudyBlock";
import AxiosApi from "../../api/AxiosAPI";
import { LoginContext } from "../../context/AuthContext";


// 슬라이드 슬릭에 화살표 추가 -> 위치 조정이 복잡해서 구현X
// const NextArrow = ({ onClick }) => { // props로 onClick을 전달해줘야 한다.
//   return (
//     <button
//       onClick={onClick}
//       type='button'
//     > next
//     </button>
//   );
// };

// const PrevArrow = ({ onClick }) => {
//   return (
//     <button
//       onClick={onClick}
//       type='button'
//     > prev
//     </button>
//   );
// };



export const MyStudyList = ( ) => {
  const[myStudyInfo, setMyStudyInfo] = useState([]);
  const {userId} = useContext(LoginContext);
  useEffect(() => {
    const myStudyInfo = async() => {
        try {
            const rsp = await AxiosApi.studyMyListGet(userId); // 전체 조회
            if (rsp.status === 200) {
              setMyStudyInfo(rsp.data);
              console.log(myStudyInfo);
            }
          } catch (error) {
            console.error('나의 스터디 정보를 가져오는 중 에러가 발생했습니다:', error);
          }
        };
      
        myStudyInfo();
      }, [userId]);

  return (
    <>
  {myStudyInfo.length > 1 ? (
    <>
      <StyledSlider {...MyListset}>
       <MyStudyBlock isCreate={true} />
       {myStudyInfo !== [] && myStudyInfo
          .map((study) => (
            <MyStudyBlock 
              isCreate={false}
              key={study.studyId}
              studyId={study.studyId}
              studyProfile={study.studyProfile}
              studyTitle={study.studyName}
              studyIntro={study.studyIntro}
              studyTag={study.tagName}
              studyUserCount={study.studyUserCount}
              studyUserLimit={study.studyUserLimit}
            />
          ))}
      </StyledSlider>
    </>
    ) : (
      <>
      <div style={{ display: "flex" }}>
        {myStudyInfo === [] ? (
          myStudyInfo.map((study) => (
            <MyStudyBlock
              isCreate={false}
              key={study.studyId}
              studyId={study.studyId}
              studyProfile={study.studyProfile}
              studyTitle={study.studyName}
              studyIntro={study.studyIntro}
              studyTag={study.tagName}
              studyUserCount={study.studyUserCount}
              studyUserLimit={study.studyUserLimit}
            />
          ))
        ) : (
          <MyStudyBlock isCreate={true} />
        )}
      </div>
    </>
  )}
  
  
  
  
  
  
  
  </>
      

  );
};

export const MyPageList = ( ) => {
  const[myPageList, setMyPageList] = useState([]);
  const {userId} = useContext(LoginContext);

  useEffect(() => {
    const PageList = async() => {
        const rsp = await AxiosApi.studyListGet(); // 전체 조회
        if(rsp.status === 200) setMyPageList(rsp.data);
        console.log(rsp.data);
    };
    PageList();
}, []);

console.log(myPageList.length);

  return (
    <>
    {myPageList.length > 1 ? (
      <>
        <StyledSlider {...MyPageset}>
          {myPageList
            .filter((study) => study.userId && study.MgrId === userId)
            .map((study) => (
              <MyStudyBlock 
                isCreate={false}
                key={study.studyId}
                studyId={study.studyId}
                studyProfile={study.studyProfile}
                studyTitle={study.studyName}
                studyIntro={study.studyIntro}
                studyTag={study.tagName}
                studyUserCount={study.studyUserCount}
                studyUserLimit={study.studyUserLimit}
              />
            ))}
        </StyledSlider>
      </>
      ) : (
        <>
        <div style={{display:'flex'}}>
          <MyStudyBlock isCreate={true} />
          {myPageList !== [] && myPageList
            .filter((study) => study.userId && study.MgrId === userId)
            .map((study) => (
              <MyStudyBlock 
                isCreate={false}
                key={study.studyId}
                studyId={study.studyId}
                studyProfile={study.studyProfile}
                studyTitle={study.studyName}
                studyIntro={study.studyIntro}
                studyTag={study.tagName}
                studyUserCount={study.studyUserCount}
                studyUserLimit={study.studyUserLimit}
              />
            ))}
          </div>
        
          </>
      )}
      
      </>
      

      // <StyledSlider { ...MyPageset }>

      //   <MyStudyBlock />
      //   <MyStudyBlock />
      //   <MyStudyBlock />
      //   <MyStudyBlock />
      //   <MyStudyBlock />

      // </StyledSlider>

  );
};



//슬라이드 설정
const MyListset = {

  infinite: false, // 무한 넘기기 막음
  dots: true,
  drabble: true,
  // autoplay: true,
  speed: 500,
  autoplayspeed: 0, // 넘어가는 속도
  slidesToShow: 3, // 보이는 갯수
  slidesToScroll: 1, // 넘어가는 갯수
  // centerMode: true, // 슬라이드 시작점 중앙 설정
  centerPadding: '0px', // 0px 일 때, 슬라이드 끝쪽 이미지가 잘리지 않음
  // arrows: true,
  pauseOnHover: true,
  // nextArrow: <NextArrow />,
  // prevArrow: <PrevArrow />,
};

//슬라이드 설정
const MyPageset = {

  infinite: false, // 무한 넘기기 막음
  dots: true,
  drabble: true,
  speed: 500,
  slidesToShow: 2, // 보이는 갯수
  slidesToScroll: 1, // 넘어가는 갯수
  centerPadding: '0px', // 0px 일 때, 슬라이드 끝쪽 이미지가 잘리지 않음
  arrows: true,
  pauseOnHover: true,
};

// 슬라이드 CSS
const StyledSlider = styled(Slider)`

display: flex;

align-items: center;
justify-content: center;
vertical-align: middle;

  .slick-list {
    overflow: hidden;
    height: 16vw;
    /* text-align: center; */
  }

  .slick-slide div {
    cursor: pointer;
  }

  .slick-dots {
  }

  .slick-track {
    overflow-x: hidden;
  }

  .slick-arrow {
    display: flex;
  }

  /* .slick-prev {
    left: -1.2vw;
    cursor: pointer;
    &::before {
      content: '';
    }
  }

  .slick-next {
    right: -1.1vw;
    cursor: pointer;

    &::before {
      content: '';
    }
  } */
`;

