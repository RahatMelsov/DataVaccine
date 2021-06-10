import React, { useState, useEffect } from 'react'
import { Tab } from 'semantic-ui-react'
import { Button, Image, List } from 'semantic-ui-react'
import MyComponent from './values/cases'
import Vaccine from './values/vaccine'
import moment from 'moment'


function MyComponents() {

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    let toDay = moment(new Date()).format('l')


    useEffect(() => {
        fetch("https://disease.sh/v3/covid-19/countries")
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setItems(result);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [])

    const panes = [
        { menuItem: 'cases', render: () => <div> < MyComponent toDay={toDay} items={items} tab={'cases'} tabToDay={['items cases Per One Million', "casesPerOneMillion"]} /> </div> },
        { menuItem: 'deaths', render: () => <div> < MyComponent toDay={toDay} items={items} tab={'deaths'} tabToDay={['deaths Per One Million', "deathsPerOneMillion"]} population={'population'} /> </div> },
        { menuItem: 'recovered', render: () => <div> < MyComponent toDay={toDay} items={items} tab={'recovered'} tabToDay={['recovered Per One Million', "recoveredPerOneMillion"]} /> </div> },
        { menuItem: 'vaccine', render: () => <div> < Vaccine toDay={toDay} items={items} /> </div> }
    ]

    if (error) {
        return <div>Ошибка: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Загрузка...</div>;
    } else {
        return (
            <div>
                <List><Tab panes={panes}></Tab></List>
            </div>
        );
    }
}

export default MyComponents