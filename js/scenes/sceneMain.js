class SceneMain extends Phaser.Scene {
    constructor() {
        super('SceneMain');
    }
    preload()
    {
        //load our images or sounds
        this.load.spritesheet('balls', "images/balls.png", { frameWidth: 100, frameHeight: 100 });
        this.load.spritesheet('paddles', "images/paddles.png", { frameWidth: 400, frameHeight: 50 });
        this.load.image('bar', 'images/bar.jpg');
    }
    create() {
        //define our objects
            //set up
        emitter = new Phaser.Events.EventEmitter();
        controller = new Controller();
        let mediaManager = new MediaManager({ scene: this});

        let sb = new SoundButtons({scene :this});

        this.velocity = 100;
        this.centerX = game.config.width / 2;
        this.centerY = game.config.height / 2;
        this.quarter = game.config.height / 4;

        this.bar = this.add.image(this.centerX, this.centerY, 'bar');
        this.bar.displayWidth = game.config.width / 3;
        this.bar.displayHeight = game.config.height;

        this.ball = this.physics.add.sprite(this.centerX, this.centerY, 'balls');
        Align.scaleToGameW(this.ball, .05);
        //
        //
        //
        this.paddle1 = this.physics.add.sprite(this.centerX, this.quarter, 'paddles');
        Align.scaleToGameW(this.paddle1, .25);
        //
        //
        //
        this.paddle2 = this.physics.add.sprite(this.centerX, this.quarter * 3, 'paddles');
        Align.scaleToGameW(this.paddle2, .25);
        //
        //
        //
        this.ball.setVelocity(0, this.velocity);
        this.paddle1.setImmovable();
        this.paddle2.setImmovable();
        this.physics.add.collider(this.ball, this.paddle1, this.ballHit, null, this);
        this.physics.add.collider(this.ball, this.paddle2, this.ballHit, null, this);
    }

    ballHit(ball, paddle)
    {
        this.velocity = -this.velocity;
        ball.setVelocity(0, this.velocity);
    }

    update() {
        //constant running loop

    }
}