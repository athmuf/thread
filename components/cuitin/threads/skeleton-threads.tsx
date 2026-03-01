import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader } from '../../ui/card';
import { Separator } from '../../ui/separator';

const SkeletonThreads = () => {
  return (
    <div className="py-4">
      {[...Array(3)].map((_, index) => (
        <Card
          key={index}
          className="shadow-none border-0 rounded-none py-3 gap-2"
        >
          <CardHeader className="flex items-center px-2 md:px-6">
            <Skeleton className="size-10 shrink-0 rounded-full" />
            <Skeleton className="ml-2 h-4 w-36" />
          </CardHeader>
          <CardContent className="md:pl-20 pl-16 space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-20" />
          </CardContent>
          <Separator />
        </Card>
      ))}
    </div>
  );
};

export default SkeletonThreads;
