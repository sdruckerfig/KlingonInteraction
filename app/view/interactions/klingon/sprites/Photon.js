Ext.define('SpriteFun.view.interactions.klingon.sprites.Photon', {
	extend: 'Ext.draw.sprite.Image',
	alias: 'sprite.photontorpedo',
	inheritableStatics: {
		def: {
			processors: {
				
			},
			defaults: {
				src: 'resources/images/photon.png'
			}
		}
	},
	
	
	constructor: function(config) {
		this.callParent(arguments);
		this.firePhoton();
	},

	firePhoton: function() {
		
		this.fx.setDuration(Math.floor(this.config.to.duration));
		this.fx.setEasing('easeOut');
		this.fx.on('animationend', this.onAnimationEnd, this);
		this.setAttributes({
			x: this.config.to.x, 
			y: this.config.to.y,
			rotationRads: 3,
			width: 25,
			height: 25
		});
	},

	onAnimationEnd: function(animation) {
		this.fireEvent('explosion',this);
	}
});