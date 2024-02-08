export default async function Component({
  params,
}: {
  params: { slug: string };
}) {
  return <div>Article {params.slug}</div>;
}
