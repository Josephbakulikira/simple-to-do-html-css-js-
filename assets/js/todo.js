    particlesJS('particles-js',
  
  {
    "particles": {
      "number": {
        "value": 80,
        "density": {
          "enable": true,
          "value_area": 800
        }
      },
      "color": {
        "value": "#ffffff"
      },
      "shape": {
        "type": "circle",
        "stroke": {
          "width": 0,
          "color": "#000000"
        },
        "polygon": {
          "nb_sides": 5
        },
        "image": {
          "src": "img/github.svg",
          "width": 100,
          "height": 100
        }
      },
      "opacity": {
        "value": 0.5,
        "random": false,
        "anim": {
          "enable": false,
          "speed": 1,
          "opacity_min": 0.1,
          "sync": false
        }
      },
      "size": {
        "value": 5,
        "random": true,
        "anim": {
          "enable": false,
          "speed": 40,
          "size_min": 0.1,
          "sync": false
        }
      },
      "line_linked": {
        "enable": true,
        "distance": 150,
        "color": "#ffffff",
        "opacity": 0.4,
        "width": 1
      },
      "move": {
        "enable": true,
        "speed": 6,
        "direction": "none",
        "random": false,
        "straight": false,
        "out_mode": "out",
        "attract": {
          "enable": false,
          "rotateX": 600,
          "rotateY": 1200
        }
      }
    },
    "interactivity": {
      "detect_on": "canvas",
      "events": {
        "onhover": {
          "enable": true,
          "mode": "repulse"
        },
        "onclick": {
          "enable": true,
          "mode": "push"
        },
        "resize": true
      },
      "modes": {
        "grab": {
          "distance": 400,
          "line_linked": {
            "opacity": 1
          }
        },
        "bubble": {
          "distance": 400,
          "size": 40,
          "duration": 2,
          "opacity": 8,
          "speed": 3
        },
        "repulse": {
          "distance": 200
        },
        "push": {
          "particles_nb": 4
        },
        "remove": {
          "particles_nb": 2
        }
      }
    },
    "retina_detect": true,
    "config_demo": {
      "hide_card": false,
      "background_color": "#b61924",
      "background_image": "",
      "background_position": "50% 50%",
      "background_repeat": "no-repeat",
      "background_size": "cover"
    }
  }

);



//check off to dos by clicking
$('ul').on('click', 'li', function(){
		$(this).toggleClass("completed");
	});
//click on X to delete 
$('ul').on('click', 'span', function(event){
	$(this).parent().fadeOut(500, function(){
		$(this).remove();
	});
	event.stopPropagation();
});
$("input[type='text']").keypress(function(event){
	if(event.which === 13)
	{
		var todoText = $(this).val();
		$(this).val('');
		//create a new li and add to ul
		$('ul').append('<li><span><i class="fa fa-trash"></i></span> ' + todoText + '</li>');
	}
});
$('.fa fa-calendar-plus-o').click(function(){
	$("input[type='text']").fadeToggle()
})
//particles effets
var canvas = document.querySelector("#scene"),
        ctx = canvas.getContext("2d"),
        particles = [],
        amount = 0,
        mouse = {x:0,y:0},
        radius = 1;

    var colors = ["#468966","#FFF0A5", "#FFB03B","#B64926", "#8E2800"];

    var copy = document.querySelector("#copy");

    var ww = canvas.width = window.innerWidth;
    var wh = canvas.height = window.innerHeight;

    function Particle(x,y){
        this.x =  Math.random()*ww;
        this.y =  Math.random()*wh;
        this.dest = {
            x : x,
            y: y
        };
        this.r =  Math.random()*5 + 2;
        this.vx = (Math.random()-0.5)*20;
        this.vy = (Math.random()-0.5)*20;
        this.accX = 0;
        this.accY = 0;
        this.friction = Math.random()*0.05 + 0.94;

        this.color = colors[Math.floor(Math.random()*6)];
    }

    Particle.prototype.render = function() {


        this.accX = (this.dest.x - this.x)/1000;
        this.accY = (this.dest.y - this.y)/1000;
        this.vx += this.accX;
        this.vy += this.accY;
        this.vx *= this.friction;
        this.vy *= this.friction;

        this.x += this.vx;
        this.y +=  this.vy;

        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, Math.PI * 2, false);
        ctx.fill();

        var a = this.x - mouse.x;
        var b = this.y - mouse.y;

        var distance = Math.sqrt( a*a + b*b );
        if(distance<(radius*70)){
            this.accX = (this.x - mouse.x)/100;
            this.accY = (this.y - mouse.y)/100;
            this.vx += this.accX;
            this.vy += this.accY;
        }

    }

    function onMouseMove(e){
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    }

    function onTouchMove(e){
    if(e.touches.length > 0 ){
      mouse.x = e.touches[0].clientX;
      mouse.y = e.touches[0].clientY;
    }
    }

function onTouchEnd(e){
  mouse.x = -9999;
  mouse.y = -9999;
}

    function initScene(){
        ww = canvas.width = window.innerWidth;
        wh = canvas.height = window.innerHeight;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.font = "bold "+(ww/10)+"px sans-serif";
        ctx.textAlign = "center";
        ctx.fillText(copy.value, ww/2, wh/2);

        var data  = ctx.getImageData(0, 0, ww, wh).data;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.globalCompositeOperation = "screen";

        particles = [];
        for(var i=0;i<ww;i+=Math.round(ww/150)){
            for(var j=0;j<wh;j+=Math.round(ww/150)){
                if(data[ ((i + j*ww)*4) + 3] > 150){
                    particles.push(new Particle(i,j));
                }
            }
        }
        amount = particles.length;

    }

    function onMouseClick(){
        radius++;
        if(radius ===5){
            radius = 0;
        }
    }

    function render(a) {
        requestAnimationFrame(render);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (var i = 0; i < amount; i++) {
            particles[i].render();
        }
    };

    copy.addEventListener("keyup", initScene);
    window.addEventListener("resize", initScene);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("touchmove", onTouchMove);
    window.addEventListener("click", onMouseClick);
    window.addEventListener("touchend", onTouchEnd);
    initScene();
    requestAnimationFrame(render);

