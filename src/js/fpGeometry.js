// Depends on fpCore.js
"use strict"

const scpGeometry =
    freeze (
         new function () {
             this.point = x => y => ( { x, y } );
             this.line = point1 => point2 => [ point1, point2 ];
             this.verticalPosition = y => applyRv ( y );
             this.horizontalLine = startPoint => endPoint => y => this.line ( startPoint ) ( endPoint ).map ( this.verticalPosition ( y ) );
        }
    );
