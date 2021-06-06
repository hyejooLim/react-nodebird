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
      addPostLoading: false,
      addPostDone: false,
      addPostError: null,
      addCommentLoading: false,
      addCommentDone: false,
      addCommentError: null,
    },
  ],
};

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';

// Dynamic creator
export const addPost = (data) => ({
  type: ADD_POST_REQUEST,
  data,
});

export const addComment = (data) => ({
  type: ADD_COMMENT_REQUEST,
  data,
});

const dummyPost = {
  id: 2,
  content: '더미데이터입니다.',
  User: {
    id: 1,
    nickname: 'joo',
  },
  Image: [],
  Comments: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST_REQUEST:
      return {
        ...state,
        addPostLoading: true,
        addPostDone: false,
        addPostError: null,
      };
    case ADD_POST_SUCCESS:
      return {
        ...state,
        addPostLoading: false,
        addPostDone: true,
        mainPosts: [dummyPost, ...state.mainPosts],
      };
    case ADD_POST_FAILURE:
      return {
        ...state,
        addCommentLoading: false,
        addCommentError: action.error,
      };
    case ADD_COMMENT_REQUEST:
      return {
        ...state,
        addCommentLoading: true,
        addCommentDone: false,
        addCommentError: null,
      };
    case ADD_COMMENT_SUCCESS:
      return {
        ...state,
        addCommentLoading: false,
        addCommentDone: true,
      };
    case ADD_COMMENT_FAILURE:
      return {
        ...state,
        addCommentLoading: false,
        addCommentError: action.error,
      };
    default:
      return state;
  }
};

export default reducer;
