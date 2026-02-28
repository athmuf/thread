import { TriangleAlert } from 'lucide-react';
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from '../empty';

const ErrorState = () => {
  return (
    <Empty className="min-h-[50vh]">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <TriangleAlert />
        </EmptyMedia>
        <EmptyTitle>Thread not found</EmptyTitle>
        <EmptyDescription>
          Oops, something went wrong. Please try again later.
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
};

export default ErrorState;
