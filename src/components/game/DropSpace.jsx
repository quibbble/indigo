import React from "react";
import { useDroppable } from '@dnd-kit/core';

export default function DropSpace({row, col, tileSize, children}) {
    const {isOver, setNodeRef} = useDroppable({
        id: row + "," + col,
        data: {
            row: row,
            col: col
        }
    });

    return (
        <div ref={ setNodeRef } style={{ width: `${tileSize}px`, height: `${tileSize/1.1546}px`, marginTop: `${tileSize/6}px` }}>{ children }</div>
    )
}
