import React, { useState, useEffect } from 'react'
import { Tab, Card, Segment } from 'semantic-ui-react'
import { Button, Image, List } from 'semantic-ui-react'
import MyComponent from './values/cases'
import useWindowDimensions from './windowSize'
import moment from 'moment'
import Poginations from './values/Paginations'


function MyComponents() {

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    let toDay = moment(new Date()).format('l')


    useEffect(() => {
        Promise.all([
            fetch("https://disease.sh/v3/covid-19/countries").then(res => res.json()),
            fetch("https://disease.sh/v3/covid-19/vaccine/coverage/countries?lastdays=30&fullData=false").then(res => res.json())
        ]).then(
                ([cases, vaccine]) => {
                    setItems([cases, vaccine]);
                    setIsLoaded(true);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [])

    let pageElements = 0;
    let pagesCount;
    const { height, width } = useWindowDimensions();
    if (width > 1203) {
        pageElements = 8;
    } else if (width > 915) {
        pageElements = 6;
    } else if (width > 611) {
        pageElements = 4;
    } else {
        pageElements = 2;
    }

    
    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage] = useState(pageElements)
    

    if (error) {
        return <div>Ошибка: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Загрузка...</div>;
    } else {
    
        const indexOfLastPost = currentPage * postsPerPage;
        const indexOfFirstPost = indexOfLastPost - postsPerPage;
        console.log(items)
        const currentPosts = items[0].slice(indexOfFirstPost, indexOfLastPost);

        const paginate = (number) => setCurrentPage(number)

        const panes = [
            { menuItem: 'cases', render: () => <div> < MyComponent toDay={toDay} 
            items={currentPosts}
            totalSize = {items[0]}
            vaccine={items[1]} 
            cases={'cases'}
            deaths = {'deaths'}
            reverenge={'recovered'}
            tabToDay={['items cases Per One Million', "casesPerOneMillion"]} 
            population={'population'}/> 
            </div> },
        ]

        return (
            <div>
                <List><Tab panes={panes}></Tab></List>
                <Card.Group>
                <Card fluid>
                    <Segment>
                        < Poginations totalPosts={items[0].length} postsPerPage={postsPerPage} paginate={paginate}/>
                    </Segment>
                </Card>
                </Card.Group>
            </div>
        );
    }
}

export default MyComponents