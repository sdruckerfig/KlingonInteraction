Ext.define('SpriteFun.view.interactions.klingon.sprites.Klingon', {
	extend: 'Ext.draw.sprite.Image',
	alias: 'sprite.klingon',

	inheritableStatics: {
		def: {
			processors: {
				torpedo: 'string',
				targetX: 'string',
				targetY: 'string'
			},
			defaults: {
				src: 'resources/images/klingon.png',
				torpedo: "photontorpedo",
				width: 200,
				height: 70
			}
		}
	},


	firedPhoton: false,
	markedForDeath: false,

	setNewCourse: function() {

		this.rand = Math.random();

		this.fx.on('animationend', this.onAnimationEnd, this);

		if (!this.firedPhoton) {

			this.fx.setDuration(2000 * this.rand);
			this.setAttributes({
				x: Math.floor(this.rand * this.w)
			});
		} else {
			this.fx.setDuration(2000 - (2000 * this.rand));
			this.setAttributes({
				x: this.w
			});
		}
	},

	constructor: function() {

		this.callParent(arguments);

		var surface = this.config.surface;
		var me = this;

		this.w = surface.element.getWidth();
		this.h = surface.element.getHeight();
		this.setAttributes({
			x: this.attr.width * -1,
			y: Math.floor(Math.random() * (this.h - this.attr.height - 30))
		})
		this.setNewCourse();

	},


	onAnimationEnd: function() {
		if (!this.firedPhoton) {
			this.firePhoton();
			this.firedPhoton = true;
			this.setNewCourse();
		} else {
			if (this.markedForDeath)
				this.destroy();
			else
				this.markedForDeath = true;
		}
	},


	firePhoton: function() {

		if (this.attr.x + this.attr.width > this.attr.targetX) {
			var startX = this.attr.x;
		} else {
			var startX = this.attr.x + this.attr.width + 5;
		}

		var startY = Math.floor(this.attr.y + (this.attr.height / 2));

		var photonfired = this.getParent().add({
			type: this.attr.torpedo,
			x: startX,
			y: startY,
			height: 50,
			width: 50,
			photonType: this.attr.enemyType,
			to: {
				x: this.config.targetX,
				y: this.config.targetY,
				duration: 1500,
				rotatonRads: 3
			}
		});

		var me = this;
		photonfired.on('explosion', function(photon) {
			me.fireEvent('explosion', me, me.config.dataItem);
			photon.destroy();
			if (me.markedForDeath)
				me.destroy();
			else
				me.markedForDeath = true;
		});

	}

});