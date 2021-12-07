$('.links__list').owlCarousel({
  loop:true,
  dots: true,
  margin:25,
  responsiveClass:true,
  autoplay:true,
  autoplayTimeout:2000,
  autoplayHoverPause:true,
  responsive:{
      0:{
          items:1,
          nav: false
      },
      600:{
          items:2,
          nav:false
      },
      1000:{
          items:4,
          nav:false
      }
  }
})


const birinchi = () => {


  let mapTitle = document.querySelector('.map-title');

  mapTitle.textContent="Suv xo'jalligi vazirligining hududiy boshqarmalari";


  // New map-pie series type that also allows lat/lon as center option.
// Also adds a sizeFormatter option to the series, to allow dynamic sizing
// of the pies.
Highcharts.seriesType('mappie', 'pie', {
  center: null, // Can't be array by default anymore
  clip: true, // For map navigation
  backgroundColor: 'rgba(242, 242, 242, 0.5)',
  states: {
    hover: {
      halo: {
        size: 5
      }
    }
  },
  dataLabels: {
    enabled: false
  }
}, {
  getCenter: function() {
    var options = this.options,
      chart = this.chart,
      slicingRoom = 2 * (options.slicedOffset || 0);
    if (!options.center) {
      options.center = [null, null]; // Do the default here instead
    }
    // Handle lat/lon support
    
    if (options.center.lat !== undefined) {
      var point = chart.fromLatLonToPoint(options.center);
      options.center = [
        chart.xAxis[0].toPixels(point.x, true),
        chart.yAxis[0].toPixels(point.y, true)
      ];
    }
        

    // Replace lat/lon with plotX/plotY
    if (options.center.plotX !== undefined) {
      options.center = [options.center.plotX, options.center.plotY];
    }


    // Handle dynamic size
    if (options.sizeFormatter) {
      options.size = options.sizeFormatter.call(this);
    }
    // Call parent function
    var result = Highcharts.seriesTypes.pie.prototype.getCenter.call(this);
    // Must correct for slicing room to get exact pixel pos
    result[0] -= slicingRoom;
    result[1] -= slicingRoom;
    return result;
  },
  translate: function(p) {
    this.options.center = this.userOptions.center;
    this.center = this.getCenter();
    return Highcharts.seriesTypes.pie.prototype.translate.call(this, p);
  }
});


var data = [
    // state, demVotes, repVotes, libVotes, grnVotes, sumVotes, winner, offset config for pies
    ['Tashkent', "Чирчиқ-Оҳангарон ирригация тизимлари ҳавза бошқармаси", "Тошкент ш., Роҳат к., 13-уй", "Абдураззоқов Жахонгир Боқижонович", "(71) 295-23-36", "tv.havza@minwater.uz", -1, 'Toshkent'],
    ['Andijon', "Норин-Қорадарё ирригация тизимлари ҳавза бошқармаси", "Андижон ш., Н.Охунов к., 40а-уй", "Хамидов Хушнудбек Собирович", "(74) 223-55-53", "nq.havza@minwater.uz", -1, 'Andijon'],
    ['Namangan', "Норин-Сирдарё ирригация тизимлари ҳавза бошқармаси", "Наманган ш., Ҳамроҳ к., 66-уй", "Алматов Фозилжон Абдукадирович", "(69) 227-69-40", "ns.havza@minwater.uz", -1, 'Namangan'],
    ['Ferghana', "Сирдарё-Сўх ирригация тизимлари ҳавза бошқармаси", "Фарғона ш., Ал-Фарғоний к., 72-уй", "Турсунов Фахриддин Султонович", "(73) 244-67-83", "fv.havza@minwater.uz", -1, "Farg'ona"],
    ['Sirdaryo', "Қуйи Сирдарё ирригация тизимлари ҳавза бошқармаси", "Гулистон ш., Хондамир к., 127-уй", "Исроилов Шавкат Отамуродович", "(67) 225-00-30", "qs.havza@minwater.uz", -1, 'Sirdaryo'],
    ['Jizzakh', "Сирдарё-Зарафшон ирригация тизимлари ҳавза бошқармаси", "Жиззах ш., Бешқувур к., 56-уй", "Джураев Шуҳрат Суярқулович", "(72) 226-91-28", "sz.havza@minwater.uz", -1, 'Jizzax'],
    ['Samarkand', "Зарафшон ирригация тизимлари ҳавза бошқармаси", "Самарқанд ш., Гагарин к., 70-уй", "Раджабов Фарход Валиевич", "(66) 234-44-10", "zar.havza@minwater.uz", -1, 'Samarqand'],
    ['Kashkadarya', "Аму-Қашқадарё ирригация тизимлари ҳавза бошқармаси", "Қарши ш., И.Каримов к., 81а-уй", "Вакант", "(75) 226-38-47", "aq.havza@minwater.uz", -1, 'Qashqadaryo'],
    ['Surkhandarya', "Аму-Сурхон ирригация тизимлари ҳавза бошқармаси", "Термиз ш., М.Қаххор к., 19-уй", "Алимов Тўлқин Жўраевич", "(76) 221-73-05", "as.havza@minwater.uz", -1, 'Surxandaryo'],
    ['Bukhoro', "Аму-Бухоро ирригация тизимлари ҳавза бошқармаси", "Бухоро ш., Б.Нақшбанд к., 297/1-уй", "Файзиллаев Эркин Бахшиллоевич", "(65) 225-09-35", "ab.havza@minwater.uz", -1, 'Buxoro'],
    ['Navoi', "Қуйи Зарафшон ирригация тизимлари ҳавза бошқармаси", "Навоий ш., А.Навоий к., 24-уй", "Шомуродов Нодир Намозович", "(79) 224-98-31", "qz.havza@minwater.uz", -1, 'Navoiy'],
    ['Khorezm', "Чапқирғоқ Амударё ирригация тизимлари ҳавза бошқармаси", "Урганч ш., М.Хоразмий к., 1-уй", "Тоиров Одилбек Рахимберганович", "(62) 226-01-35", "xz.havza@minwater.uz", -1, 'Xorazm'],
    ['Karakalpakstan', "Қорақалпоғистон Республикаси Сув хўжалиги вазирлиги", "Нукус ш., Т.Қайпберганов к., 25-уй", "Усаков Даулетбай Торебаевич", "(61) 224-13-68", "qqr@minwater.uz", -1, "Qoraqalpog'iston"]
  ],
  maxVotes = 0,
  demColor = '#333',
  repColor = 'rgba(220,71,71,0.80)',
  libColor = 'rgba(240,190,50,0.80)',
  grnColor = 'rgba(90,200,90,0.80)';


// Compute max votes to find relative sizes of bubbles
// Highcharts.each(data, function(row) {
//   maxVotes = Math.max(maxVotes, row[5]);
// });

// Build the chart
var chart = Highcharts.mapChart('container', {
  title: {
    text: 'j'
  },

  chart: {
    animation: false // Disable animation, especially for zooming
  },

  colorAxis: {
    min: 1,
    max: 1000,
    minColor: '#333',
    maxColor: '#333',
    dataClasses: [
    //   {
    //   from: -1,
    //   to: 0,
    //   color: 'rgba(90,200,90,0.80)',
    //   name: 'Nasoslar soni'
    // },
    // {
    //   from: 0,
    //   to: 1,
    //   color: 'rgba(90,200,90,0.80)',
    //   name: 'Kanallar soni'
    // }, {
    //   from: 2,
    //   to: 3,
    //   name: "Sug'oriladigan yerlar",
    //   color: '#333'
    // }, {
    //   from: 3,
    //   to: 4,
    //   name: 'Daryolar',
    //   color: grnColor
    // } 
  ]
  },

  mapNavigation: {
    enabled: true
  },
  // Limit zoom range
  yAxis: {
    minRange: 2300
  },

  tooltip: {
    useHTML: true
  },

  // Default options for the pies
  plotOptions: {
    mappie: {
      borderColor: 'rgba(255,255,255,0.4)',
      borderWidth: 1,
      tooltip: {
        headerFormat: ''
      }
    }
  },

  series: [{
    mapData: Highcharts.maps['countries/uz/uz-all'],
    data: data,
    name: 'States',
    borderColor: '#eee',
    showInLegend: false,
    joinBy: ['name', 'id'],
    keys: ['id', 'demVotes', 'repVotes', 'libVotes', 'grnVotes',
      'sumVotes', 'value', 'pieOffset'
    ],
    tooltip: {
      headerFormat: '',
      pointFormatter: function() {
        var regionType = "Бошлиқ"
        if(this.id == "Karakalpakstan") regionType="Вазир"
        else regionType = "Бошлиқ"
        var hoverVotes = this.hoverVotes; // Used by pie only
        return '<div class="my-div"><h3 class="map-t">' + this.demVotes+ ' </h3><br/>' +
          '<b class="item-title">' + regionType + ':' +'</b>' + '<span class="item-value">' + this.libVotes + '</span><br/>'+
          '<b class="item-title">Телефон:</b>' + '<span class="item-value">' + this.grnVotes + '</span><br/>' +
          '<b class="item-title">E-mail:</b>' + '<span class="item-value">' + this.sumVotes + '</span><br/>' +
          '<b class="item-title">Манзил:</b>' + '<span class="item-value">' + this.repVotes + '</span><br/>' 

      }
    },
    
  }]
});

// When clicking legend items, also toggle pies
Highcharts.each(chart.legend.allItems, function(item) {
  var old = item.setVisible;
  item.setVisible = function() {
    var legendItem = this;
    old.call(legendItem);
    Highcharts.each(chart.series[0].points, function(point) {
      if (chart.colorAxis[0].dataClasses[point.dataClass].name === legendItem.name) {
        // Find this state's pie and set visibility
        Highcharts.find(chart.series, function(item) {
          return item.name === point.id;
        }).setVisible(legendItem.visible, false);
      }
    });
    chart.redraw();
  };
});

// Add the pies after chart load
Highcharts.each(chart.series[0].points, function(state) {
  if (!state.id || !state.properties) {
    return; // Skip points with no data, if any
  }

  // var pieOffset = state.pieOffset || {},
  //   centerLat = parseFloat(state.properties.latitude),
  //   centerLon = parseFloat(state.properties.longitude);

  // Add the pie for this state
  chart.addSeries({
    type: 'mappie',
    name: state.id,
    zIndex: 6,
    sizeFormatter: function() {
      var yAxis = this.chart.yAxis[0],
        zoomFactor = (yAxis.dataMax - yAxis.dataMin) /
        (yAxis.max - yAxis.min);
      return Math.max(
        this.chart.chartWidth / 45 * zoomFactor, // Min size
        this.chart.chartWidth / 11 * zoomFactor * state.sumVotes / maxVotes
      );
    },
    tooltip: {
      // Use the state tooltip for the pies as well
      pointFormatter: function() {
        return state.series.tooltipOptions.pointFormatter.call({
          id: state.id,
          hoverVotes: this.stateName,
          demVotes: state.demVotes,
          repVotes: state.repVotes,
          libVotes: state.libVotes,
          grnVotes: state.grnVotes,
          sumVotes: state.sumVotes,
        });
      }
    },
    data: [{
      name: 'Democrats',
      y: state.demVotes,
      color: demColor
    }, {
      name: 'Republicans',
      y: state.repVotes,
      color: repColor
    }, {
      name: 'Libertarians',
      y: state.libVotes,
      color: libColor
    }, {
      name: 'Green',
      y: state.grnVotes,
      color: grnColor
    }],
    center: {
      plotX: state.plotX,
      plotY: state.plotY
    }
  }, false);


});
// Only redraw once all pies have been added
chart.redraw();

}



const ikkinchi = () => {

  let mapTitle = document.querySelector('.map-title');

  mapTitle.textContent="Hududiy boshqarmalardagi melioratsiya tizimlari";

  
  // New map-pie series type that also allows lat/lon as center option.
// Also adds a sizeFormatter option to the series, to allow dynamic sizing
// of the pies.
Highcharts.seriesType('mappie', 'pie', {
  center: null, // Can't be array by default anymore
  clip: true, // For map navigation
  backgroundColor: 'rgba(0,0,0,0.1)',
  states: {
    hover: {
      halo: {
        size: 5
      }
    }
  },
  dataLabels: {
    enabled: false
  }
}, {
  getCenter: function() {
    var options = this.options,
      chart = this.chart,
      slicingRoom = 2 * (options.slicedOffset || 0);
    if (!options.center) {
      options.center = [null, null]; // Do the default here instead
    }
    // Handle lat/lon support
    
    if (options.center.lat !== undefined) {
      var point = chart.fromLatLonToPoint(options.center);
      options.center = [
        chart.xAxis[0].toPixels(point.x, true),
        chart.yAxis[0].toPixels(point.y, true)
      ];
    }
        

    // Replace lat/lon with plotX/plotY
    if (options.center.plotX !== undefined) {
      options.center = [options.center.plotX, options.center.plotY];
    }


    // Handle dynamic size
    if (options.sizeFormatter) {
      options.size = options.sizeFormatter.call(this);
    }
    // Call parent function
    var result = Highcharts.seriesTypes.pie.prototype.getCenter.call(this);
    // Must correct for slicing room to get exact pixel pos
    result[0] -= slicingRoom;
    result[1] -= slicingRoom;
    return result;
  },
  translate: function(p) {
    this.options.center = this.userOptions.center;
    this.center = this.getCenter();
    return Highcharts.seriesTypes.pie.prototype.translate.call(this, p);
  }
});


var data = [
    // state, demVotes, repVotes, libVotes, grnVotes, sumVotes, winner, offset config for pies
    ['Tashkent', 729547, 1318255, 44467, 9391, 2101660, -1, 'Toshkent'],
    ['Andijon', 116454, 163387, 18725, 5735, 304301, -1, 'Andijon'],
    ['Namangan', 1161167, 1252401, 106327, 34345, 2554240, -1, 'Namangan'],
    ['Ferghana', 1161167, 1252401, 106327, 34345, 2554240, -1, "Farg'ona"],
    ['Sirdaryo', 1161167, 1252401, 106327, 34345, 2554240, -1, 'Sirdaryo'],
    ['Jizzakh', 1161167, 1252401, 106327, 34345, 2554240, -1, 'Jizzax'],
    ['Samarkand', 1161167, 1252401, 106327, 34345, 2554240, -1, 'Samarqand'],
    ['Kashkadarya', 1161167, 1252401, 106327, 34345, 2554240, -1, 'Qashqadaryo'],
    ['Surkhandarya', 1161167, 1252401, 106327, 34345, 2554240, -1, 'Surxandaryo'],
    ['Bukhoro', 1161167, 1252401, 106327, 34345, 2554240, -1, 'Buxoro'],
    ['Navoi', 1161167, 1252401, 106327, 34345, 2554240, -1, 'Navoiy'],
    ['Khorezm', 1161167, 1252401, 106327, 34345, 2554240, -1, 'Xorazm'],
    ['Karakalpakstan', 1161167, 1252401, 106327, 34345, 2554240, -1, "Qoraqalpog'iston"]
  ],
  maxVotes = 0,
  demColor = '#333',
  repColor = 'rgba(220,71,71,0.80)',
  libColor = 'rgba(240,190,50,0.80)',
  grnColor = 'rgba(90,200,90,0.80)';


// Compute max votes to find relative sizes of bubbles
Highcharts.each(data, function(row) {
  maxVotes = Math.max(maxVotes, row[5]);
});

// Build the chart
var chart = Highcharts.mapChart('container', {
  title: {
    text: 'j'
  },

  chart: {
    animation: false // Disable animation, especially for zooming
  },

  colorAxis: {
    min: 1,
    max: 1000,
    minColor: '#333',
    maxColor: '#333',
    dataClasses: [
    //   {
    //   from: -1,
    //   to: 0,
    //   color: 'rgba(90,200,90,0.80)',
    //   name: 'Nasoslar soni'
    // },
    // {
    //   from: 0,
    //   to: 1,
    //   color: 'rgba(90,200,90,0.80)',
    //   name: 'Kanallar soni'
    // }, {
    //   from: 2,
    //   to: 3,
    //   name: "Sug'oriladigan yerlar",
    //   color: '#333'
    // }, {
    //   from: 3,
    //   to: 4,
    //   name: 'Daryolar',
    //   color: grnColor
    // } 
  ]
  },

  mapNavigation: {
    enabled: true
  },
  // Limit zoom range
  yAxis: {
    minRange: 2300
  },

  tooltip: {
    useHTML: true
  },

  // Default options for the pies
  plotOptions: {
    mappie: {
      borderColor: 'rgba(255,255,255,0.4)',
      borderWidth: 1,
      tooltip: {
        headerFormat: ''
      }
    }
  },

  series: [{
    mapData: Highcharts.maps['countries/uz/uz-all'],
    data: data,
    name: 'States',
    borderColor: '#eee',
    showInLegend: false,
    joinBy: ['name', 'id'],
    keys: ['id', 'demVotes', 'repVotes', 'libVotes', 'grnVotes',
      'sumVotes', 'value', 'pieOffset'
    ],
    tooltip: {
      headerFormat: '',
      pointFormatter: function() {
        var hoverVotes = this.hoverVotes; // Used by pie only
        return '<div class="my-div"><b class="map-t">' + this.id + ' </b><br/>' +
        Highcharts.map([
          ["Sug'oriladigan yerlar", this.demVotes, demColor],
          ['Nasos stansiyalari soni', this.repVotes, repColor],
          ['Kanallar soni', this.libVotes, libColor],
          ['Daryolar soni', this.grnVotes, grnColor]
        ].sort(function(a, b) {
          return b[1] - a[1]; // Sort tooltip by most votes
        }), function(line) {
          return '<span style="color:' + line[2] +
            // Colorized bullet
            '">\u25CF</span> ' +
            // Party and votes
            (line[0] === hoverVotes ? '<b>' : '') +
            line[0] + ': ' +
            Highcharts.numberFormat(line[1], 0) +
            (line[0] === hoverVotes ? '</b>' : '') +
            '<br/>';
          }).join('');
      }
    },
    
  }]
});

// When clicking legend items, also toggle pies
Highcharts.each(chart.legend.allItems, function(item) {
  var old = item.setVisible;
  item.setVisible = function() {
    var legendItem = this;
    old.call(legendItem);
    Highcharts.each(chart.series[0].points, function(point) {
      if (chart.colorAxis[0].dataClasses[point.dataClass].name === legendItem.name) {
        // Find this state's pie and set visibility
        Highcharts.find(chart.series, function(item) {
          return item.name === point.id;
        }).setVisible(legendItem.visible, false);
      }
    });
    chart.redraw();
  };
});

// Add the pies after chart load
Highcharts.each(chart.series[0].points, function(state) {
  if (!state.id || !state.properties) {
    return; // Skip points with no data, if any
  }

  // var pieOffset = state.pieOffset || {},
  //   centerLat = parseFloat(state.properties.latitude),
  //   centerLon = parseFloat(state.properties.longitude);

  // Add the pie for this state
  chart.addSeries({
    type: 'mappie',
    name: state.id,
    zIndex: 6,
    sizeFormatter: function() {
      var yAxis = this.chart.yAxis[0],
        zoomFactor = (yAxis.dataMax - yAxis.dataMin) /
        (yAxis.max - yAxis.min);
      return Math.max(
        this.chart.chartWidth / 45 * zoomFactor, // Min size
        this.chart.chartWidth / 11 * zoomFactor * state.sumVotes / maxVotes
      );
    },
    tooltip: {
      // Use the state tooltip for the pies as well
      pointFormatter: function() {
        return state.series.tooltipOptions.pointFormatter.call({
          id: state.id,
          hoverVotes: this.stateName,
          demVotes: state.demVotes,
          repVotes: state.repVotes,
          libVotes: state.libVotes,
          grnVotes: state.grnVotes,
          sumVotes: state.sumVotes,
        });
      }
    },
    data: [{
      name: 'Democrats',
      y: state.demVotes,
      color: demColor
    }, {
      name: 'Republicans',
      y: state.repVotes,
      color: repColor
    }, {
      name: 'Libertarians',
      y: state.libVotes,
      color: libColor
    }, {
      name: 'Green',
      y: state.grnVotes,
      color: grnColor
    }],
    center: {
      plotX: state.plotX,
      plotY: state.plotY
    }
  }, false);


});
// Only redraw once all pies have been added
chart.redraw();

}

let birinchiBtn = document.querySelector('#birinchi');
let ikkinchiBtn = document.querySelector('#ikkinchi')


birinchiBtn.addEventListener('click', ()=>{
  birinchi()
})

ikkinchiBtn.addEventListener('click', ()=>{
  ikkinchi()
})

document.addEventListener("DOMContentLoaded", ()=> {
  birinchi();
})


let mapMain = document.querySelector('.map-main');

let btns = mapMain.querySelectorAll('button');

for(let i=0; i<btns.length; i++) {
  btns[i].addEventListener('click', ()=> {
    for(let j=0; j<btns.length; j++) {
      btns[j].classList.remove('button-active')
    }

    btns[i].classList.add('button-active')
  })
}