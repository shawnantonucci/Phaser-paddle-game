class SceneMain extends Phaser.Scene {
    constructor() {
        super('SceneMain');
    }
    preload()
    {
        //load our images or sounds
        this.load.spritesheet('balls', "images/balls.png", { frameWidth: 100, frameHeight: 100 });
        this.load.spritesheet('paddles', "images/paddles.png", { frameWidth: 400, frameHeight: 50 });
    }
    create() {
        //define our objects
            //set up
        emitter = new Phaser.Events.EventEmitter();
        controller = new Controller();
        let mediaManager = new MediaManager({ scene: this});

        let sb = new SoundButtons({scene :this});

        this.centerX = game.config.width / 2;
        this.centerY = game.config.height / 2;

    }

    update() {
        //constant running loop

    }
}