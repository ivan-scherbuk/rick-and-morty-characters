import React, { useEffect, useState } from 'react';
import styles from './Main.module.scss';
import { iCharacter } from '../../types';
import { fetchCharacters } from '../../axios';
import { useInView } from 'react-intersection-observer';

const SCROLL_LIMIT = 10; // amount of characters per "page" by technical task

const REQUEST_LIMIT = 20; // amount of characters per page from request

const Main = () => {
    const [characters, setCharacters] = useState<iCharacter[]>([]);
    const [reserveCharacters, setReserveCharacters] = useState<iCharacter[]>(
        []
    );
    const [page, setPage] = useState<number>(0);

    const getCharacters = async () => {
        const results = await fetchCharacters(page + 1);
        if (results) {
            setCharacters((prev) => [
                ...prev,
                ...results.slice(0, SCROLL_LIMIT),
            ]);
            setPage(page + 1);
            setReserveCharacters(results.slice(SCROLL_LIMIT));
        }
    };

    useEffect(() => {
        getCharacters();
    }, []);

    const { ref, inView } = useInView();

    useEffect(() => {
        if (inView && characters) {
            if (characters.length % REQUEST_LIMIT === 0) {
                getCharacters();
            } else {
                setCharacters((prev) => [...prev, ...reserveCharacters]);
            }
        }
    }, [inView]);

    return (
        <div className={styles.container}>
            <h1>Rick and Morty Characters</h1>
            <div className={styles.characters}>
                {characters?.map((item, index) => (
                    <div
                        onClick={() =>
                            window.open(`/characters/${item.id}`, '_blank')
                        }
                        ref={index + 3 === characters.length ? ref : null}
                        className={styles.character}
                        key={item.id}
                    >
                        <img src={item.image} alt="character_img" />
                        <span className={styles.character__name}>
                            {item.name}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Main;
