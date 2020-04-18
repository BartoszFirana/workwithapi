import React, { useState, useEffect } from 'react';
import Item from './components/Item';
import styles from './App.module.scss';
import axios from 'axios';

function App() {
    const [items, setItem] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [load, setLoad] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        axios
            .get(`https://my-json-server.typicode.com/BartoszFirana/json/users`)
            .then((res) => {
                console.log('get', res.data);
                setItem(res.data);
            })
            .catch((err) => {
                setError(err.message);
                setLoad(true);
            });
    }, []);

    const updateItems = () => {
        const date = new Date();
        const components = [
            date.getYear(),
            date.getMonth(),
            date.getDate(),
            date.getHours(),
            date.getMinutes(),
            date.getSeconds(),
            date.getMilliseconds(),
        ];

        const id = components.join('');

        const user = {
            id: id,
            name: inputValue,
        };

        setItem([...items, user]);

        axios
            .post(`https://my-json-server.typicode.com/BartoszFirana/json/users`, user)
            .then((res) => {
                console.log(res);
                console.log(res.data);
            });
    };

    const removeItem = (itemId) => {
        setItem(items.filter((item) => item.id !== itemId));
    };

    const itemList = items.map((item) => (
        <Item key={item.id} name={item.name} remove={() => removeItem(item.id)} />
    ));

    const errorMessage = error && <p>{error.message}</p>;

    return (
        <div className={styles.app}>
            <h1>Lista</h1>
            <div className="list">{load ? errorMessage : itemList}</div>
            <label>
                Input
                <input
                    type="text"
                    name="text"
                    onChange={(e) => setInputValue(e.target.value)}
                    value={inputValue}
                />
            </label>
            <button onClick={() => updateItems()}>wyślij</button>
        </div>
    );
}

export default App;
