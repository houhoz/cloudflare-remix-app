import type { LoaderFunction } from '@remix-run/cloudflare';
import { json } from '@remix-run/cloudflare';
import { useLoaderData } from '@remix-run/react';

interface Customer {
  CustomerId: number;
  CustomerName: string;
}

export const loader: LoaderFunction = async ({ context, params }) => {
  const { env, cf, ctx } = context.cloudflare;
  const { results } = await env.DB.prepare('SELECT * FROM Customers')
    .bind()
    .all<Customer>();
  return json(results);
};

export default function Index() {
  const results = useLoaderData<typeof loader>();
  return (
    <div>
      <h1>Welcome to Remix</h1>
      <div>
        A value from D1:
        <pre>{JSON.stringify(results)}</pre>
        <div>
          {results.map((item) => (
            <pre key={item.CustomerId}>{JSON.stringify(item)}</pre>
          ))}
        </div>
      </div>
    </div>
  );
}
