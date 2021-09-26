import Link from 'next/link'
import {Fragment, useEffect, useState} from 'react'
import Pagination from './Pagination'
import Api from '../redux/api'

const pageSize = 10

const FeedList = (props) => {
    let lastYear
    const {categoryId, tagId} = props
    const [data, setData] = useState([])
    const [meta, setMete] = useState({})
    const [page, setPage] = useState(1)
    function onChange(page) {
        setPage(page)
    }
    const payload = { page, pageSize }
    if (categoryId) {
        payload.category_id = categoryId
    }
    if(tagId){
        payload.tag_id = tagId
    }
    // validateCategory 防止刷新获取从url取不到分类id 导致数据请求多次 防止内存泄漏
    const validateCategory = Number.isInteger(Number(categoryId))
    useEffect(() => {
        if(validateCategory){
            Api.articleList(payload).then(res => {
                const result = res.data.data.data
                const mt = res.data.data.meta
                setMete(mt)
                setData(result)
            })
        }
    }, [page, categoryId])

    return (
        <div className="post-wrap archive">
            {
                data.map(art => {
                    let cur_year = new Date(art.created_at).getFullYear()
                    const someYear =  lastYear === cur_year
                    if (!someYear) lastYear = cur_year
                    const renderYear = someYear ? '' : <h3 style={{
                        fontWeight: 'bold'
                    }}>{cur_year}</h3>
                    return  <Fragment key={art.id}>
                        {renderYear}
                        <article  className="archive-item">
                            <Link href="/article/[id]" as={`/article/${art.id}`} >
                                <a className="archive-item-link">
                                    {art.title}
                                </a>
                            </Link>
                            <span className="archive-item-date">
                                {art.created_at}
                            </span>
                        </article>
                    </Fragment>
                })
            }


            <div className="pagination">
                {
                    meta.count ?
                        <Pagination totalCount={meta.count} onChange={onChange} pageSize={pageSize} pageNeighbours={1} />
                        : null
                }
            </div>
        </div>
    )
}

export default FeedList
