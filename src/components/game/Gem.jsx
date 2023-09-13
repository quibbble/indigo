import React from "react";

export default function Gem({ edge, onTreasure, color }) {

    switch (edge + "," + onTreasure) {
        case "A,true":
            return <polygon className={ color } points="37.57 46.44 46.44 41.32 46.25 30.76 37.2 25.32 28.33 30.43 28.52 41 37.57 46.44"/>
        case "B,true":
            return <polygon className={ color } points="53.57 41.32 62.43 46.44 71.49 41 71.67 30.44 62.81 25.32 53.76 30.76 53.57 41.32"/>
        case "C,true":
            return <polygon className={ color } points="66 52.62 66 62.86 75.24 67.98 84.48 62.86 84.48 52.62 75.24 47.5 66 52.62"/>
        case "D,true":
            return <polygon className={ color } points="62.43 69.03 53.56 74.15 53.75 84.71 62.8 90.15 71.67 85.04 71.48 74.47 62.43 69.03"/>
        case "E,true":
            return <polygon className={ color } points="46.43 74.15 37.57 69.03 28.51 74.47 28.33 85.03 37.19 90.15 46.24 84.71 46.43 74.15"/>
        case "F,true":
            return <polygon className={ color } points="34 62.85 34 52.61 24.76 47.49 15.52 52.61 15.52 62.85 24.76 67.97 34 62.85"/>
        
        case "A,false":
            return <polygon className={ color } points="30.6 13.84 21.74 18.96 21.92 29.52 30.98 34.96 39.84 29.85 39.65 19.28 30.6 13.84"/>
        case "B,false":
            return <polygon className={ color } points="78.31 18.99 69.45 13.87 60.39 19.31 60.21 29.87 69.07 34.99 78.13 29.55 78.31 18.99"/>
        case "C,false":
            return <polygon className={ color } points="79.26 52.59 79.26 62.82 88.5 67.94 97.74 62.82 97.74 52.59 88.5 47.47 79.26 52.59"/>
        case "D,false":
            return <polygon className={ color } points="69.09 80.5 60.22 85.62 60.41 96.18 69.46 101.62 78.33 96.5 78.14 85.94 69.09 80.5"/>
        case "E,false":
            return <polygon className={ color } points="39.83 85.65 30.96 80.53 21.91 85.97 21.72 96.53 30.59 101.65 39.64 96.21 39.83 85.65"/>
        case "F,false":
            return <polygon className={ color } points="2.29 52.59 2.29 62.82 11.53 67.94 20.77 62.82 20.77 52.59 11.53 47.47 2.29 52.59"/>
        
        case "S1,true":
            return <polygon className={ color } points="75.58 43.18 84.45 48.3 93.5 42.86 93.69 32.3 84.82 27.18 75.77 32.62 75.58 43.18"/>
        case "S2,true":
            return <polygon className={ color } points="75.4 72.61 75.4 82.85 84.64 87.97 93.88 82.85 93.88 72.61 84.64 67.49 75.4 72.61"/>
        case "S3,true":
            return <polygon className={ color } points="49.81 87.17 40.95 92.29 41.13 102.85 50.19 108.29 59.05 103.17 58.87 92.61 49.81 87.17"/>
        case "S4,true":
            return <polygon className={ color } points="24.42 72.29 15.55 67.17 6.5 72.61 6.31 83.17 15.18 88.29 24.23 82.85 24.42 72.29"/>
        case "S5,true":
            return <polygon className={ color } points="24.6 42.86 24.6 32.62 15.36 27.5 6.12 32.62 6.12 42.86 15.36 47.98 24.6 42.86"/>
        case "S6,true":
            return <polygon className={ color } points="50.19 28.3 59.05 23.18 58.87 12.62 49.81 7.18 40.95 12.3 41.13 22.86 50.19 28.3"/>
        default:
            return <path/>;
    }
}
