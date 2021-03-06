window.onload = function() {

  alert("Welcome to LankyJake. A game were Jake is trying to run away from a evil monster by the name of Evil Monster. you must (key word MUST) help Jake jump on the platforms. The Evil Monster has crumbeled the planet and only left platforms. To help Jake jump press SPACEBAR/UPARROW to replay refresh that tab.GOODLUCK")

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
 var platformsEarth;
 var platformsSnow;
 var platformsCandy;
 var speed = 1;
 var hiScore;
var coin;
var Powerup;

  //Preload function, Where we can load all the assets that will be used in our game
  function preload() {
    game.load.image('bg1', 'assets/Treehouse.png');
    game.load.image('bg2', 'assets/MountainVillage.jpg');
    game.load.image('bg3', 'assets/Candy Kingdom.png');
    game.load.spritesheet('Evilguy', 'assets/Evil monster.png',30,27);
    game.load.spritesheet('Jake', 'assets/LankyJake.png',32,37);
    game.load.spritesheet('JakeSheet', 'assets/LankyJake_spritesheet.png',32,37);
    game.load.spritesheet('DeadJake', 'assets/Death.png',32,37);
    game.load.image('JackPower', 'assets/before powerup.png');
    game.load.image('SnowPlat', 'assets/Mountain Plat.png');
    game.load.image('EarthPlat', 'assets/TreehousePlat.png');
    game.load.image('CandyPlat', 'assets/CupCake Plat.png');
    game.load.image('Powerup', 'assets/Coin.png');
    game.load.image('GameOver', 'assets/Game Over.png');

  }
  //End of the preload function

  //Create function, where all the initial objects are created
  function create() {
      hiScore = localStorage.getItem('jakeHiScore');
      if(hiScore == null){
        hiScore = 0;
      }
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

    platformsEarth = game.add.group();
    platformsEarth.enableBody = true;
    platformsSnow = game.add.group();
    platformsSnow.x= game.world.width;
    platformsSnow.enableBody = true;
    platformsCandy = game.add.group();
    platformsCandy.enableBody = true;
    platformsCandy.x= game.world.width*2;

    //Adding the platforms in the world
    var ledge = platformsEarth.create(30, 475, 'EarthPlat');
    ledge.scale.setTo(5,3);
    ledge.body.immovable = true;
    var ledge = platformsEarth.create(260, 480, 'EarthPlat');
    ledge.scale.setTo(5,3);
    ledge.body.immovable = true;
    var ledge = platformsEarth.create(450, 450, 'EarthPlat');
    ledge.scale.setTo(5,3);
    ledge.body.immovable = true;
    var ledge = platformsEarth.create(645, 420, 'EarthPlat');
    ledge.scale.setTo(5,3);
    ledge.body.immovable = true;
    //Adding snow platforms into the world
    var ledge = platformsSnow.create(820-game.world.width, 400, 'SnowPlat');
    ledge.scale.setTo(5,5);
    ledge.body.immovable = true;
    var ledge = platformsSnow.create(1050-game.world.width, 430, 'SnowPlat');
    ledge.scale.setTo(5,5);
    ledge.body.immovable = true;
    var ledge = platformsSnow.create(1100-game.world.width, 430, 'SnowPlat');
    ledge.scale.setTo(5,5);
    ledge.body.immovable = true;
    var ledge = platformsSnow.create(1300-game.world.width, 400, 'SnowPlat');
    ledge.scale.setTo(5,5);
    ledge.body.immovable = true;
    var ledge = platformsSnow.create(1400-game.world.width, 400, 'SnowPlat');
    ledge.scale.setTo(5,5);
    ledge.body.immovable = true;
    //Adding the candy platforms to the world
    var ledge = platformsCandy.create(1600-(game.world.width*2), 380, 'CandyPlat');
    ledge.scale.setTo(5,5);
    ledge.body.immovable = true;
    var ledge = platformsCandy.create(1800-(game.world.width*2), 400, 'CandyPlat');
    ledge.scale.setTo(5,5);
    ledge.body.immovable = true;
    var ledge = platformsCandy.create(2000-(game.world.width*2), 440, 'CandyPlat');
    ledge.scale.setTo(5,5);
    ledge.body.immovable = true;
    var ledge = platformsCandy.create(2100-(game.world.width*2), 360, 'CandyPlat');
    ledge.scale.setTo(5,5);
    ledge.body.immovable = true;
    var ledge = platformsCandy.create(2250-(game.world.width*2), 350, 'CandyPlat');
    ledge.scale.setTo(5,5);
    ledge.body.immovable = true;

    //Add the player to the game world
    player = game.add.sprite(game.world.width/5, game.world.height - 150, 'Jake');
    player.anchor.setTo(0.5,0.5);
    player.scale.setTo(1.5,1.5);
    player.animations.add('right', [0,1,2,3,4,5,6,7], 10, true);
    //player.animations.add('die', [8,9,10,11,12,13,14,15], 10, false);
    game.physics.arcade.enable(player);
    player.body.gravity.y= 1000;
    player.body.collideWorldBounds = true
    player.animations.play('right');

    //Add the Evilguy to the game world
    player2 = game.add.sprite(game.world.width/15, game.world.height - 150, 'Evilguy');
    player2.anchor.setTo(0.5,0.5);
    player2.scale.setTo(3,3);
    player2.animations.add('right2', [0,1,2], 5, true);
    player2.animations.play('right2');

    controls = game.input.keyboard.addKeys(
      {
        'Jump1': Phaser.KeyCode.SPACEBAR,
        'Jump2': Phaser.KeyCode.UP,
        'Die' : Phaser.KeyCode.T
      }
      );
     //Add the score and lifes text into the game
      scoreText = game.add.text(10,game.world.height-595,'Score: ' + score, {fill:'white'});
      bestText = game.add.text(10,game.world.height-565,'Best: ' + hiScore, {fill:'yellow'});

      Powerup = game.add.group();
      Powerup.enableBody = true;

      //Spawn a Powerup
      var location = platformsSnow.getRandom();
      coin = Powerup.create(location.x+game.world.width,location.y-25,'Powerup');
      //Random number between location.x and location.x + location.width
      //coin = game.add.sprite(location.x+game.world.width,location.y-25,'Powerup');

  }
  //End of the create function

  //Update function runs each and every frame
  function update() {

    //player.animations.stop();
    //player.frame = 4; //Standing frame

    if(player.y > game.world.height-100){
      gameOver();
    }
    //Collision events
    game.physics.arcade.collide(player, platformsEarth);
    game.physics.arcade.collide(player, platformsSnow);
    game.physics.arcade.collide(player, platformsCandy);
    game.physics.arcade.collide(player, Powerup, CollectPowerUp);

    //Each frame, both backgrounds move 1 pixel left
    bg1.x -= speed;
    bg2.x -= speed;
    bg3.x -= speed;
    platformsEarth.x -= speed;
    platformsSnow.x -= speed;
    platformsCandy.x -= speed;
    coin.x-= speed;

    if(controls.Die.isDown) {
      gameOver();
    }

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

    //If the first platform group is completely off the screen
    if(platformsEarth.x < -game.world.width){
     //  Move it just to the right of the screen
     platformsEarth.x = game.world.width*2;
    }

    //If the second platform group is completely off the screen
    if(platformsSnow.x < -game.world.width){
     //  Move it just to the right of the screen
     platformsSnow.x = game.world.width*2;
    }

    //If the third platform group is completely off the screen
    if(platformsCandy.x < -game.world.width){
     //  Move it just to the right of the screen
     platformsCandy.x = game.world.width*2;
    }

    //Makes the controls work
    if(controls.Jump1.justDown || controls.Jump2.justDown){
      if(player.body.touching.down){
        console.log("jumping");
        player.body.velocity.y = -510;
      }
    }

    //Score system
    score++;
    if(score % 1900 == 0){ //Every 1900 points
      if(speed < 4){
        speed++;
      }
    }
    scoreText.text = "Score: " + score;
  }
  //End of the update function

  function gameOver(){
    gg = game.add.sprite(game.world.width/2, game.world.height/2, 'GameOver');
    gg.anchor.setTo(0.5,0.5);
    gg.scale.setTo(1,1);
    dead = game.add.sprite(player.x,player.y,'DeadJake');
    player.kill();
    game.paused = true;
    //dead.animations.add('die',[0,1,2,3,4,5,6,7],10,false);
    //dead.animations.play('die');

    //game.paused = true;
    if(localStorage.getItem('jakeHiScore') === null){
      localStorage.setItem('jakeHiScore',score);
    } else if(score > localStorage.getItem('jakeHiScore')) {
      localStorage.setItem('jakeHiScore',score);
    }
  }
  //End of gameover function

  function CollectPowerUp(player,pup){
    console.log('collected');
    //TODO: Add animation to collect item
    game.add.sprite('JakePower')
    pup.kill();
    //TODO: Add animation to fly
    player.x+= 50;
    //delay(1000);
  }

};
//End of code
