const ReactDOM = require("react-dom");
const React = require("react");
const {observer} = require("mobx-react");
const {observable, action} = require("mobx");

class AppData {
    currencies = ['bch', 'btc', 'dash', 'etc', 'eth', 'fct', 'lsk', 'ltc', 'rep', 'xem', 'xmr', 'xrp', 'zec'];

    @observable.shallow
    rates = {};

    _pid = 0;

    constructor() {
        this.fetchRate();
        this._pid = setInterval(this.fetchRate.bind(this), 5 * 1000);
    }

    fetchRate() {
        fetch('https://coincheck.com/api/rate/all')
            .then(function(response) {
                return response.json();
            })
            .then(this.updateRates.bind(this))
    }

    @action
    updateRates (response) {
        this.rates = response.jpy || {};
        console.log(this.rates);
    }
}

@observer
class App extends React.Component {
    render() {
        return (
            <div className="currency-container">
                {this.props.data.currencies.map(this._eachCurrency.bind(this))}
            </div>
        );
    }

    _eachCurrency(currency, key) {
        let rate = this.props.data.rates[currency];

        return (
            <div className="currency" key={key}>
                <div className="currency-icon">
                    <img src={'./img/' + currency + '.svg'}/>
                    <p  className="currency-name">{currency}</p>
                </div>
                <div className="currency-rate">
                    {rate ? Math.round(rate) : '-'}円
                </div>
            </div>
        );
    }
}


ReactDOM.render(<App data={new AppData()}/>, document.getElementById('app'));
