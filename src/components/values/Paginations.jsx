import React from 'react';
import { Pagination } from 'semantic-ui-react'

const Poginations = (props) => {

    const pageNumbers =[]

    for(let i = 0; i < Math.ceil(props.totalPosts / props.postsPerPage); i++) {
        pageNumbers.push(i)
    }

    return (
    <div>
        <Pagination
        fluid
        centered
    boundaryRange={0}
    defaultActivePage={1}
    ellipsisItem={null}
    firstItem={1}
    lastItem={pageNumbers.length}
    siblingRange={1}
    totalPages={pageNumbers.length}
    onPageChange={(e) => props.paginate(e.target.attributes.value.value)}
  />
    </div>)
}

export default Poginations