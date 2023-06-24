"use client"

import React, { useEffect, useState } from "react";
import styles from "./NewsLayout.module.scss"
import Image from "next/image";
import { setSourceState } from "@/store/source/sourceSlice"
import { setViewState } from "@/store/view/viewSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, useAppSelector } from "@/store/store";
import { setSearchState } from "@/store/search/searchSlice";



const BlogLayout = ({children}: {children: React.ReactNode}) => {

        
    const dispatch = useDispatch<AppDispatch>();
    const source = useAppSelector(state => state.sourceReducer);
    const view = useAppSelector(state => state.viewReducer);
    const search = useAppSelector(state => state.searchReducer);
    
    function reset() {
        dispatch(setSourceState(""));
        dispatch(setViewState(true));
        dispatch(setSearchState(""));
    }

    return ( 
        <div className={styles.main}>
            <header className={styles.header}>
                <div>
                    <h1 className={styles.title}>Список новостей</h1>
                    <div className={styles.reset} onClick={reset}>
                        <Image className={styles.resetImage} width={20} height={16} src="/reset.svg" alt="reset arrows" />
                    </div>
                </div>
                <form>
                    <input onChange={(event) => {
                        event.preventDefault();
                        setTimeout(() => {dispatch(setSearchState(event.target.value))}, 1000);
                    }}/>
                    <Image width={20} height={20} className={styles.image} src="/search.svg" alt="search icon"/>
                    
                </form>
                
            </header>

            <main>
                <div className={styles.blogMain}>
                    <section className={styles.sources}>
                        <h4 className={source === "" ? styles.active : ""} onClick={() => dispatch(setSourceState(""))}>Все</h4>
                        <h4 className={source === "https://lenta.ru" ? styles.active : ""} onClick={() => dispatch(setSourceState("https://lenta.ru"))}>Lenta.ru</h4>
                        <h4 className={source === "https://www.mos.ru/" ? styles.active : ""} onClick={()=> dispatch(setSourceState("https://www.mos.ru/"))}>Mos.ru</h4>
                    </section>
                    <section className={styles.view}>
                        <div className={!view ? styles.active : ""} 
                        onClick={() => {dispatch(setViewState(false))}}></div>
                        <div className={view ? styles.active : ""} 
                        onClick={() => {dispatch(setViewState(true))}}></div>
                    </section>
                </div>

                {children}
            </main>

        </div>
     );
}
 
export default BlogLayout;