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



let player;
let anim; //animation default = 0, turn left = 1, turn right = 2

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
let speed = 1



options = {
  theme: "dark",
  isPlayingBgm: true,
  seed: 332894,
	viewSize: {x: G.WIDTH, y: G.HEIGHT} 
};

function update() {
  if (!ticks) {

    addObstacle('e')
    player = vec(G.WIDTH/2, G.HEIGHT/3);
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

  //player and skis
  color("black")
  if(anim == 0) {
    char("c", player.x, player.y + 3);
    } else if(anim == 1) {
      char("d", player.x, player.y + 3);
    } else if(anim == 2) {
      char("d", player.x, player.y + 3, {mirror: {x: -1}});
    }
  char(addWithCharCode("a", Math.floor(ticks / 30) % 2), player);

 



  //obstacles for reference
  char("e", 20, 30); //tree
  char("f", 20, 40); //rock
  char("c", 61, 43); //snow
  char("g", 60, 40); //snowboarder
  
  updateObstacles();

}


function updateObstacles()
{
  obstacles.forEach((o)=>{
    o.pos.y -= speed
    console.log(o.pos.y)
    char(o.sprite,o.pos.x,o.pos.y)

    const collidePlayer = char(o.sprite,o.pos.x,o.pos.y).isColliding.char.a || char(o.sprite,o.pos.x,o.pos.y).isColliding.char.b
    if (o.pos.y < 0)
    {
      obstacles.pop(o)
    }
  
    if (collidePlayer)
    {
      obstacleHitPlayer()
    }

  })
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