import React from 'react';
import './Article.css';
import Skeleton from 'react-loading-skeleton';

const Paragraph = (props) => {
    const content = props.content;

    return (
        <div>
            <h5>{content || <Skeleton amount={10} />}</h5>
        </div>
    )
}

export default Paragraph;