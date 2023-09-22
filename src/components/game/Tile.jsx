import React, { useEffect, useState, forwardRef } from "react";
import Path from "./Path";
import Gem from "./Gem";
import { useDraggable } from '@dnd-kit/core';

export function DraggableTile({ paths, row, col, treasure, gems, gateways, children }) {
    const {attributes, isDragging, listeners, setNodeRef, transform} = useDraggable({
        id: paths,
        data: {
            paths: paths
        }
    });

    const style = {
        opacity: isDragging ? 0.9 : undefined,
        touchAction: "none",
        transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined
    }

    return (
        <Tile ref={ setNodeRef } style={ style } 
            {...attributes} {...listeners}
            paths={paths} row={row} col={col} treasure={treasure} gems={gems} gateways={gateways}>
                { children }
        </Tile>
    )
}

export const Tile = forwardRef(({ paths, row, col, treasure, gems, gateways, children, ...props }, ref) => {

    const defaultFill = "fill-zinc-400"
    const [edges, setEdges] = useState({
        "A": defaultFill,
        "B": defaultFill,
        "C": defaultFill,
        "D": defaultFill,
        "E": defaultFill,
        "F": defaultFill,
    })

    useEffect(() => {
        if (!gateways) return
        for (let gateway of gateways) {
            for (let location of gateway.Locations) {
                if (location[0] === row && location[1] === col) {
                    let temp = edges
                    if (gateway.Teams.length === 1) {
                        temp[gateway.Edges[0]] = "fill-" + gateway.Teams[0] + "-500"
                        temp[gateway.Edges[1]] = "fill-" + gateway.Teams[0] + "-500"
                    } else {
                        temp[gateway.Edges[0]] = "fill-" + gateway.Teams[0] + "-500"
                        temp[gateway.Edges[1]] = "fill-" + gateway.Teams[1] + "-500"
                    }
                    setEdges(temp)
                    return
                }
            }
        }
    }, [row, col, edges, gateways]);

    return (
        <div ref={ ref } { ...props }>
            <div>
                <div className="absolute">
                    { children }
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 115.47">
                    { treasure ? <polygon className="fill-indigo-900" points="97.74 30.17 97.74 85.3 50 112.87 2.26 85.3 2.26 30.17 50 2.61 97.74 30.17"/> : <></> }
                    { !treasure && paths ? <polygon className="fill-stone-900" points="97.74 30.17 97.74 85.3 50 112.87 2.26 85.3 2.26 30.17 50 2.61 97.74 30.17"/> : <></> }
                    {
                        paths ?
                        [0, 2, 4].map(idx => {
                            if (treasure && idx === 0 && paths[0] === "S") {
                                return <g key={ idx }> 
                                        <Path treasure={ treasure } path={ "A" } color={ `fill-zinc-100` } />
                                        <Path treasure={ treasure } path={ "B" } color={ `fill-zinc-100` } />
                                        <Path treasure={ treasure } path={ "C" } color={ `fill-zinc-100` } />
                                        <Path treasure={ treasure } path={ "D" } color={ `fill-zinc-100` } />
                                        <Path treasure={ treasure } path={ "E" } color={ `fill-zinc-100` } />
                                        <Path treasure={ treasure } path={ "F" } color={ `fill-zinc-100` } />
                                    </g>
                            } else if (treasure && idx === 2) {
                                return <Path key={ idx } treasure={ treasure } path={ paths[idx] } color={ `fill-zinc-100` } />
                            } else {
                                return <Path key={ idx } treasure={ treasure } path={ paths[idx]+paths[idx+1] } color={ `fill-zinc-100` } />
                            }
                        }) : <></>
                    }
                    {
                        gems ? gems.map((gem, idx) => {
                            const colorMap = {
                                "Amber": "fill-amber-400",
                                "Emerald": "fill-emerald-400",
                                "Sapphire": "fill-sky-400"
                            }
                            if (gem.Row !== row || gem.Column !== col) {
                                return null
                            }
                            if (gem.Edge === "S") {
                                return <Gem key={ idx } edge={ gem.Edge + (idx - 5) } onTreasure={ treasure } color={ colorMap[gem.Color] } />
                            }
                            return <Gem key={ idx } edge={ gem.Edge } onTreasure={ treasure } color={ colorMap[gem.Color] } />
                        }) : <></>
                    }
                    <g>
                        <polygon className={ edges["A"] } points="50 0 50 2.61 2.26 30.17 0 28.87 50 0"/>
                        <polygon className={ edges["B"] } points="100 28.87 97.74 30.17 50 2.61 50 0 100 28.87"/>
                        <polygon className={ edges["C"] } points="100 28.87 100 86.6 97.74 85.3 97.74 30.17 100 28.87"/>
                        <polygon className={ edges["D"] } points="100 86.6 50 115.47 50 112.87 97.74 85.3 100 86.6"/>
                        <polygon className={ edges["E"] } points="50 112.87 50 115.47 0 86.6 2.26 85.3 50 112.87"/>
                        <polygon className={ edges["F"] } points="2.26 30.17 2.26 85.3 0 86.6 0 28.87 2.26 30.17"/>
                    </g>
                </svg>
            </div>
        </div>
    )
})
