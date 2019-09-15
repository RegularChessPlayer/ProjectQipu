
import React from 'react'
import { Input, Button} from 'antd';
import { Table, Icon, List } from 'antd';
import 'antd/dist/antd.css';
import axios from "axios";

const ENDPOINT = 'http://www.aisweb.aer.mil.br/api/'
const API_PASS = '491e91d8-d644-11e9-9f40-00505680c1b4'
const API_KEY = '1803074724'

class ValExtView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isloading: false,
            icao_code: '',
            list_info: [],
            cartas: [],
            columns: [
                {
                    title: 'Especie',
                    dataIndex: 'especie',
                    key: 'especie',
                },
                {
                    title: 'Tipo',
                    dataIndex: 'tipo',
                    key: 'tipo',
                },
                {
                    title: 'Download',
                    dataIndex: 'link',
                    key: 'link',
                    render: (link) => (
                        <span>
                            <a href={link}> {<Icon type="cloud-download" style={{ fontSize: '32px', color: '#08c' }} />}</a>
                        </span>
                    ),
                }
            ]
        };
        this.onChange = this.onChange.bind(this);
        this.toggle = this.toggle.bind(this);
    }

    componentDidMount() {
        var that = this;
        var tempDate = new Date();
        that.setState({
            date:
                tempDate.getFullYear() + '-' + (tempDate.getMonth() + 1) + '-' + tempDate.getDate(),
            format_date:  
                tempDate.getDate()+ '/' + (tempDate.getMonth() + 1) + '/' + tempDate.getFullYear()
        });
    }

    onChange = (evt) => {
        this.setState({
            icao_code: evt.target.value.toUpperCase()
        });
    };

    getSun = () => {
        return axios.get(ENDPOINT + '?apiKey=' + API_KEY + '&apiPass=' + API_PASS
            + '&area=sol' + '&icaoCode=' + this.state.icao_code);
    }

    getMet = () => {
        return axios.get(ENDPOINT + '?apiKey=' + API_KEY + '&apiPass=' + API_PASS + '&area=met'
            + '&icaoCode=' + this.state.icao_code + '&dt_f=' + this.state.date);
    }

    getCartas = () => {
        return axios.get(ENDPOINT + '?apiKey=' + API_KEY + '&apiPass=' + API_PASS + '&area=cartas'
            + '&icaoCode=' + this.state.icao_code + '&dt_f=last_amdt');
    }

    toggle = () => {
        this.setState({is_loading: true})
        let that = this;
        axios.all([this.getSun(), this.getMet(), this.getCartas()])
            .then(axios.spread(function (sun, met, carta) {
                const parser = new DOMParser();
                let xml = parser.parseFromString(sun.data, 'text/xml');
                const sunrise = xml.getElementsByTagName('sunrise')[0].textContent
                const sunset = xml.getElementsByTagName('sunset')[0].textContent
                xml = parser.parseFromString(met.data, 'text/xml');
                const metar = xml.getElementsByTagName('metar')[0].textContent;
                const taf = xml.getElementsByTagName('taf')[0].textContent;
                xml = parser.parseFromString(carta.data, 'text/xml');
                const elements = Array.from(xml.getElementsByTagName('item'))
                let obj_elements = elements.map(element => {
                    return {
                        key: element.children[0].textContent,
                        especie: element.children[1].textContent,
                        tipo: element.children[2].textContent,
                        link: element.children[7].textContent
                    }
                });
                that.setState({
                    list_info: [
                        {
                            title: 'Nascer do Sol',
                            description: sunrise
                        },
                        {
                            title: 'Por do Sol',
                            description: sunset
                        },
                        {
                            title: 'METAR',
                            description: metar
                        },
                        {
                            title: 'TAF',
                            description: taf
                        }],
                    cartas: obj_elements,
                    is_loading: false
                });

            }))
            .catch((err) => {
                that.setState({is_loading: false})
                alert('Não foi possível obter informações!. Tente mais tarde.');
            });;
    };

    render() {
        return (
            <div>
                <div style={{ width: 400, margin: '100px auto' }}>
                    <h3> Escreva o código ICAO ex: SBMT, SBJD </h3>
                    <Input onChange={this.onChange} value={this.state.icao_code} style={{ width: `30%` }} />
                    <Button onClick={this.toggle} type="primary" loading={this.state.isloading} icon="search">
                        Pesquisar
                    </Button>
                    <div style={{ marginTop: 20 }}>
                        Data: { this.state.format_date }
                    </div>
                </div>
                <List
                    itemLayout="horizontal"
                    dataSource={this.state.list_info}
                    renderItem={item => (
                        <List.Item>
                            <List.Item.Meta
                                title={<a>{item.title}</a>}
                                description={item.description}
                            />
                        </List.Item>
                    )}
                />
                <Table dataSource={this.state.cartas} columns={this.state.columns}/>
            </div>
        );
    }
}

export default ValExtView;
