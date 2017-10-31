window.onload = function() {

  //Create a new phaser game, with dimensions of 800px wide and 600px
  var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

 //Global variables
 var bg1;
 var bg2;
 var bg3;
 var score = 0;
 var lives = 1;

  //Preload function, Where we can load all the assets that will be used in our game
  function preload() {
    game.load.image('bg1', 'assets/Treehouse.png');
    game.load.image('bg2', 'assets/Backround2.jpg');
    game.load.image('bg3', 'assets/Backround3.jpg');
    game.load.image('Jake', 'assets/LankyJake.png');

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


    //Add the player to the game world
    player = game.add.sprite(game.world.width/9, game.world.height - 150, 'Jake');
    player.anchor.setTo(0.5,0.5);
    player.scale.setTo(0.3,0.3);
    game.physics.arcade.enable(player);
    player.body.collideWorldBounds = true
    controls = game.input.keyboard.addKeys(
      {
        'Jump': Phaser.KeyCode.SPACEBAR,
      }
      );
     //Add the score and lifes text into the game
      scoreText = game.add.text(620,game.world.height-50,'Score: ' + score, {fill:'yellow'});
      livesText = game.add.text(16,game.world.height-50,'Lives: ' + lives, {fill:'red'});

  }
  //End of the create function

  //Update function runs each and every frame
  function update() {
    //Each frame, both backgrounds move 1 pixel left
    bg1.x--;
    bg2.x--;
    bg3.x--;

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

    //Score system
    score++;
    scoreText.text = "Score: " + score;
  }
  //End of the update function
};
