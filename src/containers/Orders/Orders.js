import React,{Component} from "react";
import Order from "../../components/orders/Order";
import axios from "../../axios";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
class Orders extends Component{
    state={
        orders:[],
        loading:false
    }
    componentDidMount(){
        const fetchedOrder=[];
        this.setState({loading:true});
        axios.get("/order.json")
        .then(res=> {
            for(let key in res.data){
                fetchedOrder.push({...res.data[key],id:key})
            }
            this.setState({orders:fetchedOrder,loading:false})
        })
        .catch(error=>this.setState({loading:false}));
    }
    render(){
        return (
            <div>
                {this.state.orders.map(order=>{
                       return <Order key={order.id} price={order.price} ingredients={order.ingredients} />
                })}
                
            </div>
        );
    }
}
export default withErrorHandler(Orders,axios);