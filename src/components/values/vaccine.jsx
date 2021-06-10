import React, { useState, useEffect } from 'react'
import { Card, Statistic, Image } from 'semantic-ui-react'

function Vaccine(props) {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    let total = 0;

    useEffect(() => {
        fetch("https://disease.sh/v3/covid-19/vaccine/coverage/countries?lastdays=30&fullData=false")
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

    function search(myArray, nameKey) {
        for (let j = 0; j < myArray.length; j++) {
            if (myArray[j].country === nameKey) {
                return myArray[j].countryInfo.flag;
            } else if (j === myArray.length - 1) {
                return 'data:image/jpeg;base64,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'
            }
        }
    }


    if (error) {
        return <div>Ошибка: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Загрузка...</div>;
    } else {
        items.map(u => total = total + u.timeline[Object.keys(u.timeline)[Object.keys(u.timeline).length - 1]])
        return (
            <Card.Group centered>
                <Card fluid>
                    <Card.Header>
                        <Statistic size='tiny'>
                            <Statistic.Value>Total Vaccine: {total}</Statistic.Value>
                        </Statistic>
                    </Card.Header>
                    <Card.Content>
                        <Statistic size='miny'>
                            <Statistic.Label>Date: {props.toDay}</Statistic.Label>
                        </Statistic>
                    </Card.Content>
                </Card>
                {items.map(u => {
                    return (
                        <Card>
                            <Card.Header>
                                <Statistic size='tiny'>
                                    <Statistic.Value>Continent: {u.country}</Statistic.Value>
                                    <Image src={search(props.items, u.country)}></Image>
                                </Statistic>
                            </Card.Header>
                            <Card.Content>
                                <Statistic size='miny'>
                                    <Statistic.Label>Vaccine today: {u.timeline[Object.keys(u.timeline)[Object.keys(u.timeline).length - 1]]}</Statistic.Label>
                                </Statistic>
                            </Card.Content>
                        </Card>
                    )
                })}
            </Card.Group>
        );
    }
}

export default Vaccine;