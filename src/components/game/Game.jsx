import React, { useEffect, useState, forwardRef, useCallback } from "react";
import { BsArrowClockwise, BsArrowUp } from "react-icons/bs";
import DropSpace from "./DropSpace";
import { Tile, DraggableTile } from "./Tile";
import { DndContext, PointerSensor, useSensors, useSensor } from '@dnd-kit/core';

export const Game = forwardRef((props, ref) => {
    // eslint-disable-next-line no-unused-vars
    const { ws, game, network, chat, connected, error } = props;

    // websocket messages
    const sendPlaceTileAction = useCallback((team, tile, row, col) => {
        if (!ws.current) return;
        ws.current.send(JSON.stringify({"ActionType": "PlaceTile", "Team": team, "MoreDetails": {"Tile": tile, "Row": row, "Column": col}}));
    })

    const sendRotateTileAction = useCallback((team, tile) => {
        if (!ws.current) return;
        ws.current.send(JSON.stringify({"ActionType": "RotateTileClockwise", "Team": team, "MoreDetails": {"Tile": tile}}));
    })

     // game data
     const [team, setTeam] = useState();
     useEffect(() => {
         if (connected && network) setTeam(connected[network.Name])
     }, [connected, network]) 

    // drag and drop
    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8,
            },
        })
    )

    const handleDragEnd = useCallback((e) => {
        if (!e.over || team !== game.Turn || game.Winners.length > 0) return
        sendPlaceTileAction(team, e.active.data.current.paths, e.over.data.current.row, e.over.data.current.col)
    }, [team, game, sendPlaceTileAction])

    // board resize logic
    const [tileSize, setTileSize] = useState(0);

    const handleResize = useCallback(() => {
        const width = 9;
        if (!ref || !ref.current) return;
        else setTileSize(ref.current.clientWidth/width);
    }, [ref])

    useEffect(() => handleResize());

    useEffect(() => {
        window.addEventListener("resize", handleResize);
        return _ => window.removeEventListener("resize", handleResize)
    }, [handleResize]);

    return (
        <DndContext onDragEnd={ handleDragEnd } sensors={ sensors }>
            <div className="h-full flex flex-col justify-center items-center grow">
                <div className="box-border flex flex-col mb-[5.5rem]" style={{ width: `${ tileSize*9 }px`, height: `${ tileSize*9*0.84 }px` }}>
                    {
                        game ? game.MoreData.Board.Tiles.map((row, rIdx) => 
                            <div key={ rIdx } className="w-full h-full flex items-center justify-center">
                                {
                                    row.map((el, cIdx) => 
                                            <div key={ rIdx + "," + cIdx } className="box-border" style={{ width: `${tileSize}px`, height: `${tileSize*1.1546}px`, marginBottom: `${tileSize*-1}px`, marginRight: `${tileSize*-0.024}px`}}>
                                                { 
                                                    el ? 
                                                        <Tile paths={ el.Paths } row={ rIdx } col={ cIdx } treasure={ el.Treasure } gems={ game.MoreData.Board.Gems } gateways={ game.MoreData.Board.Gateways }>
                                                            <DropSpace key={ cIdx } row={ rIdx } col={ cIdx } tileSize={ tileSize } />
                                                        </Tile> : 
                                                        <Tile paths={ null } row={ rIdx } col={ cIdx } treasure={ false } gems={ null } gateways={ game.MoreData.Board.Gateways }>
                                                            <DropSpace key={ cIdx } row={ rIdx } col={ cIdx } tileSize={ tileSize } />                                   
                                                        </Tile> 
                                                }
                                            </div>) 
                                }
                            </div>) : null
                    }
                </div>

                <div className="mb-10 w-full flex justify-between items-center" style={{ height: `${tileSize}px` }}>
                    <div className="flex flex-col items-center text-zinc-400 max-w-[20%] select-none">
                        <div className="text-xs font-light italic mb-1 text-center">Click tile to rotate</div>
                        <BsArrowClockwise />    
                    </div>
                    <div className="flex gap-8">
                    {
                        game && game.MoreData.Variant === "LargeHands" ? [0, 1].map((_, idx) => 
                            <div key={ "hand" + idx } style={{ width: `${ tileSize*1.2 }px`, height: `${ tileSize*1.1546*1.2 }px` }}>
                                { 
                                    game && network && connected && game.MoreData.Hands[connected[network.Name]] && game.MoreData.Hands[connected[network.Name]].length > idx ? 
                                        <div className="cursor-pointer" onClick={ () => rotateTile(team, game.MoreData.Hands[connected[network.Name]][idx].Paths) }>
                                            <DraggableTile paths={ game.MoreData.Hands[connected[network.Name]][idx].Paths } row={ -1 } col={ -1 } treasure={ false } gems={ null } />
                                        </div> : 
                                        <Tile paths={ null } row={ -1 } col={ -1 } treasure={ false } gems={ null } />
                                }
                            </div>) : [0].map((_, idx) => 
                            <div key={ "hand" + idx } style={{ width: `${ tileSize*1.2 }px`, height: `${ tileSize*1.1546*1.2 }px` }}>
                                { 
                                    game && network && connected && game.MoreData.Hands[connected[network.Name]] ? 
                                        <div className="cursor-pointer" onClick={ () => sendRotateTileAction(team, game.MoreData.Hands[connected[network.Name]][idx].Paths) }>
                                            <DraggableTile paths={ game.MoreData.Hands[connected[network.Name]][idx].Paths } row={ -1 } col={ -1 } treasure={ false } gems={ null } />
                                        </div> : 
                                        <Tile paths={ null } row={ -1 } col={ -1 } treasure={ false } gems={ null } />

                                }
                            </div>)
                    }
                    </div>
                    <div className="flex flex-col items-center text-zinc-400 max-w-[20%] select-none">
                        <div className="text-xs font-light italic mb-1 text-center">Drag tile to place</div>
                        <BsArrowUp />    
                    </div>
                </div>
            </div>
        </DndContext>
    )
})
