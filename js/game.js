window.onload = function() {

  //Create a new phaser game, with dimensions of 800px wide and 600px
  var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

 //Global variables
 var bg1;
 var bg2;
 var bg3;
 var score = 0;
 var best = score;
 var controls;
 var platforms;

  //Preload function, Where we can load all the assets that will be used in our game
  function preload() {
    game.load.image('bg1', 'assets/Treehouse.png');
    game.load.image('bg2', 'assets/MountainVillage.jpg');
    game.load.image('bg3', 'assets/Backround3.jpg');
    game.load.spritesheet('Jake', 'assets/LankyJake.png',32,37);
    game.load.image('Evilguy', 'assets/Evil monster.png');
    game.load.image('SnowPlat', 'assets/Mountain Plat.png');
    game.load.image('EarthPlat', 'assets/TreehousePlat.png');
    game.load.image('CandyPlat', 'assets/CupCake Plat.png');

  }
  //End of the preload function

  //Create function, where all the initial objects are created
  function create() {

    //Enable arcade physics inthe game world
    game.physics.startSystem(Phaser.Physics.ARCADE);

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

    //Adding the platforms in the world
    var ledge = platforms.create(30, 475, 'EarthPlat');
    ledge.scale.setTo(5,3);
    ledge.body.immovable = true;
    var ledge = platforms.create(260, 480, 'EarthPlat');
    ledge.scale.setTo(5,3);
    ledge.body.immovable = true;
    var ledge = platforms.create(450, 450, 'EarthPlat');
    ledge.scale.setTo(5,3);
    ledge.body.immovable = true;
    var ledge = platforms.create(645, 420, 'EarthPlat');
    ledge.scale.setTo(5,3);
    ledge.body.immovable = true;
    //Adding snow platforms into the world
    var ledge = platforms.create(820, 400, 'SnowPlat');
    ledge.scale.setTo(5,5);
    ledge.body.immovable = true;
    var ledge = platforms.create(1050, 430, 'SnowPlat');
    ledge.scale.setTo(5,5);
    ledge.body.immovable = true;
    var ledge = platforms.create(1100, 430, 'SnowPlat');
    ledge.scale.setTo(5,5);
    ledge.body.immovable = true;
    var ledge = platforms.create(1300, 400, 'SnowPlat');
    ledge.scale.setTo(5,5);
    ledge.body.immovable = true;
    var ledge = platforms.create(1400, 400, 'SnowPlat');
    ledge.scale.setTo(5,5);
    ledge.body.immovable = true;
    //Adding the candy platforms
    var ledge = platforms.create(1600, 380, 'CandyPlat');
    ledge.scale.setTo(5,5);
    ledge.body.immovable = true;
    var ledge = platforms.create(1800, 400, 'CandyPlat');
    ledge.scale.setTo(5,5);
    ledge.body.immovable = true;
    var ledge = platforms.create(2000, 440, 'CandyPlat');
    ledge.scale.setTo(5,5);
    ledge.body.immovable = true;
    var ledge = platforms.create(2100, 360, 'CandyPlat');
    ledge.scale.setTo(5,5);
    ledge.body.immovable = true;
    var ledge = platforms.create(2250, 350, 'CandyPlat');
    ledge.scale.setTo(5,5);
    ledge.body.immovable = true;

    //Add the player to the game world
    player = game.add.sprite(game.world.width/9, game.world.height - 150, 'Jake');
    player.anchor.setTo(0.5,0.5);
    player.scale.setTo(1.5,1.5);
    player.animations.add('right', [0,1,2,3,4,5,6,7], 10, true);
    //player.animations.add('die', [8,9,10,11], 10, false);
    game.physics.arcade.enable(player);
    player.body.gravity.y= 1000;
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
      scoreText = game.add.text(10,game.world.height-595,'Score: ' + score, {fill:'white'});
      bestText = game.add.text(10,game.world.height-565,'Best: ' + score, {fill:'yellow'});

  }
  //End of the create function

  //Update function runs each and every frame
  function update() {

    //Collision events
    game.physics.arcade.collide(player, platforms);

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
      //if(player.body.touching.down){
        console.log("jumping");
        player.body.velocity.y = -510;
      //}
    }

    //Score system
    score++;
    scoreText.text = "Score: " + score;
  }
  //End of the update function
};
//End of code
