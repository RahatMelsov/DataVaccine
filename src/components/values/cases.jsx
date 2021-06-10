import React, { useState, useEffect } from 'react'
import { Card, Statistic, Image } from 'semantic-ui-react'

function MyComponent(props) {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);

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
        return (
            <Card.Group centered>
                <Card fluid>
                    <Card.Header>
                        <Statistic size='tiny'>
                            <Statistic.Value>Total: {items[props.tab][Object.keys(items[props.tab])[Object.keys(items[props.tab]).length - 1]]}</Statistic.Value>
                        </Statistic>
                    </Card.Header>
                    <Card.Content>
                        <Statistic size='miny'>
                            <Statistic.Label>Date: {props.toDay}</Statistic.Label>
                        </Statistic>
                    </Card.Content>
                </Card>
                {props.items.map(u => {
                    return (
                        <Card>
                            <Card.Header>
                                <Statistic size='tiny'>
                                    <Statistic.Value>country: {u.country}</Statistic.Value>
                                    <Image src={u.countryInfo.flag}></Image>
                                </Statistic>
                            </Card.Header>
                            <Card.Content>
                                <Statistic size='miny'>
                                    <Statistic.Label>{props.tab}: {u[props.tab]}</Statistic.Label>
                                    <Statistic.Label>{props.tabToDay[0]}: {u[props.tabToDay[1]]}</Statistic.Label>
                                    <Statistic.Label>{props.population}: {u[props.population]}</Statistic.Label>
                                </Statistic>
                            </Card.Content>
                        </Card>
                    )
                })}
            </Card.Group>
        );
    }
}

export default MyComponent;