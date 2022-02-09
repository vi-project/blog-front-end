

interface IPagination {
  current: number;
  count: number;
  total: number;

}

export const Pagination: React.FunctionComponent<IPagination> = (props) => {
  const { count, total, current } = props;
  const page_count = Math.ceil(total / 10) || 0;
  const first: boolean = current === 1;
  const last: boolean = current === page_count;
  return (<div>

  </div>);
};
