Ext.define('SpriteFun.view.interactions.klingon.Klingon', {

    extend: 'Ext.chart.interactions.Abstract',
    requires: [
        'SpriteFun.view.interactions.klingon.sprites.Photon',
        'SpriteFun.view.interactions.klingon.sprites.Klingon',
    ],

    type: 'klingon',
    alias: 'interaction.klingon',

    config: {
        /**
         * @cfg {String} gesture
         * Defines the gesture type that should trigger item highlighting.
         */
        gesture: 'tap'
    },

    getGestures: function () {
        var gestures = {};
        gestures['item' + this.getGesture()] = 'onGesture';
        gestures[this.getGesture()] = 'onFailedGesture';
        return gestures;
    },

    hideSeries: function(item) {

        var top = item.sprite.getParent().getParent();
        
        if (top.getLegend()) {
            var legendStore = top.getLegend().getStore();
            var record = legendStore.getAt(legendStore.find('name',item.record.get('name')));
            record.beginEdit();
            record.set('disabled', !record.get('disabled'));
            record.commit();
            
            return false;
       } 
    },

    onGesture: function (series, item, e) {
        
        e.highlightItem = item;
        var chart = item.sprite.getParent().getParent();
  

        var ship = series.getOverlaySurface().add({
            type: 'klingon',
            targetX: e.pageX - chart.element.getX(),
            targetY: e.pageY - chart.element.getY(),
            surface: series.getOverlaySurface(),
            dataItem: item
        });

        ship.on('explosion', this.onPhotonExploded, this);
        
    },

    onPhotonExploded: function(sprite,dataItem) {
        this.hideSeries(dataItem);
    },

    onFailedGesture: function (e) {
        this.getChart().setHighlightItem(e.highlightItem || null);
        this.sync();
    }
});