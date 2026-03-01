import clsx from 'clsx';
import { Badge } from '../../ui/badge';
import { useAppDispatch, useAppSelector } from '@/src/hooks/redux-hooks';
import { setSelectedCategory } from '@/src/features/threads/threads-slice';

const CategoryList = () => {
  const dispatch = useAppDispatch();
  const { categories, selectedCategory } = useAppSelector(
    state => state.threads,
  );

  const handleCategory = (data: string) => {
    dispatch(setSelectedCategory(data));
  };
  return (
    <div className="px-3 py-6">
      <div className="font-semibold">Popular Tags:</div>
      <div className="flex gap-2 mt-2">
        {categories.map(category => (
          <div key={category}>
            <Badge
              variant="outline"
              className={clsx(
                'hover:bg-neutral-200 transition-colors duration-200 cursor-pointer hover:border-neutral-300',
                {
                  'bg-amber-400 border-amber-400':
                    selectedCategory === category,
                },
              )}
              onClick={() => handleCategory(category)}
            >
              #{category}
            </Badge>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
