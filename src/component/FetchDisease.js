import { Component } from 'react-native'
import {createSorter} from './Sort'

class List extends Component {
    state = {
        sorters: this.props.sorters
    }

    static defaultProps = {
        sorters:[{
            property: 'Disease', direction: 'ASC',
        }]
        // <List sorters={sorters}/>
    }

    componentDidMount() {
        const {sorters} = this.state
        fetch ('http://medped.achmadekojulianto.com/index.php/api/disease')
        .then(res => res.json())
        .then(this.onLoad.bind(this))
    }

    parseData (data){
        const {sorters} = this.state
        if (data && data.length) {
            if (Array.isArray(sorters) && sorters.length) {
                data.sort(createSorter(...sorters));
            }
        }
        return data;
    }

    onLoad = (data) => {
        this.setState({
            data: this.parseData(data)
        })
    }

    render(){
        const {data} = this.state

        return data ?
        this.renderData(data): this.renderLoading()
    }

    renderData(data){
        if (data && data.length > 0) {
            return (
                <View>
                    {data.map(item => (
                        <Text key={item.id} value={item.id}>{item.Disease}</Text>
                    ))}
                </View>
            )
        } else {
            return <Text></Text>
        }
    }

    renderLoading(){
        return <Text>Loading..</Text>
    }
}

export default List