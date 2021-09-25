import Link from 'next/link';
import request from '../utils/request';

interface Article {
  id: number
  [key: string]: any
}

type Props = {
  data: Article[]
}

export default function Home({ data }: Props) {
  return (
    <ul>

      {
        data.map(item => (
          <li key={item.id}>{item.id}</li>
        ))
      }
      <li>
        <Link href="/a" as="/a">
          <a>a</a>
        </Link>
      </li>
      <li>
        <Link href="/b" as="/b">
          <a>b</a>
        </Link>
      </li>
    </ul>
  );
}

export async function getServerSideProps(): Promise<any> {
  // Fetch data from external API
  const res = await request.get(`http://localhost:3002/article`);
  const { list } = res.data;

  // Pass data to the page via props
  return { props: { data: list } };
}