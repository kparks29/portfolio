define(function(require, exports, module) {
    // import dependencies
    var Engine = require('famous/core/Engine');
    var Modifier = require('famous/core/Modifier');
    var Transform = require('famous/core/Transform');
    var Surface = require('famous/core/Surface');
    var Transitionable = require('famous/transitions/Transitionable');
    var SpringTransition = require('famous/transitions/SpringTransition');
    var Easing = require('famous/transitions/Easing');
    Transitionable.registerMethod('spring', SpringTransition);

    // create the main context
    var mainContext = Engine.createContext();

    // your app here
    var firstSurface = new Surface({
      content: "hello world<br><img src='http://code.famo.us/assets/famous_logo.svg'>",
      size: [200, 200],
      properties: {
        backgroundColor: "rgba(100,100,255,1)",
        color: "white",
        textAlign: "center"
      },
      classes: ['double-sided']
    });

    var secondSurface = new Surface({
      content: "HI!!!!!<br><img src='http://code.famo.us/assets/famous_logo.svg'><p><h2>BACKWARDS</h2></p>",
      size: [200, 200],
      properties: {
        backgroundColor: "rgba(255,100,100,1)",
        color: "white",
        textAlign: "center"
      },
      classes: ['double-sided']
    });

    var thirdSurface = new Surface({
      content: "Click Me<br><img src='http://code.famo.us/assets/famous_logo.svg'><p><h2>READ ME</h2></p>",
      size: [200, 200],
      properties: {
        backgroundColor: "rgba(100,255,100,1)",
        color: "white",
        textAlign: "center"
      },
      classes: ['double-sided']
    });

    var initialTime = Date.now();
    var firstModifier = new Modifier({
        origin: [0.5, 0.5],
        align: [0.5, 0.3],
        transform: function(){
            return Transform.rotateY((Date.now() - initialTime) / 200);
        }
    });

    var spinModifier = new Modifier({
        transform: function(){
            return Transform.rotateZ((Date.now() - initialTime) / 250);
        }
    });

    var rotateModifier = new Modifier({
        transform: function(){
            return Transform.rotateX((Date.now() - initialTime) / 300);
        }
    });

    var spring = {
        method: 'spring',
        period: 1000,
        dampingRatio: 0.3
    }

    var centerObjectModifier = new Modifier({
        origin: [0.5, 0],
        align: [0.5, 0]
    });

    var leftObjectModifier = new Modifier({
        origin: [0.5, 0],
        align: [0.25, 0]
    });

    var rightObjectModifier = new Modifier({
        origin: [0.5, 0],
        align: [0.75, 0]
    });

    var rotateModifier1 = new Modifier({});
    var rotateModifier2 = new Modifier({});
    var rotateModifier3 = new Modifier({});
    var translateModifier1 = new Modifier({});
    var translateModifier2 = new Modifier({});
    var translateModifier3 = new Modifier({});

    mainContext.add(leftObjectModifier).add(translateModifier1).add(rotateModifier1).add(firstSurface);
    mainContext.add(centerObjectModifier).add(translateModifier2).add(rotateModifier2).add(secondSurface);
    mainContext.add(rightObjectModifier).add(translateModifier3).add(rotateModifier3).add(thirdSurface);

    translateModifier1.setTransform(
        Transform.translate(0, 400, 0), spring
    );
    translateModifier2.setTransform(
        Transform.translate(0, 400, 0), spring
    );
    translateModifier3.setTransform(
        Transform.translate(0, 400, 0), spring
    );

    var originalRotation1 = 0;
    var originalRotation2 = 0;
    var originalRotation3 = 0;
    firstSurface.on("click", function(){
        originalRotation1 += Math.PI;
        originalRotation2 += Math.PI;
        originalRotation3 += Math.PI;
        rotateModifier1.setTransform(Transform.rotateY(originalRotation1), {duration: 500}, console.log("complete"))
        rotateModifier2.setTransform(Transform.rotateY(originalRotation2), {duration: 500}, console.log("complete"))
        rotateModifier3.setTransform(Transform.rotateY(originalRotation3), {duration: 500}, console.log("complete"))
    });
    secondSurface.on("click", function(){
        originalRotation2 += Math.PI;
        rotateModifier2.setTransform(Transform.rotateY(originalRotation2), {duration: 500}, console.log("complete"))
    });
    thirdSurface.on("click", function(){
        originalRotation3 += Math.PI;
        rotateModifier3.setTransform(Transform.rotateY(originalRotation3), {duration: 500}, console.log("complete"))
    });
});
