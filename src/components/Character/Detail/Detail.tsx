import React from 'react';
import styles from './Detail.module.scss';

type DetailProps = {
    label: string;
    value: string;
};

const Detail = ({ label, value }: DetailProps) => {
    return (
        <div className={styles.container}>
            <span className={styles.label}>{label}</span>
            <span className={styles.value}>{value}</span>
        </div>
    );
};

export default Detail;
