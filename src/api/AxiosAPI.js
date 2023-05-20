import axios from 'axios';
const MOIDA_DOMAIN = "http://localhost:8080";


// 근데 이거 postListGET이렇게 하면 POST 는 postPost 라고해야하나???? board 로 바꿀까??
const AxiosApi = {

  //스터디 리스트
  studyListGet : async() => {
    return await axios.get(MOIDA_DOMAIN + "/study");
  },  

  // 스터디 헤더 정보
  studyViewGet: async(studyId) => {
      return await axios.get(MOIDA_DOMAIN + `/study/studyRoom/Main/${studyId}`);
  },

  // 스터디 멤버 정보
  studyMemGet : async(studyId) => {
      return await axios.get(MOIDA_DOMAIN + `/study/studyRoom/Member/${studyId}`);
  },

  // 스터디 일정 정보
  studyScGet : async(studyId) => {
      return await axios.get(MOIDA_DOMAIN + `/study/studyRoom/Schedule/${studyId}`);
  },


  // 스터디 생성
  createStudy: async (userId, studyName, category, studyUserLimit, studyChatUrl, studyIntro, studyContent, studyDeadline, randomColor, tagString) => {
    const study = {
      userId: userId,
      studyName: studyName,
      studyCategory: category,
      studyUserLimit: studyUserLimit,
      studyChatUrl : studyChatUrl,
      studyIntro : studyIntro, 
      studyContent : studyContent,
      studyDeadline : studyDeadline,
      studyProfile : randomColor,
      tagName : tagString
    };
    return await axios.post(MOIDA_DOMAIN + `/study/create`, study);
  },

  // 스터디 일정 생성
  createStudySchedule : async (userId, studyId, studyScDate, studyScContent, studyScUserLimit) => {
    const schedule = {
      userId : userId,
      studyId : studyId,
      studyScDate : studyScDate,
      studyScContent : studyScContent,
      studyScUserLimit : studyScUserLimit
    };
    return await axios.post(MOIDA_DOMAIN + `/study/studyRoom/Schedule/${studyId}`, schedule)
  },

  // 로그인
  signIn: async (username, password) => {
    const signIn = {
      userName: username,
      pw: password
    };
    return await axios.post(MOIDA_DOMAIN + "/login", signIn);
  },

  // 마이페이지 프로필 수정
  updatePassword: async (userId, password, newPassword) => {
    const requestData = {
      userId: userId,
      pw: password,
      newPw: newPassword
    };
    try {
      const response = await axios.post(`${MOIDA_DOMAIN}/pw`, requestData);
      return response.data;
    } catch (error) {
      console.log("비밀번호 변경 에러:", error.message);
      throw error;
    }
  },

  updateEmail: async (userId, email) => {
    const requestData = {
      userId: userId,
      email: email
    };
    try {
      const response = await axios.post(`${MOIDA_DOMAIN}/email`, requestData);
      return response.data;
    } catch (error) {
      console.log("이메일 변경 에러:", error.message);
      throw error;
    }
  },

  updateNickname: async (userId, nickname) => {
    const requestData = {
      userId: userId,
      nickname: nickname
    };
    try {
      const response = await axios.post(`${MOIDA_DOMAIN}/nickname`, requestData);
      return response.data;
    } catch (error) {
      console.log("닉네임 변경 에러:", error.message);
      throw error;
    }
  },

  updatePhone: async (userId, phone) => {
    const requestData = {
      userId: userId,
      phone: phone
    };
    try {
      const response = await axios.post(`${MOIDA_DOMAIN}/phone`, requestData);
      return response.data;
    } catch (error) {
      console.log("번호 변경 에러:", error.message);
      throw error;
    }
  },

  // 이미지 수정
  uploadImageURL: async (userId, downloadURL) => {
    const requestData = {
      userId: userId,
      img: downloadURL
    };
    try {
      const response = await axios.post(`${MOIDA_DOMAIN}/img`, requestData);
      return response.data;
    } catch (error) {
      console.log("번호 변경 에러:", error.message);
      throw error;
    }
  },


  // 게시물 리스트 GET
  postListGet: async (boardName, lastId) => {
    return await axios.get(MOIDA_DOMAIN + `/lounge/${boardName}?lastId=${lastId}`);
  },

  // 게시물 페이지 GET
  postViewGet: async (boardName, postId) => {
    return await axios.get(MOIDA_DOMAIN + `/lounge/${boardName}/${postId}`);
  },

  // 게시물 등록 POST
  postReg: async (userId, title, contents, boardName, imgUrl) => {
    const post = {
      userId: userId,
      title: title,
      contents: contents,
      imgUrl: imgUrl
    };
    return await axios.post(MOIDA_DOMAIN + `/lounge/${boardName}/write`, post);
  }

}

export default AxiosApi;