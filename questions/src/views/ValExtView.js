import React from 'react'
import { Input, Button, message } from 'antd';
import axios from "axios";
import { InputNumber } from 'antd';


const { TextArea, } = Input;
const ENDPOINT = 'http://localhost:8090/convert'


class IcaoView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value_to_convert: '',
            converted_value: '',
            isloading: false,
        };
        this.onChange = this.onChange.bind(this);
        this.toggle = this.toggle.bind(this);
    }

    toggle = () => {
        this.setState({ is_loading: true })
        axios.post(ENDPOINT,
            {
                'value_to_convert': this.state.value_to_convert
            }).then((res) => {
                message.info("Valor Convertido com sucesso.");
                this.setState({ is_loading: false, converted_value: res.data['converted_value'] });
            }
            ).catch((error) => {
                this.setState({ is_loading: false });
                alert('Não foi possível converter o valor!. Tente mais tarde.');
            });
    };

    onChange = (value) => {
        let new_value = '';
        if (value != null) {
            new_value = value.toString().replace('.', ',')
        }else{
            new_value = ''
        }
        this.setState({
             value_to_convert: new_value
        });
        console.log(this.state.value_to_convert);
    };

    render() {
        return (
            <div>
                <h3>Digite um valor númerico</h3>
                <InputNumber style={{ width: `30%` }}
                  defaultValue={1000}
                  decimalSeparator = ','
                  onChange={this.onChange}
                />
                <div style={{ marginTop: 20 }}>
                    <Button onClick={this.toggle} type="primary" loading={this.state.isloading} >
                        Converter
                    </Button>
                    <h4>Valor Convertido</h4>
                    <TextArea disabled={true} value={this.state.converted_value} style={{ width: `60%` }} />
                </div>
            </div>
        );
    }
}

export default IcaoView;
