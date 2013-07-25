Ext.define('SpriteFun.view.Main', {
  extend: 'Ext.Container',
  xtype: 'main',
  requires: [
    'Ext.TitleBar',
    'Ext.chart.PolarChart',
    'Ext.chart.series.Pie',
    'SpriteFun.view.interactions.klingon.Klingon'
  ],
  config: {
    layout: 'fit',
    items: [{
      xtype: 'titlebar',
      title: 'Sencha Charts Klingon Interaction',
      docked: 'top'
    }, {
      xtype: 'polar',
      interactions: ['klingon'],
      animate: true,
      colors: ["#115fa6", "#94ae0a", "#a61120", "#ff8809", "#ffd13e"],
      store: {
        fields: ['name', 'data1'],
        data: [
         {'name': 'metric one','data1': 10},
         {'name': 'metric two', 'data1': 7},
         {'name': 'metric three','data1': 5},
         {'name': 'metric four','data1': 2}, 
         {'name': 'metric five', 'data1': 27}
        ]
      },
      series: [{
        type: 'pie',
        field: 'data1',
        donut: 30,
        labelField: 'name',
        showInLegend: true
      }],
      legend: {
        docked: 'bottom'
      }
    }]
  }
});