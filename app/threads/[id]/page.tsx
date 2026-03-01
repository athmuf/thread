import ThreadContent from '@/components/cuitin/detail-thread/thread-content';

export default async function DetailThread({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <ThreadContent id={id} />;
}
