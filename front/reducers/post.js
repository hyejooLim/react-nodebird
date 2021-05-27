const initialState = {
  mainPosts: [
    {
      id: 1,
      User: {
        id: 1,
        nickname: 'joo',
      },
      content: '첫 번째 게시글 #해시태그',
      Image: [
        {
          src: 'https://www.google.com/url?sa=i&url=https%3A%2F%2F1boon.kakao.com%2Fholapet%2Fholapet1150&psig=AOvVaw0UzmlLJk0uVm-CUC29Ii8G&ust=1622213389431000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCPiVqfiN6vACFQAAAAAdAAAAABAD',
        },
        {
          src: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.hankookilbo.com%2FNews%2FRead%2FA2020091315250004591&psig=AOvVaw0UzmlLJk0uVm-CUC29Ii8G&ust=1622213389431000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCPiVqfiN6vACFQAAAAAdAAAAABAI',
        },
        {
          src: 'https://www.google.com/url?sa=i&url=http%3A%2F%2Fm.blog.naver.com%2Fpetianbooks%2F221502212743&psig=AOvVaw0UzmlLJk0uVm-CUC29Ii8G&ust=1622213389431000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCPiVqfiN6vACFQAAAAAdAAAAABAO',
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
