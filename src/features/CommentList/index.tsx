import { Comment } from 'entities/comment/ui/Comment';
import { useEffect, useState } from 'react';
import { api } from 'utils/axios';
import { IComment } from 'utils/types';

type CommentListProps = {
  id: number,
  show: boolean,
};

export const CommentList = ({ id, show }: CommentListProps) => {
  const [comments, setComments] = useState<Array<IComment>>([]);

  useEffect(() => {
    const getComments = async (id: number) => {
      const res = await api.get(`posts/${id}/comments`);
      setComments(res.data);
    };
    if (show) getComments(id);
  }, [show]);

  const commentsElems = comments.map((comment: IComment) => (
    <Comment {...comment} key={comment.id} />
  ));
  return (
    <section className="comments text-xs">
      {comments && show && (
        <>
          <h3 className="text-base"> Comments:</h3>
          <ul>{commentsElems}</ul>
        </>
      )}
    </section>
  );
};
