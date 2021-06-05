const initialState = {
  mainPosts: [
    {
      id: 1,
      User: {
        id: 1,
        nickname: 'joo',
      },
      content: '첫 번째 게시글 #해시태그 #안녕',
      Images: [
        {
          src: 'https://user-images.githubusercontent.com/71072930/120285755-8a209080-c2f8-11eb-9581-ece7b7d34fbf.jpeg',
        },
        {
          src: 'https://user-images.githubusercontent.com/71072930/120285868-a58b9b80-c2f8-11eb-8bf6-601a80c75090.jpeg',
        },
        {
          src: 'https://user-images.githubusercontent.com/71072930/120285952-bcca8900-c2f8-11eb-8720-483689293e23.jpeg',
        },
      ],
      Comments: [
        {
          User: {
            nickname: 'jenny',
          },
          content: 'wow~ so cute!',
        },
        {
          User: {
            nickname: 'IU',
          },
          content: '귀엽네요^^',
        },
      ],
      // 업로드된 이미지 경로
      imagePaths: [],
      postAdded: false,
    },
  ],
};

const ADD_POST = 'ADD_POST';
export const addPost = {
  type: ADD_POST,
};

const dummyPost = {
  id: 2,
  content: '더미데이터입니다.',
  User: {
    id: 1,
    nickname: 'joo'
  },
  Image: [],
  Comments: []
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST:
      return {
        ...state,
        mainPosts: [dummyPost, ...state.mainPosts]
      };
    default:
      return state;
  }
};

export default reducer;
