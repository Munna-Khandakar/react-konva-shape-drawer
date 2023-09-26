import {Stage, Layer,  Rect} from 'react-konva';
import React, {useState} from 'react'


function App() {
    const [selectedItem,setSelectedItem] = useState(0)
    const [items,setItems] = useState([
        { id:1, x:50, y:50 }, { id:2, x:150, y:50 }, { id:3, x:250, y:50 }])
    function containerKeyDownHandler(e:any){
        if(e.keyCode === 9){
            // select the item
            itemSelector(e);
        }else{
            // select the position
            locationChangeHandlerOfItem(e);
        }
        e.preventDefault();

    }


    function itemSelector(e:any){
        setSelectedItem((prevState)=>((prevState % items?.length)+1))
    }

    function locationChangeHandlerOfItem(e:any){
        const steps = 4;
        if(!selectedItem) return;
        const item = items.find((item)=>item?.id === selectedItem);
        if(!item) return;
        if (e.keyCode === 37) {
            //move to left direction
            item.x = item.x - steps;

        } else if (e.keyCode === 38) {
            // move to down direction
            item.y = item.y - steps;

        } else if (e.keyCode === 39) {
            // move to right direction
            item.x = item.x + steps;
        } else if (e.keyCode === 40) {
            // move to up direction;
            item.y = item.y + steps;
        } else {
            return;
        }

        const newItems = items.map((i)=>{
            if(i?.id === selectedItem){
                return {
                    ...i,
                    x : item.x,
                    y : item.y
                }
            }else{
                return i;
            }
        });
        setItems([...newItems]);
    }


    return (
   <div
       tabIndex={1}
       onKeyDown={containerKeyDownHandler}
   >
       <Stage width={window.innerWidth} height={window.innerHeight}>
           <Layer>
               {
                   items?.map((item, index)=>(
                       <Rect
                           key={index}
                           height={50}
                           width={80}
                           x={item?.x}
                           y={item?.y}
                           fill={'red'}
                           stroke={'green'}
                           strokeWidth={selectedItem === item?.id ? 2:0}
                       />
                   ))
               }
           </Layer>
       </Stage>
   </div>

    );
}

export default App;
