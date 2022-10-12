title = 'DOWNHILL SKI';

description = `
`;

characters = [
//player char 'a' 'b'
`
 yyr
 rr
bbbb
cbbc
LbbL
LBBL
`,
`
 yy
 rr
bbbb
cbbc
LbbL
LBBL
`,
//skis char 'c' 'd'
`
gg
gg
gg
gg
`,
`
    gg
   gg
  gg
 gg 
`,
//trees char 'e'
` 
  G
 GGG
GGGGG
 GGG
GGGGG
  L
`,
//rock char 'f'
`
  LL
 LLLL
LLLLLL
LLLLLL
`,
//rival snowboarders char 'f'
`
  YY
  YY
 PPPP
 pPPp
  CC
  CC
`
];


const G = {
  WIDTH: 75,
	HEIGHT: 100,

  SNOW_SPEED_MIN: 0.05,
  SNOW_SPEED_MAX: 0.2,
};


/**
* @typedef {{
  * pos: Vector,
  * vel: Vector,
  * }} Obstacle
  */
let player;
let anim; //animation default = 0, turn left = 1, turn right = 2


/**
* @type  { Vector []}
*/
let trail = []

/**
* @typedef {{
  * pos: Vector,
  * sprite : String,
  * }} Obstacle
  */
/**
* @type  { Obstacle []}
*/
let obstacles = [];
let speed = 1;

let obstacleDelay = 60;
let obstacleTimer = 60;



options = {
  theme: "dark",
  isPlayingBgm: true,
  seed: 332894,
	viewSize: {x: G.WIDTH, y: G.HEIGHT} 
};

function update() {
  if (!ticks) {

    addObstacle('e')
    player = {
      pos: vec(G.WIDTH/2, G.HEIGHT/3),
      vel: vec(0.5, 1)
    }
    anim = 0;

    snow = times(10, () => {
      // Random number generator function
      // rnd( min, max )
      const posX = rnd(0, G.WIDTH);
      const posY = rnd(0, G.HEIGHT);
      // An object of type Star with appropriate properties
      return {
          // Creates a Vector
          pos: vec(posX, posY),
          // More RNG
          speed: rnd(G.SNOW_SPEED_MIN, G.SNOW_SPEED_MAX)
      };
    });
  }



  //ground
  color("black");
  rect(0, 20, G.WIDTH, G.HEIGHT);

  snow.forEach((s) => {
    s.pos.y += s.speed;
    if (s.pos.y > G.HEIGHT - 80) s.pos.y = 0;
    color("black");
    box(s.pos, 1);
  });

  // draw trail behind
  trail.push(vec(player.pos.x - 1, player.pos.y + 4));
  trail.push(vec(player.pos.x + 1, player.pos.y + 4));
  remove(trail, (tp) => {
    tp.x -= player.vel.x;
    tp.y -= player.vel.y;

    color("light_black");
    box(tp, 1);
    return (tp.y < 22);
  })

  //player and skis
  color("black")
  if (player.vel.x == 0) anim = 0
  else anim = (player.vel.x > 0) ? 2 : 1
  if(anim == 0) {
    char("c", player.pos.x, player.pos.y + 3);
    } else if(anim == 1) {
      char("d", player.pos.x, player.pos.y + 3);
    } else if(anim == 2) {
      char("d", player.pos.x, player.pos.y + 3, {mirror: {x: -1}});
    }
  char(addWithCharCode("a", Math.floor(ticks / 30) % 2), player.pos);


  obstacleTimer -= 1
  if (obstacleTimer <= 0) {
    obstacleTimer = obstacleDelay;
    addObstacle();
  } 

  //obstacles for reference
  char("e", 20, 30); //tree
  char("f", 20, 40); //rock
  char("c", 61, 43); //snow
  char("g", 60, 40); //snowboarder
  
  updateObstacles();

}


function updateObstacles()
{
  remove(obstacles, (o)=>{
    o.pos.y -= player.vel.y
    o.pos.x -= player.vel.x
    //console.log(o.pos.y)
    char(o.sprite,o.pos.x,o.pos.y)

    const collidePlayer = char(o.sprite,o.pos.x,o.pos.y).isColliding.char.a || char(o.sprite,o.pos.x,o.pos.y).isColliding.char.b
    if (collidePlayer)
    {
      obstacleHitPlayer()
    }

    return (o.pos.y < 20);
  });
}

function obstacleHitPlayer()
{
  
}

function addObstacle(_sprite = 'e')
{
  
  let toAdd = {pos : vec( rnd(0,G.WIDTH) , G.HEIGHT), sprite : _sprite}

  obstacles.push(toAdd)
}

addEventListener("load", onLoad);