import React, {Component} from 'react';
import items from "./data";

const RoomContext = React.createContext();


class RoomProvider extends Component {
    state={
        rooms:[],
        sortedRooms:[],
        featuredRooms:[],
        loading:true,
    };
    //get data
    componentDidMount() {
        let rooms = this.formateData(items);
        let featuredRooms = rooms.filter(room => room.featured === true);
        this.setState({
            rooms,
            featuredRooms,
            sortedRooms: rooms,
            loading:false,
        });
        console.log(featuredRooms);
    }
    formateData(items){
        let tempItems = items.map(item =>{
            let id = item.sys.id;
            let images = item.fields.images.map(image=>
                image.fields.file.url);
            return {...item.fields, images, id};
        });
        return tempItems;
    };

    getRoom = slug =>{
        let tempRooms = [...this.state.rooms];
        console.log(tempRooms);
        tempRooms.find((room) => console.log(room.slug));
        return  tempRooms.find((room) => room.slug === slug);
    };


    render() {
        return (
            <RoomContext.Provider value={{...this.state, getRoom:this.getRoom}}>
                {this.props.children}
            </RoomContext.Provider>
        );
    }
}

const RoomConsumer = RoomContext.Consumer;


export {RoomProvider, RoomConsumer, RoomContext};