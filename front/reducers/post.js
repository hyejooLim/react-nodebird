import shortid from 'shortid';
import produce from 'immer';
import faker from 'faker';

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
          id: shortid.generate(),
          src: 'https://user-images.githubusercontent.com/71072930/120285755-8a209080-c2f8-11eb-9581-ece7b7d34fbf.jpeg',
        },
        {
          id: shortid.generate(),
          src: 'https://user-images.githubusercontent.com/71072930/120285868-a58b9b80-c2f8-11eb-8bf6-601a80c75090.jpeg',
        },
        {
          id: shortid.generate(),
          src: 'https://user-images.githubusercontent.com/71072930/120285952-bcca8900-c2f8-11eb-8720-483689293e23.jpeg',
        },
      ],
      Comments: [
        {
          id: shortid.generate(),
          User: {
            id: shortid.generate(),
            nickname: 'jenny',
          },
          content: 'wow~ so cute!',
        },
        {
          id: shortid.generate(),
          User: {
            id: shortid.generate(),
            nickname: 'IU',
          },
          content: '귀엽네요^^',
        },
      ],
      imagePaths: [], // 업로드된 이미지 경로
      addPostLoading: false,
      addPostDone: false,
      addPostError: null,
      removePostLoading: false,
      removePostDone: false,
      removePostError: null,
      addCommentLoading: false,
      addCommentDone: false,
      addCommentError: null,
    },
  ],
};

initialState.mainPosts = initialState.mainPosts.concat(Array(20).fill().map(() => ({
  id: shortid.generate(),
  User: {
    id: shortid.generate(),
    nickname: faker.name.findName(),
  },
  content: faker.lorem.paragraph(),
  Images: [{
    src: faker.image.image(),
  }],
  Comments: [{
    id: shortid.generate(),
    User: {
      id: shortid.generate(),
      nickname: faker.name.findName(),
    },
    content: faker.lorem.sentence(),
  }],
})))

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

export const REMOVE_POST_REQUEST = 'REMOVE_POST_REQUEST';
export const REMOVE_POST_SUCCESS = 'REMOVE_POST_SUCCESS';
export const REMOVE_POST_FAILURE = 'REMOVE_POST_FAILURE';

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

export const removePost = (data) => ({
  type: REMOVE_POST_REQUEST,
  data,
});

const dummyPost = (data) => ({
  id: data.id,
  content: data.content,
  User: {
    id: 1,
    nickname: 'joo',
  },
  Image: [],
  Comments: [],
});

const dummyComment = (data) => ({
  id: shortid.generate(),
  content: data,
  User: {
    id: 1,
    nickname: 'joo',
  }
});

const reducer = (state = initialState, action) => {
  return produce(state, (draft) => { // immer가 알아서 불변성 유지 (state -> draft)
    switch (action.type) {
      case ADD_POST_REQUEST:
        draft.addPostLoading = true;
        draft.addPostDone = false;
        draft.addPostError = null;
        break;
      case ADD_POST_SUCCESS:
        draft.addPostLoading = false;
        draft.addPostDone = true;
        draft.mainPosts.unshift(dummyPost(action.data));
        break;
      case ADD_POST_FAILURE:
        draft.addPostLoading = false;
        draft.addPostError = action.error;
        break;
      case REMOVE_POST_REQUEST:
        draft.removePostLoading = true;
        draft.removePostDone = false;
        draft.removePostError = null;
        break;
      case REMOVE_POST_SUCCESS:
        draft.removePostLoading = false;
        draft.removePostDone = true;
        draft.mainPosts = draft.mainPosts.filter((v) => v.id !== action.data);
        break;
      case REMOVE_POST_FAILURE:
        draft.removePostLoading = false;
        draft.removePostError = action.error;
        break;
      case ADD_COMMENT_REQUEST:
        draft.addCommentLoading = true;
        draft.addCommentDone = false;
        draft.addCommentError = null;
        break;
      case ADD_COMMENT_SUCCESS: 
        const post = draft.mainPosts.find((v) => v.id === action.data.postId);
        post.Comments.unshift(dummyComment(action.data.content));
        draft.addCommentLoading = false;
        draft.addCommentDone = true;
        break;
      case ADD_COMMENT_FAILURE:
        draft.addCommentLoading = false;
        draft.addCommentError = action.error;
        break;
      default:
        break;
    }
  });
};

export default reducer;
