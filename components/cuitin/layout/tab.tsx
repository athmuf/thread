import { useRouter, useSearchParams } from 'next/navigation';
import { Separator } from '../../ui/separator';
import { Tabs, TabsList, TabsTrigger } from '../../ui/tabs';

const Tab = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentTab = searchParams.get('tab') || 'news';

  const handleChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('tab', value);

    router.push(`?${params.toString()}`);
  };
  return (
    <div className="w-full">
      <Tabs
        value={currentTab}
        defaultValue="news"
        className="w-full items-center"
        onValueChange={handleChange}
      >
        <TabsList variant="line" className="w-full max-w-96">
          <TabsTrigger value="news" className="cursor-pointer">
            News
          </TabsTrigger>
          <TabsTrigger value="category" className="cursor-pointer">
            Category
          </TabsTrigger>
          <TabsTrigger value="leaderboard" className="cursor-pointer">
            Leaderboards
          </TabsTrigger>
        </TabsList>
      </Tabs>
      <Separator />
    </div>
  );
};

export default Tab;
