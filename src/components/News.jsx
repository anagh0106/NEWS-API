import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {
    // articles = [
    //     {
    //         "source": {
    //             "id": null,
    //             "name": "Biztoc.com"
    //         },
    //         "author": "ft.com",
    //         "title": "Tesla cars put on local Chinese government’s purchase list for first time",
    //         "description": "Announcement comes as Elon Musk’s group faces increasing competition in world’s largest car market",
    //         "url": "https://biztoc.com/x/3c7ee2e6d6c6a617",
    //         "urlToImage": "https://biztoc.com/cdn/799/og.png",
    //         "publishedAt": "2024-07-04T15:46:30Z",
    //         "content": "Announcement comes as Elon Musks group faces increasing competition in worlds largest car market\r\nThis story appeared on ft.com, 2024-07-04."
    //     },
    //     {
    //         "source": {
    //             "id": "die-zeit",
    //             "name": "Die Zeit"
    //         },
    //         "author": "ZEIT ONLINE: Wirtschaft - Mathis Gann",
    //         "title": "Brandenburg: Tesla darf Werk in Grünheide erweitern",
    //         "description": "Tesla will sein einziges europäisches Werk ausbauen. Das Brandenburger Landesamt für Umwelt gab dafür nun vorerst grünes Licht – doch Wald darf nicht gerodet werden.",
    //         "url": "https://www.zeit.de/wirtschaft/2024-07/tesla-werk-gruenheide-ausbau-landesamt-umwelt",
    //         "urlToImage": "https://img.zeit.de/wirtschaft/2024-07/tesla-werk-gruenheide-ausbau-landesamt-umwelt-bild/wide__1300x731",
    //         "publishedAt": "2024-07-04T15:43:13Z",
    //         "content": "Der US-Konzern Tesla darf seine Autofabrik im brandenburgischen Grünheide ausbauen, um die Produktionskapazität zu erhöhen. Das Brandenburger Landesamt für Umwelt in Potsdam gab grünes Licht für eine… [+1239 chars]"
    //     },
    //     {
    //         "source": {
    //             "id": "focus",
    //             "name": "Focus"
    //         },
    //         "author": "DPA",
    //         "title": "Tesla - Tesla darf Fabrik in Grünheide ausbauen",
    //         "description": "Vor rund einem Jahr hat Autobauer Tesla einen Ausbau seines Werks beantragt. Das Land Brandenburg hat nun darüber entschieden.",
    //         "url": "https://www.focus.de/finanzen/news/tesla-tesla-darf-fabrik-in-gruenheide-ausbauen_id_260109828.html",
    //         "urlToImage": "https://p6.focus.de/img/finanzen/news/id_260109826/tesla-hat-gruenes-licht-fuer-einen-ausbau-der-produktion-bekommen..jpg?im=Crop%3D%280%2C170%2C2048%2C1024%29%3BResize%3D%281200%2C627%29&impolicy=perceptual&quality=mediumHigh&hash=cc5b8dde1cab002961d4f9d905080e0c48d1dd73680cd7f6d19d366686eab7a7",
    //         "publishedAt": "2024-07-04T15:40:05Z",
    //         "content": "Der US-Elektroautobauer Tesla darf seine einzige Autofabrik in Europa ausbauen, um die Produktionskapazität zu erhöhen. Das Brandenburger Landesamt für Umwelt gab dafür nach Angaben des Umweltministe… [+2253 chars]"
    //     }
    // ]
    constructor() {
        super();
        this.state = {
            // articles: this.articles,
            articles: [],
            loading: false,
            page: 1,
        }
    }
    async componentDidMount() {
        const url = "https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=93c41b43edfb417392b25d52df4141b1&pageSize=9";

        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData)
        this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults })

    }
    handlenext = async () => {
        const url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=93c41b43edfb417392b25d52df4141b1&page=${this.state.page + 1}&pageSize=9`

        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData)
        this.setState({
            page: this.state.page + 1,
            articles: parsedData.articles
        })
        console.log("Next")

    }
    handleprevious = async () => {
        const url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=93c41b43edfb417392b25d52df4141b1&page=${this.state.page - 1}&pageSize=9`
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData)
        this.setState({
            page: this.state.page - 1,
            articles: parsedData.articles
        })
        console.log("Prev")
    }
    render() {
        return (
            <>
                <div className='container pt-5 '>
                    <h1>News Dose - Top Headlines</h1>

                    <div className="row p-3 my-5">
                        {this.state.articles.map((element) => {
                            return (
                                <div className="col-md-4 pt-4" key={element.url}>
                                    <NewsItem title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 100) : ""}
                                        Imgurl={!element.urlToImage ? "https://imgs.search.brave.com/iOL7a4EW-_YWxq-lPlJ-YEbN6BBrRWdz0tQ1gtULP-A/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTY5/MTIwODk2NC9waG90/by9nb29kLW5ld3Mt/Y29uY2VwdC5qcGc_/cz02MTJ4NjEyJnc9/MCZrPTIwJmM9R2lL/UGJDRERpSEhfbVdi/eDZSbEpwTTF2Vl9L/aC12cVVjSEl4MHBU/Ukl5ST0" : element.urlToImage} newsUrl={element.url}
                                    />
                                </div>)
                        })}
                    </div>
                    <div className="container d-flex justify-content-between pb-5">
                        <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handleprevious}>&larr; Previous</button>
                        <button disabled={this.state.page >= 6} type="button" className="btn btn-dark" onClick={this.handlenext}>Next &rarr;</button>
                    </div>
                </div>
            </>
        )
    }
}

export default News