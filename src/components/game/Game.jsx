import React, { useEffect, useState, forwardRef, useCallback } from "react";
import { BsArrowClockwise, BsArrowUp } from "react-icons/bs";
import { DndProvider } from "react-dnd";
import DropSpace from "./DropSpace";
import { HTML5Backend } from "react-dnd-html5-backend";
import Tile from "./Tile";
import { TouchBackend } from "react-dnd-touch-backend";
import { isMobile } from "react-device-detect";

export const Game = forwardRef((props, ref) => {
    // eslint-disable-next-line no-unused-vars
    const { ws, game, network, chat, connected, error } = props;

    // websocket messages
    const placeTile = (team, tile, row, col) => {
        if (!ws.current) return;
        ws.current.send(JSON.stringify({"ActionType": "PlaceTile", "Team": team, "MoreDetails": {"Tile": tile, "Row": row, "Column": col}}));
    }

    const rotateTile = (team, tile) => {
        if (!ws.current) return;
        ws.current.send(JSON.stringify({"ActionType": "RotateTileClockwise", "Team": team, "MoreDetails": {"Tile": tile}}));
    }

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
        <DndProvider backend={ isMobile ? TouchBackend : HTML5Backend }>
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
                                                        <Tile paths={ el.Paths } row={ rIdx } col={ cIdx } treasure={ el.Treasure } gems={ game.MoreData.Board.Gems } gateways={ game.MoreData.Board.Gateways } team={ null } placeTile={ () => {} }>
                                                            <DropSpace key={ cIdx } row={ rIdx } col={ cIdx } tileSize={ tileSize } />
                                                        </Tile> : 
                                                        <Tile paths={ null } row={ rIdx } col={ cIdx } treasure={ false } gems={ null } gateways={ game.MoreData.Board.Gateways } team={ null } placeTile={ () => {} }>
                                                            <DropSpace key={ cIdx } row={ rIdx } col={ cIdx } tileSize={ tileSize } />                                   
                                                        </Tile> 
                                                }
                                            </div>) 
                                }
                            </div>) : null
                    }
                </div>

                <div className="mb-10 w-full flex justify-between items-center" style={{ height: `${tileSize}px` }}>
                    <div className="flex flex-col items-center text-zinc-400 max-w-[20%]">
                        <div className="text-xs font-light italic mb-1 text-center">Click tile to rotate</div>
                        <BsArrowClockwise />    
                    </div>
                    <div className="flex gap-8">
                    {
                        game && game.MoreData.Variant === "LargeHands" ? [0, 1].map((_, idx) => 
                            <div key={ "hand" + idx } style={{ width: `${ tileSize*1.2 }px`, height: `${ tileSize*1.1546*1.2 }px` }}>
                                { 
                                    game && network && connected && game.MoreData.Hands[connected[network.Name]] && game.MoreData.Hands[connected[network.Name]].length > idx ? 
                                        <div className="cursor-pointer" onClick={ () => rotateTile(connected[network.Name], game.MoreData.Hands[connected[network.Name]][idx].Paths) }>
                                            <Tile paths={ game.MoreData.Hands[connected[network.Name]][idx].Paths } row={ -1 } col={ -1 } treasure={ false } gems={ null } team={ connected[network.Name] } placeTile={ placeTile } />
                                        </div> : 
                                        <Tile paths={ null } row={ -1 } col={ -1 } treasure={ false } gems={ null } team={ null } placeTile={ null } />
                                }
                            </div>) : [0].map((_, idx) => 
                            <div key={ "hand" + idx } style={{ width: `${ tileSize*1.2 }px`, height: `${ tileSize*1.1546*1.2 }px` }}>
                                { 
                                    game && network && connected && game.MoreData.Hands[connected[network.Name]] ? 
                                        <div className="cursor-pointer" onClick={ () => rotateTile(connected[network.Name], game.MoreData.Hands[connected[network.Name]][idx].Paths) }>
                                            <Tile paths={ game.MoreData.Hands[connected[network.Name]][idx].Paths } row={ -1 } col={ -1 } treasure={ false } gems={ null } team={ connected[network.Name] } placeTile={ placeTile } />
                                        </div> : 
                                        <Tile paths={ null } row={ -1 } col={ -1 } treasure={ false } gems={ null } team={ null } placeTile={ null } />

                                }
                            </div>)
                    }
                    </div>
                    <div className="flex flex-col items-center text-zinc-400 max-w-[20%]">
                        <div className="text-xs font-light italic mb-1 text-center">Drag tile to place</div>
                        <BsArrowUp />    
                    </div>
                </div>
            </div>
        </DndProvider>
    )
})