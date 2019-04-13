import React, { Component } from "react";
import WooCommerceAPI from "woocommerce-api"

class App extends Component {
    state = {
        wooCommerce: null
    }
    componentDidMount() {
        this.setState({
            wooCommerce: new WooCommerceAPI({
                url: 'http://bbquick.local',
                consumerKey: 'ck_7055f7b3cef11dbc488acdb02457727a6215e86c',
                consumerSecret: 'cs_1cf278cdbe83bdbd5245ce808ec1eefa664ebb87',
                wpAPI: true,
                version: 'wc/v3'
            })
        });
    }

    testFunc = async () => {
        console.log('Tested');
        console.log(this.state.wooCommerce);
    }

    render() {
        return (
            <div>
                Home
                <button onClick={this.testFunc}>Test Me</button>
            </div>
        )
    }
}

export default App;
