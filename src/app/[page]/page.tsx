import Parser from "rss-parser";
import styles from "./NewsPage.module.scss"
import { useEffect, useState } from "react";
import NewsPage from "@/components/NewsPage";


const links = ["https://www.mos.ru/rss", "https://lenta.ru/rss/news"];

async function getData() {
    const parser = new Parser();
    const responses = await Promise.all(
    links.map(link => parser.parseURL(link))
    );
    return responses;
}





const BlogPage = async () => {
    
    let rss = null;

    const data = await getData();
    
    
    const allNews: IallNews[] = [];

    if (data) {
        rss = data;
    }


    function formateDate(stringDate: string) {
        const date = new Date(stringDate);
        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const year = date.getFullYear();

        return `${day}.${month}.${year}`;
        
    }

    if (rss) {
        for (let elem of rss) {
            
            for (let item of elem.items){
                const title = item.title;
                const description = item.content ? item.content :"";
                const link = item.link;
                const source = elem.link ? elem.link : elem.feedUrl;
                const img = item.enclosure ? item.enclosure.url : item.link;
                const date = item.pubDate;
                
                allNews.push({
                    title,
                    description,
                    link,
                    img,
                    date: date ? formateDate(date) : date,
                    source
                })
            }
        }
    }

    if (rss) {

        return ( 
           <NewsPage allNews={allNews}/>
            
         );

    } else {
        return (
            <div>
                loading...
            </div>
        )
    }
}
 
export default BlogPage;