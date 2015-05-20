# jsc3dViewer
STL viewer with jsc3d lib

This angular directive need jsc3d v1.6.5

"<script src='/path/to/lib/jsc3d-full-1.6.5/jsc3d.js' type='text/javascript'></script>"
"<script src='/path/to/lib/jsc3d-full-1.6.5/jsc3d.touch.js' type='text/javascript'></script>"

Here is the list of options in this Directive:

file: '@',//url to stl file

width: '@',//default 200

height: '@',// default 200

mode:'@',//point, wireframe, flat, smooth, texturesmooth

progressBar:'@',//on, off

color : '@',//default #CAA618

backgroundColorTop : '@',//default #FFFFFF

backgroundColorBottom : '@',//default #6A6AD4

selectMode : '@',//booelan

sphereMapUrl : '@',//path to texture

stl: '='// link stl object
