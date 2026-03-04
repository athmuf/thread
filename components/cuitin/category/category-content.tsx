import CategoryThreads from './category-threads';
import CategoryList from './category-list';
import { Separator } from '../../ui/separator';

const CategoryContent = () => {
  return (
    <div data-testid="category-content">
      <CategoryList />
      <Separator />
      <CategoryThreads />
    </div>
  );
};
export default CategoryContent;
