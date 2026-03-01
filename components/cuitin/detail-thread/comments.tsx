import CommentCard from './comment-card';
import SkeletonThreads from '../threads/skeleton-threads';
import { useAppSelector } from '@/src/hooks/redux-hooks';

const Comments = () => {
  const { data, isLoading, error } = useAppSelector(
    state => state.detailThread,
  );
  const comments = (data?.data.detailThread.comments || []).slice().reverse();

  if (isLoading) {
    return <SkeletonThreads />;
  }

  if (error) {
    return null;
  }

  return (
    <div className="py-4">
      {comments.map(comment => (
        <div key={comment.id}>
          <CommentCard data={comment} />
        </div>
      ))}
    </div>
  );
};

export default Comments;
