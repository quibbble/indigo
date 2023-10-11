import React, { useEffect } from "react";
import { useDroppable } from '@dnd-kit/core';

export default function DropSpace({row, col, tileSize, setOver, children}) {
    const {isOver, setNodeRef} = useDroppable({
        id: row + "," + col,
        data: {
            row: row,
            col: col
        }
    });

    useEffect(() => {
        if (setOver) {
            if (isOver) setOver(over => ({...over, ...{[row + "," + col]: true}}))
            else setOver(over => ({...over, ...{[row + "," + col]: false}}))
        }
    }, [isOver, setOver])

    return (
        <div ref={ setNodeRef } style={{ width: `${tileSize}px`, height: `${tileSize/1.1546}px`, marginTop: `${tileSize/6}px` }}>
            { children }
        </div>
    )
}
