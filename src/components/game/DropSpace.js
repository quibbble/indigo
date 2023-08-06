import React from "react";
import { useDrop } from "react-dnd";

export default function DropSpace({row, col, tileSize, children}) {
    const [, drop] = useDrop(() => ({
        accept: "tile",
        drop: () => ({ row: row, col: col }),
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    }));
    return (
        <div style={{ width: `${tileSize}px`, height: `${tileSize/1.1546}px`, marginTop: `${tileSize/6}px` }} ref={drop}>{children}</div>
    )
}
