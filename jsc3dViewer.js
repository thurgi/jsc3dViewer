/** Copyright (C) 2014 thurgi*/
angular.module('ui-jsc3d', [
]).controller('jsc3dViewerCtrl', ['$scope',
    function (s) {
        s.modes = [
            {label: 'point', value: 'point'},
            {label: 'wireframe', value: 'wireframe'},
            {label: 'flat', value: 'flat'},
            {label: 'smooth', value: 'smooth'},
            {label: 'texturesmooth', value: 'texturesmooth'}
        ];

        s.setRenderMode=function(viewer, mode) {
            viewer.setRenderMode(mode);
            if (mode === 'texturesmooth') {
                var scene = viewer.getScene();
                if (scene) {
                    var objects = scene.getChildren();
                    for (var i = 0; i < objects.length; i++)
                        objects[i].isEnvironmentCast = true;
                }
            }
            viewer.update();
        };

    }]).directive('jsc3dViewer', function () {

    function init(canvas, file, options) {
        var viewer = new JSC3D.Viewer(canvas);
        viewer.setParameter('SceneUrl', file);
        viewer.setParameter('InitRotationX', 20);
        viewer.setParameter('InitRotationY', 20);
        viewer.setParameter('InitRotationZ', 20);
        viewer.setParameter('ModelColor', options.color);
        viewer.setParameter('BackgroundColor1', options.backgroundColorTop);
        viewer.setParameter('BackgroundColor2', options.backgroundColorBottom);
        viewer.setParameter('RenderMode', options.mode);
        viewer.setParameter('ProgressBar', options.progressBar);
        if(options.sphereMapUrl){
            viewer.setParameter('SphereMapUrl', options.sphereMapUrl);
        }
        viewer.init();
        viewer.update();
        return viewer;
    }

    return {
        controller: 'jsc3dViewerCtrl',
        restrict: 'E',
        replace: true,
        scope: {
            file: '@',
            width: '@',
            height: '@',
            mode:'@',
            progressBar:'@',
            color : '@',
            backgroundColorTop : '@',
            backgroundColorBottom : '@',
            selectMode : '@',
            sphereMapUrl : '@',
            stl: '='
        },
        template: '<div><canvas></canvas><div><select ng-if="selectMode" ng-model="mode" ng-change="setRenderMode(stl,mode);" ng-options="option.value as option.label for option in modes"></select></div></div>',
        compile: function () {
            return {
                pre: function (s, e) {
                    for (var i = 0; i < e[0].childElementCount; i++) {
                        if (e[0].childNodes[i].nodeName === 'CANVAS') {
                            s.canvas = e[0].children[i];
                        }
                    }
                    s.canvas.width = s.width ? s.width : 200;
                    s.canvas.height = s.height ? s.height : 200;
                    s.options = {
                        mode : s.mode ? s.mode : 'flat',
                        progressBar : s.progressBar ? s.progressBar : 'on',
                        color : s.color ? s.color : '#CAA618',
                        backgroundColorTop : s.backgroundColorTop ? s.backgroundColorTop : '#FFFFFF',
                        backgroundColorBottom : s.backgroundColorBottom ? s.backgroundColorBottom : '#6A6AD4',
                        sphereMapUrl : s.sphereMapUrl
                    };
                },
                post: function (s) {
                    s.stl = init(s.canvas, s.file, s.options);
                }
            };
        }
    };
});
