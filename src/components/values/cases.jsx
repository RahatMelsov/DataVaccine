import React, { useState, useEffect } from 'react'
import { Card, Statistic, Segment, Grid } from 'semantic-ui-react'
import ModalExampleModal from './vaccine'
import useWindowDimensions from './../windowSize'
import Paginations from './Paginations'
import './style.css'

function MyComponent(props) {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    let sumVaccines = 0;
    let elements = 0;


    function sumVaccine(myArray) {
        for (let j = 0; j < myArray.length; j++) {
            sumVaccines = sumVaccines + myArray[j].timeline[Object.keys(myArray[j].timeline)[Object.keys(myArray[j].timeline).length - 1]]
        }
        return sumVaccines
    }

    useEffect(() => {
        fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=30")
            .then(res => res.json())
            .then(
                (result) => {
                    setItems(result);
                    setIsLoaded(true);
                },

                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [])

    if (error) {
        return <div>Ошибка: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Загрузка...</div>;
    } else {
        debugger;
        // width > ? 1203 == 4 915 == 3 611 == 2 
        return (
            <Card.Group centered>
                <Card fluid>
                    <Card.Header>
                        <Statistic size='tiny'>
                            <Statistic.Value>Total Cases: {items[props.cases][Object.keys(items[props.cases])[Object.keys(items[props.cases]).length - 1]]}</Statistic.Value>
                            {/* <Statistic.Value>Total Death: {items[props.deaths][Object.keys(items[props.deaths])[Object.keys(items[props.deaths]).length - 1]]}</Statistic.Value>
                            <Statistic.Value>Total Recovery: {items[props.reverenge][Object.keys(items[props.reverenge])[Object.keys(items[props.reverenge]).length - 1]]}</Statistic.Value>
                            <Statistic.Value>Total Vaccine: {sumVaccine(props.vaccine)}</Statistic.Value> */}
                        </Statistic>
                    </Card.Header>
                    <Card.Content>
                        <Statistic size='miny'>
                            <Statistic.Label>Date: {props.toDay}</Statistic.Label>
                        </Statistic>
                    </Card.Content>
                </Card>
                { props.items.map(u => {
                    console.log(u.countryInfo)
                    debugger;
                        return (<Card>
                            <Card.Header>
                                <Statistic size='tiny'>
                                    <Statistic.Value>country: {u.country}</Statistic.Value>
                                    <ModalExampleModal flag={u.countryInfo.flag} items={u} vaccine={props.vaccine} />
                                </Statistic>
                            </Card.Header>
                            <Card.Content>
                                <Statistic size='miny'>
                                    <Statistic.Label>{props.cases}: {u[props.cases]}</Statistic.Label>
                                    <Statistic.Label>{props.tabToDay[0]}: {u[props.tabToDay[1]]}</Statistic.Label>
                                    <Statistic.Label>{props.population}: {u[props.population]}</Statistic.Label>
                                </Statistic>
                            </Card.Content>
                        </Card>)
                    }
            )}
            </Card.Group>
        );
    }
}

export default MyComponent;