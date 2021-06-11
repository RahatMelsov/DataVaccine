import React from 'react'
import { Button, Header, Image, Modal, Statistic, Divider } from 'semantic-ui-react'
import moment from 'moment'
import './vaccine.css'

function ModalExampleModal(props) {
    const [open, setOpen] = React.useState(false)

    function search(myArray, nameKey) {
        for (let j = 0; j < myArray.length; j++) {
            if (myArray[j].country === nameKey) {
                return myArray[j].timeline[Object.keys(myArray[j].timeline)[Object.keys(myArray[j].timeline).length - 1]]
            } else if (j === myArray.length - 1) {
                return 'Not Information'
            }
        }
    }

    console.log(moment().millisecond(props.items.updated))

    return (
        <Modal
            closeIcon
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            trigger={<Button><Image src={props.flag}></Image></Button>}
        >
            <Modal.Header></Modal.Header>
            <Modal.Content image>
                <Image size='medium' src={props.items.countryInfo.flag} wrapped />
                <Modal.Description left>
                    <Header>{props.items.country}</Header>
                    <Statistic size='mini'>
                        <Statistic.Value>Cases: {props.items.cases}</Statistic.Value>
                        <Statistic.Value>Active: {props.items.active}</Statistic.Value>
                        <Statistic.Value>Deaths: {props.items.deaths}</Statistic.Value>
                        <Statistic.Value>Recovered: {props.items.recovered}</Statistic.Value>
                        <Statistic.Value>Vaccine: {search(props.vaccine, props.items.country)}</Statistic.Value>
                    </Statistic>
                    <Divider />
                </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
                <Button color='black' onClick={() => setOpen(false)}>
                    Nope
        </Button>
            </Modal.Actions>
        </Modal>
    )
}

export default ModalExampleModal