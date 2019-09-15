import React from 'react'
import { Link } from 'react-router-dom'
import { Layout, Menu, Icon } from 'antd'

import 'antd/dist/antd.css';
import '../index.css'

const { Sider } = Layout;

class Topo extends React.Component {

    state = {
        current: 'val_ext',
        collapsed: false,
    }

    handleClick = e => {
        this.setState({
            current: e.key,
        });
    };

    onCollapse = collapsed => {
        this.setState({ collapsed });
    };

    render() {
        return (
            <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
                <Menu onClick={this.handleClick} selectedKeys={[this.state.current]} mode="inline" theme="dark">
                    <Menu.Item key="val_ext">
                        <Icon type="dollar"/>
                        <span>Valor</span>
                        <Link to={'/'} />
                    </Menu.Item>
                    <Menu.Item key="icao">
                        <Icon type="radar-chart" />
                        <span>Aviador</span>
                        <Link to={'/aviador'} />
                    </Menu.Item>
                </Menu>
            </Sider>
        );
    }
}

export default Topo