"use client";
import { useEffect, useState } from "react";
import styles from "./NewsPage.module.scss";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { useAppSelector } from "@/store/store";
import Image from "next/image";
import Link from "next/link";

const NewsPage = ({ allNews }: { allNews: IallNews[] }) => {
  let sourceNews: IallNews[];

  const pathname = usePathname();
  const currentPage = Number(pathname.slice(1));
  const [maxLengthLinks, setMaxLengthLinks] = useState(0);
  const [outputNews, setOutputNews] = useState<IallNews[]>();

  const view = useAppSelector((state) => state.viewReducer);
  const search = useAppSelector((state) => state.searchReducer);
  const source = useAppSelector((state) => state.sourceReducer);

  console.log(view);

  function getMaxLength() {
    if (view) {
      return Math.ceil(sourceNews.length / 4);
    } else {
      return Math.ceil(sourceNews.length / 3);
    }
  }

  useEffect(() => {
    if (source) {
      sourceNews = allNews.filter((news) => news.source === source);
    } else {
      sourceNews = allNews.slice();
    }

    if (search) {
      sourceNews = sourceNews.filter(
        (news) =>
          news.title!.toLowerCase().includes(search.toLowerCase()) ||
          news.description!.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (view) {
      setOutputNews(sourceNews.slice((currentPage - 1) * 4, currentPage * 4));
    } else if (!view) {
      setOutputNews(sourceNews.slice((currentPage - 1) * 3, currentPage * 3));
    }
    setMaxLengthLinks(getMaxLength());
  }, [search, view, source]);

  console.log(allNews);

  return (
    <div>
      {view ? (
        <div className={styles.blog}>
          {outputNews?.map((news, index) => (
            <div className={styles.blogNew} key={index * currentPage}>
              <h2 className={styles.title}>{news.title}</h2>
              <h5 className={styles.description}>{news.description}</h5>
              <a href={news.link} className={styles.readMore}>
                Подробнее
              </a>
              <div className={styles.misc}>
              <Link href={news.source!} className={styles.source}>{news.source === "https://www.mos.ru" ? "mos.ru" : "lenta.ru"}</Link>
                    <div className={styles.date}>{news.date}</div>
                </div>
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.blogView}>
          {outputNews?.map((news, index) => (
            <div className={styles.blogNew}  key={index * currentPage}>
              <Image width={200} height={100} src={news.img!} alt={""} />
              <div>
                <a href={news.link} className={styles.title}>
                  {news.title}
                </a>
                <h5 className={styles.description}>{news.description}</h5>
              </div>
                <div className={styles.miscView}>
                    <Link href={news.source!} className={styles.source}>{news.source === "https://www.mos.ru" ? "mos.ru" : "lenta.ru"}</Link>
                    <div className={styles.date}>{news.date}</div>
                </div>
            </div>
          ))}
        </div>
      )}

      {currentPage > 3 ? (
        <nav className={styles.nav}>
          <Link href={"/" + (currentPage - 2)}>{currentPage - 2}</Link>
          <Link href={"/" + (currentPage - 1)}>{currentPage - 1}</Link>
          <Link className={styles.active} href={"/" + currentPage}>
            {currentPage}
          </Link>
          <Link href={"/" + (currentPage + 1)}>{currentPage + 1}</Link>
          ...
          <Link href={"/" + maxLengthLinks}>{maxLengthLinks}</Link>
        </nav>
      ) : (
        <nav className={styles.nav}>
          <Link className={pathname === "/1" ? styles.active : ""} href={"/1"}>
            1
          </Link>
          <Link className={pathname === "/2" ? styles.active : ""} href={"/2"}>
            2
          </Link>
          <Link className={pathname === "/3" ? styles.active : ""} href={"/3"}>
            3
          </Link>
          <Link className={pathname === "/4" ? styles.active : ""} href={"/4"}>
            4
          </Link>
          ...
          <Link href={"/" + maxLengthLinks}>{maxLengthLinks}</Link>
        </nav>
      )}
    </div>
  );
};

export default NewsPage;
