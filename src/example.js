import produce from "immer";

const state = {
  number: 1,
  dontChangeMe: 2,
};
const nextState = produce(state, (draft) => {
  draft.number += 1;
});
console.log(nextState);

const state1 = {
  posts: [
    {
      id: 1,
      title: "제목입니다.",
      body: "내용입니다.",
      comments: [
        {
          id: 1,
          text: "와 정말 잘 읽었습니다.",
        },
      ],
    },
    {
      id: 2,
      title: "제목입니다.",
      body: "내용입니다.",
      comments: [
        {
          id: 2,
          text: "또 다른 댓글 어쩌고 저쩌고",
        },
      ],
    },
  ],
  selectedId: 1,
};
const nextState2 = produce(state1, (draft) => {
  const post = draft.posts.find((post) => post.id === 1);
  post.comments.push({
    id: 3,
    text: "와 정말 쉽다",
  });
});
const nextState1 = {
  ...state1,
  posts: state1.posts.map((post) =>
    post.id === 1
      ? {
          ...post,
          comments: [
            ...post.comments,
            {
              id: 3,
              text: "새로운 댓글",
            },
          ],
        }
      : post
  ),
};
console.log(nextState2);
