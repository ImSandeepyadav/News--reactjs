/* eslint-disable react/jsx-no-target-blank */
import React from 'react'

const NewsItem = (props)=> {

        let {title, description, imageUrl, newsUrl, author, date,source} = props;
        return (
            <div className="my-3">
                <div className="card" style ={{width: '20rem'}}>
                    <div>
                    <span className="badge rounded-pill bg-danger" style={{display: 'flex', justifyContent: 'flex-end', position: 'absolute', right: '0'}}>{source}
                    </span>
                    </div>
                    <img src={imageUrl} className="card-img-top" alt="..."/>
                    <div className="card-body">
                        <h5 className="card-title">{title}...</h5>
                        <p className="card-text">{description}...</p>
                        <p className="card-text"><small className="text-muted">By {!author?"Unknown": author} On {new Date(date).toGMTString()}</small></p>
                        <a href={newsUrl} target="_blank" className="btn btn-sm btn-outline-dark">Read More...</a>
                    </div>
                    </div>
            </div>
        )
}

export default NewsItem
