/* eslint-disable react/no-typos */
import React, { Component } from 'react'
import NewsItem from './NewsItem'
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component'


export class News extends Component {

    capitalizeFirstLetter = (string)=>{
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    constructor(props){
        super(props);
        this.state = {
            articles : [],
            loading: false,
            page : 1,
            totalResults: 0
        }
        document.title = `${this.capitalizeFirstLetter(this.props.category)} - News`;
    }

    async upadteNews(){
        this.props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        this.props.setProgress(30);
        let parsedData = await data.json()
        this.props.setProgress(70);
        this.setState({articles: parsedData.articles, totalResults: parsedData.totalResults})
        this.props.setProgress(100);
    }

   async componentDidMount(){
       this.upadteNews();
    }

    handlePrevClick = async ()=>{
        this.setState({page: this.state.page - 1});
        this.upadteNews();
    } 

    handleNextClick = async ()=>{
        this.setState({page: this.state.page + 1});
        this.upadteNews();
    }

    fetchMoreData = async ()=>{
        this.setState({page: this.state.page + 1});
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json()
        this.setState({articles: this.state.articles.concat(parsedData.articles), 
            totalResults: parsedData.totalResults})
    }

    render() {
        return (
            <>
            <h2 className="text-center" style={{margin: "30px 0px", marginTop: "90px"}}>News - Top {this.capitalizeFirstLetter(this.props.category)} Headlines </h2>
            <InfiniteScroll
                dataLength={this.state.articles.length}
                next={this.fetchMoreData}
                hasMore={this.state.articles.length !== this.state.totalResults}
                >
                 <div className="container">   
                <div className="row">
                    {this.state.articles.map((element)=> {
                     return <div className="col-md-4" key={element.url}>
                      <NewsItem title={element.title?element.title:""} description={element.description?element.description:""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
                      </div>
                    })}
                 </div>
                 </div>
                 </InfiniteScroll>
            </>
        )
    }
}

News.defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general'
}
News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string, 
}

export default News
