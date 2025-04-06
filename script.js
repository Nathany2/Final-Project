//Gravity and Background

const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 2024
canvas.height = 5076

const gravity = 0.5



class Player {
    constructor(position)   {
        this.position = position
        this.velocity = {
            x:0,
            y: 1,
        }
        this.height = 100 
    }

    draw() {
        c.fillStyle = '#92ABEA'
        c.fillRect(this.position.x, this.position.y, 100, this.height)
    }

    update() {
        this.draw()

        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        if (this.position.y + this.height + this.velocity.y < canvas.height)
          this.velocity.y += gravity
        else this.velocity.y = 0
    }
}

class Platform {
    constructor({x, y, width, height}) {
        this.position = {
            x,
            y
        }
        this.width = width
        this.height = height
    }

    draw() {
        c.fillStyle = '#cececd'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}

const player = new Player({
    x: 0,
    y: 0,
})
//Platforms
const platforms = [
    new Platform({
        x: canvas.width / 4,
        y: canvas.height / 10,
        width: 700,
        height: 50
    }),
    new Platform({
        x: canvas.width / -200,
        y: canvas.height / 20,
        width: 300,
        height: 50
    }),
    new Platform({
        x: canvas.width / -700,
        y: canvas.height / 7,
        width: 300,
        height: 50
    }),
    new Platform({
        x: canvas.width / 90,
        y: canvas.height / 7,
        width: 400,
        height: 50
    }),
    new Platform({
        x: canvas.width / 1.4,
        y: canvas.height / 7,
        width: 600,
        height: 50
    }),
    new Platform({
        x: canvas.width / 2,
        y: canvas.height / 6,
        width: 400,
        height: 50
    }),
    new Platform({
        x: canvas.width / 1.4,
        y: canvas.height / 5,
        width: 700,
        height: 50
    }),
    new Platform({
        x: canvas.width / 1.7,
        y: canvas.height / 20,
        width: 900,
        height: 50
    }),
    new Platform({
        x: canvas.width / 90,
        y: canvas.height / 4,
        width: 1000,
        height: 50
    }),
    new Platform({
        x: canvas.width / 90,
        y: canvas.height / 5,
        width: 600,
        height: 50
    }),
]

const keys = {
    d: {
    pressed: false,
    },
    a: {
    pressed: false,
    },
}



function animate() {
    window.requestAnimationFrame(animate)
    c.fillStyle = '#1c1c1c'
    c.fillRect(0, 0, canvas.width, canvas.height)
    player.update()


    player.velocity.x = 0
    if (keys.d.pressed) player.velocity.x = 7
    else if (keys.a.pressed) player.velocity.x = -7


    
    platforms.forEach(platform => {
        platform.draw()

        if (
            player.position.y + player.height <= platform.position.y &&
            player.position.y + player.height + player.velocity.y >= platform.position.y &&
            player.position.x + 100 >= platform.position.x &&
            player.position.x <= platform.position.x + platform.width
        ) {
            player.velocity.y = 0;
        }
    })
    

    

}



animate()

//Movement
window.addEventListener('keydown', (event) => {
   switch (event.key) {
    case 'd':
        keys.d.pressed = true
        break 

    case 'a':
        keys.a.pressed = true
        break 

    case 'w':
        player.velocity.y = -20
        break 

   }
})


window.addEventListener('keyup', (event) => {
    switch (event.key) {
     case 'd':
         keys.d.pressed = false
         break 
 
     case 'a':
         keys.a.pressed = false
         break 
    }
 })

