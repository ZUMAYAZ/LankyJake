window.onload = function() {

  //Create a new phaser game, with dimensions of 800px wide and 600px
  var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

 //Global variables
 var bg1;
 var bg2;
 var bg3;
 var score = 0;
 var lives = 1;
 var controls;
 var platforms;

  //Preload function, Where we can load all the assets that will be used in our game
  function preload() {
    game.load.image('bg1', 'assets/Treehouse.png');
    game.load.image('bg2', 'assets/MountainVillage.png');
    game.load.image('bg3', 'assets/Backround3.jpg');
    game.load.spritesheet('Jake', 'assets/LankyJake.png',21,29);
    game.load.image('Evilguy', 'assets/Evil monster.png');
    game.load.image('SnowPlat', 'assets/Mountain Plat.png');
    game.load.image('EarthPlat', 'assets/TreehousePlat.png');
    game.load.image('CandyPlat', 'assets/CupCake Plat.png');

  }
  //End of the preload function

  //Create function, where all the initial objects are created
  function create() {
    //The first background is placed on the screen
    bg1 = game.add.sprite(0, 0,'bg1');
    bg1.width = game.world.width;
    bg1.height = game.world.height;
    //The second background is is placed just to the right of the screen
    bg2 = game.add.sprite(game.world.width, 0,'bg2');
    bg2.width = game.world.width;
    bg2.height = game.world.height;
    bg3 = game.add.sprite(game.world.width*2, 0,'bg3');
    bg3.width = game.world.width;
    bg3.height = game.world.height;

    platforms = game.add.group();
    platforms.enableBody = true;

    var ledge = platforms.create(400, 450, 'EarthPlat');
    ledge.scale.setTo(5,2);
    ledge.body.immovable = true;
    var ledge = platforms.create(800, 400, 'EarthPlat');
    ledge.scale.setTo(3,1.5);
    ledge.body.immovable = true;
    //Add the sprite sheet for the player
    //character = game.add.sprite(50, game.world.height-75, 'dude');
    //character.animations.add('right', [,,,], 10, true);
    //character.animations.play('right');


    //Add the player to the game world
    player = game.add.sprite(game.world.width/9, game.world.height - 150, 'Jake');
    player.anchor.setTo(0.5,0.5);
    player.scale.setTo(2,2);
    player.animations.add('right', [0,1,2], 7, true);
    //player.animations.add('die', [8,9,10,11], 10, false);
    game.physics.arcade.enable(player);
    player.body.gravity.y= 100;
    player.body.collideWorldBounds = true

    //TODO: Move these lines into update
    player.animations.play('right');
    //player.animations.stop();
    //player.frame = 4; //Standing frame

    controls = game.input.keyboard.addKeys(
      {
        'Jump1': Phaser.KeyCode.SPACEBAR,
        'Jump2': Phaser.KeyCode.UP
      }
      );
     //Add the score and lifes text into the game
      scoreText = game.add.text(620,game.world.height-50,'Score: ' + score, {fill:'yellow'});
      livesText = game.add.text(16,game.world.height-50,'Lives: ' + lives, {fill:'red'});

      //game.add.sprite(0,0,'Jake');
  }
  //End of the create function

  //Update function runs each and every frame
  function update() {

    //Collision events
    //game.physics.arcade.collide(player,platforms);

    //Each frame, both backgrounds move 1 pixel left
    bg1.x--;
    bg2.x--;
    bg3.x--;
    platforms.x--;

    //If the first background is completely off the screen
    if(bg1.x < -game.world.width){
      //Move it just to the right of the screen
      bg1.x = game.world.width*2;
    }

    //If the second background is completely off the screen
    if(bg2.x < -game.world.width){
      //Move it just to the right of the screen
      bg2.x = game.world.width*2;
    }

    //If the third backround is completely off the screen
    if(bg3.x < -game.world.width){
     //  Move it just to the right of the screen
     bg3.x = game.world.width*2;
    }

    //Makes the controls work
    if(controls.Jump1.justDown || controls.Jump2.justDown){
      console.log("jumping");
      player.body.velocity.y = -50;
    }

    //Score system
    score++;
    scoreText.text = "Score: " + score;
  }
  //End of the update function
};
//End of code
