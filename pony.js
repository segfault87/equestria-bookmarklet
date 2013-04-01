var script = document.createElement('script');
script.src = 'http://code.jquery.com/jquery-latest.min.js';
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);

var pony = {
    limit: 10,
    size: '150px',
    url_base: 'http://equestria-bookmarklet.influx.kr/',
    assets: [
        'pony1.png',
        'pony2.png',
        'pony3.png',
        'pony4.png',
        'pony5.png',
        'pony6.png'
    ],

    items: [],
    active: true,
    running: false,
    
    initialize: function() {
        setInterval(pony.update, 33);
        setInterval(pony.emitter, 5000);
    },

    toggle: function() {
        if (pony.active)
            pony.activate(false);
        else
            pony.activate(true);
        
        return false;
    },

    activate: function(v) {
        pony.active = v;
        if (!v) {
            $.each(pony.items, function(idx, item) {
                item.elem.remove();
            });
            pony.items = [];
        }
    },

    random: function(min, max) {
        return Math.floor((Math.random() * (max-min+1)) + min);
    },

    update: function() {
        if (!pony.active)
            return;

        var removeflag = false;
        $.each(pony.items, function(idx, item) {
            var deg = Math.cos(item.life * 0.15) * 15;
            item.elem.css({
                top: (item.y + Math.abs(Math.cos(item.life * 0.15)) * 15) + 'px',
                left: item.x + 'px',
                '-moz-transform': 'rotate(' + deg +'deg)',
                '-webkit-transform': 'rotate(' + deg +'deg)',
                '-o-transform': 'rotate(' + deg +'deg)',
                '-ms-transform': 'rotate(' + deg +'deg)'
            });
            item.life += item.velocity;
            item.x += item.velocity;
            if (item.x > window.innerWidth) {
                removeflag = true;
                item.elem.remove();
                item.remove = true;
            }
        });
        if (removeflag) {
            pony.items = $.grep(pony.items, function(v) {
                return v.remove == false;
            });
        }
    },

    emitter: function() {
        if (!pony.active)
            return;
        
        if (pony.items.length > pony.limit)
            return;

        pony.running = true;
        
        /* 50% of chance */
        if (pony.random(0, 1) == 0) {
            var y = pony.random(0, window.innerHeight - 8);
            var elem = $('<img></img>')
                .attr('src', pony.url_base + pony.assets[pony.random(0, pony.assets.length - 1)])
                .attr('alt', 'pony!')
                .css({
                    left: '-' + pony.size,
                    'z-index': y,
                    width: pony.size,
                    height: 'auto',
                    position: 'fixed'
                });
        $('body').append(elem);
            pony.items.push({
                elem: elem,
                y: y,
                velocity: Math.random() * 3.0 + 0.5,
                x: -100.0,
                life: 0.0,
                remove: false
            });
        }
    }
}

if (!pony.running)
    pony.initialize();

