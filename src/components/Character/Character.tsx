import React, { useEffect, useState } from 'react';
import styles from './Character.module.scss';
import { iCharacter } from '../../types';
import { fetchCharacter } from '../../axios';
import Detail from './Detail/Detail';
import { Button } from '@mui/material';
import { useHistory } from 'react-router';

const Character = () => {
    const [character, setCharacter] = useState<iCharacter>();

    const history = useHistory();

    const getCharacter = async () => {
        const result = await fetchCharacter(
            window.location.pathname.split('characters/')[1]
        );
        if (result) {
            setCharacter(result);
        }
    };

    useEffect(() => {
        getCharacter();
    }, []);

    return (
        <div className={styles.container}>
            {character ? (
                <>
                    <h1>{character.name}</h1>
                    <div className={styles.details}>
                        <Detail label="Status" value={character.status} />
                        <Detail label="Species" value={character.species} />
                        <Detail label="Gender" value={character.gender} />
                        <Detail
                            label="Location"
                            value={character.location.name}
                        />
                    </div>
                    <img src={character.image} alt="character_img" />
                </>
            ) : (
                <h1>No info about character</h1>
            )}
            <Button
                sx={{
                    fontWeight: '700',
                    marginTop: '10px',
                }}
                variant="contained"
                onClick={() => history.push('')}
            >
                Go Home
            </Button>
        </div>
    );
};

export default Character;
