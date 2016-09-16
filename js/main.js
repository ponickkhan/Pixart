
//start functions on page ready/change

$(document).on("ready page:change", function() {
	'use strict';
	if (navigator.userAgent.match(/Android|IEMobile|BlackBerry|iPhone|iPad|iPod|Opera Mini/i)) {
		
	}else{
		nice_scrollbar()
	}
	
});




// LOADER START/STOP - function for loader image. When page is fully load i hide loader image in html div <div class='loader'>
$(window).load(function() {
	
	'use strict';
	
	$(".loader_container").fadeOut(1000).hide(); // fadeOut for loading animation ( preloader )
	$(".loader_container").css('z-index','-1');

	validate_contact_form()
	social_plugin()
	validate_forms()
	counter()
	resize()
	init_snow()
	modal_behavior()
	open_modals()
	for_links();
	setInterval(set_valign,4)
});


function for_links(){
	if (navigator.userAgent.match(/Android|IEMobile|BlackBerry|iPhone|iPad|iPod|Opera Mini/i)) {
           
		$('.modalOpen').each(function(){
				$(this).bind('touchstart', function (e) {
				
				window.location.replace( $(this).attr("href").toString() );

			});
		});
	}else{
		$(".modalOpen").each(function(){
			$(this).on('click',function(event){
				event.preventDefault();
				window.location.replace( $(this).attr("href").toString() );
	   });
	})
	}

}


function open_modals(){

	'use strict';
	if (navigator.userAgent.match(/Android|IEMobile|BlackBerry|iPhone|iPad|iPod|Opera Mini/i)) {
           $('.modalOpen').bind('touchstart', function (e) {
               var md = $(this).data('md')
			   $(md).modal('show');

           });
    }else{
	
		$('.modalOpen').each(function(){
			$(this).on('click',function(event){
				event.preventDefault()
				var md = $(this).data('md')
				$(md).modal('show');		
			});
		});
	};
}
// set modals contenten always verticaly aligned on middle
function set_valign_modal(t,dialog){
	var d = t.find('.modal-container')
	$(d).vAlignDiv($('.'+dialog))
}

// function that use callback for bootstrap modal and set some custom behavior
function modal_behavior(){
	'use strict';
	$('.modal').on('show.bs.modal', function(){
		
		var t = $(this)
		var dialog = $(this).find('.modal-dialog').data('md')
		set_valign_modal(t,dialog) // IMPORTANT - if You do not want to set content of modal boxes in middle in vertical, just remove this function init
		
		$('.s1-top').fadeOut(500)
		$(this).find('.modal-dialog').show()
	})
	$('.modal').on('hide.bs.modal', function(){
		$('.s1-top').fadeIn(1000)
		$.noty.closeAll() 
	})
	$('.modal').on('hidden.bs.modal', function(){
		
	})
	
	$('.modal').on('shown.bs.modal', function(){
		nice_scrollbar_modal($(this))
		close_button()
		var t = $(this)
		var dialog = $(this).find('.modal-dialog').data('md')
		set_valign_modal(t,dialog) // IMPORTANT - if You do not want to set content of modal boxes in middle in vertical, just remove this function init
	})

}
// modal close button action
// modal close button action
function close_button(modal){
	'use strict';

	if (navigator.userAgent.match(/Android|IEMobile|BlackBerry|iPhone|iPad|iPod|Opera Mini/i)) {
           $('.modal .md-close').bind('touchstart', function (e) {
           		$.when( $('.modal-dialog').fadeOut(500)).done(function() {
		    	$('.modal').modal('hide')
				$.noty.closeAll()
			});
           });
    }else{

    	$('.modal .md-close').on('click',function(){
	
			$.when( $('.modal-dialog').fadeOut(500)).done(function() {
		    	$('.modal').modal('hide')
				$.noty.closeAll()
			});
	
		});
    }
};

// CUSTOM SCROLL BAR PLUGIN - this plugin put custom right scroll for browsers. If You want change behavior, 
// look at https://github.com/inuyaksa/jquery.nicescroll and in file jquery.nicescroll.js 
function nice_scrollbar_modal(md){
	'use strict';
	$(md).niceScroll({cursorcolor:"#3d404e"});	
}
function nice_scrollbar(){
	'use strict';
	$("body").niceScroll({cursorcolor:"#3d404e",cursoropacitymin:0});	
}


// small plugin for vertical align in middle
$.fn.vAlignDiv = function(div) {
  'use strict';
  return this.each(function(i){
  var ah = $(this).height();
  var ph = $(div).height();
  var mh = (ph - ah) / 2.1;
  if(mh>0) {
    $(this).css('margin-top', mh);
  } else {
    $(this).css('margin-top', 0);
  }
})
}

// set contenten always verticaly aligned on middle
function set_valign(){
	'use strict';
 	$('.s1-top').vAlignDiv('.s1')
}

// set valign also on window resize
function resize(){
	'use strict';
	$(window).on('resize', function(){
		set_valign()
	})
}


// counter plugin https://github.com/hilios/jQuery.countdown
function counter(){
	'use strict';
	$('.counter').countdown('2017/09/06', function(event) {
		
	   $(this).html('<div class="days">' + '<div class="days-cnt">'+event.strftime('%D')+'</div>' + '<div class="days-txt upper">- days -' + '</div>' + '</div>' + 
	   	'<div class="divi">+</div>'+
		'<div class="hours">' + '<div class="hours-cnt">'+event.strftime('%H')+'</div>' + '<div class="hours-txt upper">- hours -' + '</div>' + '</div>' + 
		'<div class="divi">+</div>'+
		'<div class="minutes">' + '<div class="minutes-cnt">'+event.strftime('%M')+'</div>' + '<div class="minutes-txt upper">- minutes -' + '</div>' + '</div>' + 
		'<div class="divi">+</div>'+
		'<div class="seconds">' + '<div class="seconds-cnt">'+event.strftime('%S')+'</div>' + '<div class="seconds-txt upper">- seconds -' + '</div>' + '</div>' 
		);
	});
}

// function for snow effect and bubbles effect in background. It use threejs library to create canvas and behavior - file snow.js
function init_snow(){
	'use strict';
	var SCREEN_WIDTH = window.innerWidth;
	var SCREEN_HEIGHT = window.innerHeight;
	var container;
	var particle;
	var camera;
	var scene;
	var renderer;
	var mouseX = 0;
	var mouseY = 0;
	var windowHalfX = window.innerWidth / 2;
	var windowHalfY = window.innerHeight / 2;
	var particles = []; 
	var particleImage = new Image();//THREE.ImageUtils.loadTexture( "img/ParticleSmoke.png" );
	
	particleImage.src = 'img/shape_1.png'; // HERE YOU CAN CHANGE IMAGE FOR BUBBLES
	
	function init() {
		'use strict';
		container = document.getElementById('effects-container')
	
		camera = new THREE.PerspectiveCamera( 75, SCREEN_WIDTH / SCREEN_HEIGHT, 1, 10000 );
		camera.position.z = 1000;

		scene = new THREE.Scene();
		scene.add(camera);
			
		renderer = new THREE.CanvasRenderer();
		renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
		var material = new THREE.ParticleBasicMaterial( { map: new THREE.Texture(particleImage) } );
			
		// set how many bubbles script should create - more bubbles worst performance
		for (var i = 0; i < 600; i++) {

			particle = new Particle3D(material);
			particle.position.x = Math.random() * 2000 - 1000;
			particle.position.y = Math.random() * 2000 - 1000;
			particle.position.z = Math.random() * 2000 - 1000;
			particle.scale.x = particle.scale.y =  1.2; //HERE YOU CAN CHANGE SCALE FOR IMAGES - if image is too small, you can increase scale to 1 (default image size)
			scene.add( particle );
			
			particles.push(particle); 
		}

		container.appendChild( renderer.domElement );
		
		// here you can set behavior for bubbles - if all are uncommented, there will be no effect for bubbles on mouse, touch, move 
		document.addEventListener( 'mousemove', onDocumentMouseMove, false );
		//document.addEventListener( 'touchstart', onDocumentTouchStart, false );
		//document.addEventListener( 'touchmove', onDocumentTouchMove, false );
		
		setInterval( loop, 1000 / 60 );
		
	}
	
	function onDocumentMouseMove( event ) {
		'use strict';
		mouseX = event.clientX - windowHalfX;
		mouseY = event.clientY - windowHalfY;
	}

	function onDocumentTouchStart( event ) {
		'use strict';
		if ( event.touches.length == 1 ) {

			event.preventDefault();

			mouseX = event.touches[ 0 ].pageX - windowHalfX;
			mouseY = event.touches[ 0 ].pageY - windowHalfY;
		}
	}

	function onDocumentTouchMove( event ) {
		'use strict';
		if ( event.touches.length == 1 ) {

			event.preventDefault();

			mouseX = event.touches[ 0 ].pageX - windowHalfX;
			mouseY = event.touches[ 0 ].pageY - windowHalfY;
		}
	}


	function loop() {
		'use strict';
		for(var i = 0; i<particles.length; i++)
		{

			var particle = particles[i]; 
			particle.updatePhysics(); 
			
			// here you can set where put new bubble if ...
			if ( particle.position.x > 1000 ){
				particle.position.x-=2000; 
			}
			if ( particle.position.x < -1000 ){
				particle.position.x+=2000; 
			}
			if ( particle.position.y < -1000){
				particle.position.y+=2000;
			}
			
			if ( particle.position.z > 1000 ){
				particle.position.z-=2000;
			}
			
			if ( particle.position.z < -1000 ){
				particle.position.z-=2000; 
			}
					
		}
	
		//behavior for bubbles when mouse move
		camera.position.x += ( mouseX - camera.position.x ) * 0.05;
		camera.position.y += ( - mouseY - camera.position.y ) * 0.05;
		camera.lookAt(scene.position); 

		renderer.render( scene, camera );

		
	}
	//init bubbles
	init()
}


/* NOTY notifications plugin settings */
// generate function that can be used when user click on button or submit something http://ned.im/noty/  WHOLE options can (jQ and CSS) be changed in default.js 
function generate_1(type,text) {
	'use strict';
  	var n = noty({
  		text: text,
  		type: type,
		timeout : 5000,
        dismissQueue: true,
		maxVisible: 5,
  		layout: 'center',
  		theme: 'defaultTheme'
  	});
}


// validator for subscribtion in modal https://github.com/chriso/validator.js
function validate_forms(){
	'use strict';
	//validation for email submit on first page
	$('.validate').submit(function(event){
		
		if ( validator.isEmail( $('.input-submit').val()  ) ){
			
			var email_ = $('.input-submit').val();
			
			jQuery.ajax({
			       url: "submit_email.php", 
			       type: "post", //can be post or get
			       data: {email:email_}, 
			       success: function(){
						//console.log('success ajax')
						jQuery('.input-submit').val('') ;
			       }
			});
			generate_1('success', 'Email adress added to Our database');
			event.preventDefault();
			
		}else{
			generate_1('information', 'Email adress in not valid <br> Please write valid email adress');
			event.preventDefault();
		}
	});
}

//validation for contact form https://github.com/chriso/validator.js
//validation for contact form https://github.com/chriso/validator.js
function validate_contact_form(){
	
	'use strict';
	$('.validate-contact').submit(function(event){
		

		var email_ = jQuery('.contact-email').val();
		var sender_ = jQuery('.contact-sender').val();
		var content_ = jQuery('.contact-content').val();

		//validate email in contact form
		if ( validator.isEmail( $('.contact-email').val()  ) ){
			
		}else{
			generate_1('error', 'Email adress in not valid <br> Please write valid email adress');
			event.preventDefault();
		}
		
		//validate name in contact form
		if (validator.isAlphanumeric( $('.contact-sender').val()  ) ){
			
		}else{
			generate_1('error', 'Name can only contain letters and numbers');
			event.preventDefault();
		}
		
		//if everything is valid, run Your sending email function
		if ( validator.isAlphanumeric( $('.contact-sender').val() ) && validator.isEmail( $('.contact-email').val() ) &&  $('.contact-content').val() !=''  ){
			jQuery.ajax({
			       url: "mails.php", 
			       type: "post", //can be post or get
			       data: {email:email_ , name:sender_ , message:content_}, 
			       success: function(){
						//console.log('success ajax')
						jQuery('.contact-email').val('') ;
						jQuery('.contact-sender').val('') ;
						jQuery('.contact-content').val('');
						generate_1('success', 'Email was successful sended');
			       }
			});
			event.preventDefault();
		}
	});
}

// plugin for social buttons behavior https://github.com/sonnyt/prettySocial
function social_plugin(){
	'use strict';
	$('.prettySocial').prettySocial();
}











