export default async function Page({
  params,
}: {
  params: { username: string };
}) {
  return <div>Profile for {params.username}</div>;
}
