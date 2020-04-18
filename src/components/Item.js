import React from 'react'
import styles from './Item.module.scss'

export default function Item({name, remove}) {
    return (
        <div className={styles.item}>
            <p className={styles.paragraph}>{name}</p>
            <button className={styles.button} onClick={() => remove()}>x</button>
        </div>
    )
}
