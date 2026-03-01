import CategoryThreads from './category-threads';
import CategoryList from './category-list';
import { Separator } from '../../ui/separator';

const CategoryContent = () => {
  return (
    <div>
      <CategoryList />
      <Separator />
      <CategoryThreads />
    </div>
  );
};
export default CategoryContent;
