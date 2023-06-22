import Parser from "rss-parser";
import styles from "./NewsPage.module.scss"

let links = ["https://www.mos.ru/rss", "https://lenta.ru/rss/news"];
links = []
async function getData() {
    const parser = new Parser();
    const responses = await Promise.all(
    links.map(link => parser.parseURL(link))
    );
    return responses;
}



const BlogPage = async () => {
    
    
    return ( 
       <div>
        
       </div>
        
     );
}
 
export default BlogPage;