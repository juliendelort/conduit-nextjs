export default async function Component({
  params,
}: {
  params: { username: string };
}) {
  return <div>Profile for {params.username}</div>;
}
