/* jshint asi:true */
//先等图片都加载完成
//再执行布局函数

/**
 * 执行主函数
 * @param  {[type]} function( [description]
 * @return {[type]}           [description]
 */
(function() {

  /**
     * Content data
     */
  var demoContent = [
    {
      demo_link: 'https://eastmanjian.cn/delightalk/pageJsTest.html',
      img_link: 'https://ejres-1253687085.picgz.myqcloud.com/img/delightalk/delightalk-demo.jpg',
      code_link: 'https://github.com/EastmanJian/delightalk',
      title: 'DELIGHTALK Pluggable Commenting System',
      core_tech: 'Redis JAX-RS JavaScript',
      description: 'A pluggable commeting system. 评论平台, 方便嵌入到你的网站中。Communicate with back-end with RESTful API.'
    }, {
      demo_link: 'https://eastmanjian.cn/js_demo/tiy.jsp',
      img_link: 'https://ejres-1253687085.picgz.myqcloud.com/img/tiy/tiy-demo.jpg',
      code_link: 'https://github.com/EastmanJian/javascript_demo/blob/gh-pages/web/tiy.jsp',
      detail_link: 'https://eastmanjian.cn/blog/2014/12/21/tiy-try-it-yourself-release-demo-available',
      title: 'TIY (Try It Yourself) Tool',
      core_tech: 'JavaScript CSS3 JSP AJAX',
      description: 'This is a front-end tool which can be used as a playground of HTML, JavaScript and CSS. 调试沙盒。 With Save and Load function. Provides syntax hightlight powered by codemirror js plugin.'
    }, {
      demo_link: 'https://eastmanjian.github.io/HTML_CSS_Demo/html5_geolocation.html',
      img_link: 'https://ejres-1253687085.picgz.myqcloud.com/img/html5/geolocation-demo.jpg',
      code_link: 'https://github.com/EastmanJian/HTML_CSS_Demo/blob/gh-pages/html5_geolocation.html',
      detail_link: 'https://eastmanjian.cn/blog/2015/06/30/html5-geolocation-positioning/',
      title: 'HTML5 Geolocation Positioning 地理定位',
      core_tech: 'HTML5 JavaScript',
      description: 'Use navigator.geolocation to locate the current georaphic location. 地理定位。'
    }, {
      demo_link: 'https://eastmanjian.cn/js_demo/tiy.jsp?sample=https%3A%2F%2Feastmanjian.github.io%2FHTML_CSS_Demo%2Fhtml5_canvas.html',
      img_link: 'https://ejres-1253687085.picgz.myqcloud.com/img/html5/canvas-demo.jpg',
      code_link: 'https://eastmanjian.cn/js_demo/tiy.jsp?sample=https%3A%2F%2Feastmanjian.github.io%2FHTML_CSS_Demo%2Fhtml5_canvas.html',
      detail_link: 'https://eastmanjian.cn/blog/2015/06/30/html5-canvas/',
      title: 'HTML5 Canvas',
      core_tech: 'HTML5 JavaScript',
      description: 'Canvas is a new feature in HTML5. It\'s used to draw graphics, on the fly, on a web page, via scripting (usually JavaScript). This demo shows some basic operations of canvas.'
    }, {
      demo_link: 'https://eastmanjian.cn/js_demo/tiy.jsp?sample=https%3A%2F%2Feastmanjian.github.io%2FHTML_CSS_Demo%2Fhtml5_drag_and_drop.html',
      img_link: 'https://ejres-1253687085.picgz.myqcloud.com/img/html5/drag-drop-demo.png',
      code_link: 'https://eastmanjian.cn/js_demo/tiy.jsp?sample=https%3A%2F%2Feastmanjian.github.io%2FHTML_CSS_Demo%2Fhtml5_drag_and_drop.html',
      detail_link: 'https://eastmanjian.cn/blog/2016/11/22/drag-and-drop-html5-vs-jquery/',
      title: 'HTML5 Drag and Drop',
      core_tech: 'HTML5 JavaScript',
      description: 'The usage of ondragover and ondrop events. Also the usage of event.preventDefault() method, event.dataTransfer object.'
    }, {
      demo_link: 'https://eastmanjian.cn/js_demo/tiy.jsp?sample=https%3A%2F%2Feastmanjian.github.io%2FHTML_CSS_Demo%2Fcss_opacity_image.html',
      img_link: 'https://ejres-1253687085.picgz.myqcloud.com/img/css3/img-opacity-demo.png',
      code_link: 'https://eastmanjian.cn/js_demo/tiy.jsp?sample=https%3A%2F%2Feastmanjian.github.io%2FHTML_CSS_Demo%2Fcss_opacity_image.html',
      detail_link: 'https://eastmanjian.cn/blog/2015/10/14/css3-opacity/',
      title: 'CSS3 Opacity',
      core_tech: 'CSS3',
      description: 'The CSS opacity property is a part of the W3C CSS3 recommendation. 用CSS3嘅透明效果实现高亮选择。'
    }, {
      demo_link: 'https://eastmanjian.github.io/HTML_CSS_Demo/css_basic_demo.html',
      img_link: 'http://ejres-1253687085.picgz.myqcloud.com/img/css3/sheet-switch-demo.png',
      code_link: 'https://github.com/EastmanJian/HTML_CSS_Demo/blob/gh-pages/css_basic_demo.html',
      detail_link: 'https://eastmanjian.cn/blog/2014/11/12/css-sheet-switching/',
      title: 'Switching Between Style Sheets',
      core_tech: 'CSS CSS3',
      description: 'Swith mutiple CSS on one HTML document. A single HTML document can be rendered into different style. CSS的魅力，同样一个HTML能渲染出各种风格的页面。'
    }, {
      demo_link: 'https://eastmanjian.cn/js_demo/tiy.jsp?sample=https%3A%2F%2Feastmanjian.github.io%2FHTML_CSS_Demo%2Fcss_position_float_big_letter.html',
      img_link: 'http://ejres-1253687085.picgz.myqcloud.com/img/css3/first-letter-float.png',
      code_link: 'https://eastmanjian.cn/js_demo/tiy.jsp?sample=https%3A%2F%2Feastmanjian.github.io%2FHTML_CSS_Demo%2Fcss_position_float_big_letter.html',
      title: 'First Letter Sink and Enlarge Effect',
      core_tech: 'CSS',
      description: 'Let the first letter of a paragraph float to the left and style the letter. 段落首字母下沉并放大。有啲似中世纪报纸嘅风格。'
    }, {
      demo_link: 'https://eastmanjian.cn/js_demo/tiy.jsp?sample=https%3A%2F%2Feastmanjian.github.io%2FHTML_CSS_Demo%2Fcss3_animation_cube_3d.html',
      img_link: 'https://ejres-1253687085.picgz.myqcloud.com/img/css3/3d-cube.png',
      code_link: 'https://github.com/EastmanJian/HTML_CSS_Demo/blob/gh-pages/css3_animation_cube_3d.html',
      title: '3D Rotating Cube',
      core_tech: 'CSS3',
      description: 'Demonstrate the usage of CSS3 animation feature, the setting of transform-style preserve-3d, key frames, rotate and translate. CSS3旋转立方。'
    }, {
      demo_link: 'https://eastmanjian.cn/js_demo/tiy.jsp?sample=https%3A%2F%2Feastmanjian.cn%2Fhtml5_demo%2Fhtml5_sse_demo_cnt.html',
      img_link: 'https://ejres-1253687085.picgz.myqcloud.com/img/html5/html5-sse-demo.png',
      code_link: 'https://github.com/EastmanJian/html5_serverside_demo/blob/master/web/html5_sse_demo_cnt.jsp',
      title: 'Registered User Count Pushed from Server',
      core_tech: 'HTML5 JavaScript JSP',
      description: 'Use HTML5 new feature SSE (Sever Sent Event) to implement a registered user counter. 服务器向前端推送已注册用户嘅数字。利用咗HTML5嘅SSE新特性。 '
    }, {
      demo_link: 'https://eastmanjian.cn/js_demo/tiy.jsp?sample=https%3A%2F%2Feastmanjian.github.io%2FHTML_CSS_Demo%2Fcss3_curl_shadow.html',
      img_link: 'https://ejres-1253687085.picgz.myqcloud.com/img/css3/curl-shadow.png',
      code_link: 'https://github.com/EastmanJian/HTML_CSS_Demo/blob/gh-pages/css3_curl_shadow.html',
      title: 'CSS3 Curl Shadow Effect',
      core_tech: 'CSS3',
      description: 'Utilize the CSS pseudo class and the CSS3 box-shadow property to make curl shadow effect. So that a picture above looks edge wraping like a paper.'
    }, {
      demo_link: 'https://eastmanjian.cn/js_demo/tiy.jsp?sample=https%3A%2F%2Feastmanjian.github.io%2FHTML_CSS_Demo%2Fcss3_transition_effects.html',
      img_link: 'https://ejres-1253687085.picgz.myqcloud.com/img/css3/css3-transition.png',
      code_link: 'https://github.com/EastmanJian/HTML_CSS_Demo/blob/gh-pages/css3_transition_effects.html',
      title: 'CSS3 Transition Effect',
      core_tech: 'HTML CSS',
      description: 'Demo of CSS3 transition effects: rotate, resize, color, and shape transitions, 3D rotate transition, transition timing, transition delay.'
    }, {
      demo_link: 'https://eastmanjian.cn/js_demo/tiy.jsp?sample=bom%2Fclock.html',
      img_link: 'https://ejres-1253687085.picgz.myqcloud.com/img/css3/clock.png',
      code_link: 'https://github.com/EastmanJian/javascript_demo/blob/gh-pages/web/bom/clock.html',
      title: 'Clock Simple Life',
      core_tech: 'CSS3 JavaScript',
      description: 'Without using image, the clock is made of some tricks of CSS relative postioning, CSS3 radial-gradient background, border-radius, box-shadow and a small fragment of JavaScript codes.'
    }, {
      demo_link: 'https://eastmanjian.cn/js_demo/tiy.jsp?sample=jq%2Fdemo%2Faccordion_datatable.html',
      img_link: 'https://ejres-1253687085.picgz.myqcloud.com/img/jquery/accordion-datatable.png',
      code_link: 'https://github.com/EastmanJian/javascript_demo/blob/gh-pages/web/jq/demo/accordion_datatable.html',
      title: 'Accordion plus Datatable',
      core_tech: 'jQuery',
      description: 'A combination of using jQuery Accordion widget and a jQuery datatable plugin. They are very good components when you want to collapse a lot of information in a web page. The Demo page of my Blog is using these widgets.'
    }, {
      demo_link: 'https://eastmanjian.cn/bs_demo/carousel_bs4.html',
      img_link: 'https://ejres-1253687085.picgz.myqcloud.com/img/bootstrap/carousel.png',
      code_link: 'https://github.com/EastmanJian/bootstrap_demo/blob/gh-pages/web/carousel_bs4.html',
      title: 'Carousel 翻动告示牌',
      core_tech: 'Bootstrap 3/4',
      description: '在众多门户网站常见翻动告示牌。用来做广告，展示陈列品，滚动轮番的信息都好好用。Bootstrap将佢组件化了。的Bootstrap 3和4嘅Carousel组件默认样式有啲唔同。把URL中的4改为3试试。'
    }, {
      demo_link: 'https://eastmanjian.cn/js_demo/tiy.jsp?sample=https%3A%2F%2Feastmanjian.cn%2Fbs_demo%2Fscrollspy_bs4_nav_nested.html',
      img_link: 'https://ejres-1253687085.picgz.myqcloud.com/img/bootstrap/scrollspy.png',
      code_link: 'https://github.com/EastmanJian/bootstrap_demo/blob/gh-pages/web/scrollspy_bs4_nav_nested.html',
      title: 'Bootstrap ScrollSpy Component - Nested',
      core_tech: 'Bootstrap 4',
      description: 'For long content article or documentation, usually there is TOC (Table Of Content). To keep the doc scroll position in sync with the TOC item, Bootstrap ScrollSpy is a good option. It supports nested TOC as well.'
    }, {
      demo_link: 'https://eastmanjian.cn/bs_demo/sticky_top.html',
      img_link: 'https://ejres-1253687085.picgz.myqcloud.com/img/bootstrap/sticky-top.png',
      code_link: 'https://github.com/EastmanJian/bootstrap_demo/blob/gh-pages/web/sticky_top.html',
      title: 'Bootstrap Sticky-Top Utility',
      core_tech: 'Bootstrap 4',
      description: 'In some mordern web page, when you scroll down, the header of the page will be scrolled out of the screen but the nav bar will be kept at the top of the screen. This can be accomplished by Bootstrap\'s Sticky-Top utility.'
    }, {
      demo_link: 'https://eastmanjian.cn/jersey_demo/webapi/httpServletReq',
      img_link: 'https://ejres-1253687085.picgz.myqcloud.com/img/rest/jersey-context.png',
      code_link: 'https://github.com/EastmanJian/jersey_demo/blob/master/src/main/java/jersey/demo/param/HttpServletRequestResource.java',
      title: 'Injecting HttpServletRequest using Jersey @Context',
      core_tech: 'JAX-RS Jersey RESTful',
      description: 'To obtain the parameters in a HTTP header (e.g. Client IP), use Jersey @Context to inject HttpServletRequest. By doing so, server side can realize more information about the client.'
    }, {
      demo_link: 'https://eastmanjian.cn/react_demo/thinking_in_react',
      img_link: 'https://ejres-1253687085.picgz.myqcloud.com/img/react/design-flow.png',
      code_link: 'https://github.com/EastmanJian/react_demo/blob/master/react-demo-app/src/thinkingInReact.js',
      title: 'Stock Item List Filtering',
      core_tech: 'ReactJS',
      description: 'A stock item list filtering page demonstrates the design steps of React: 1) Identify component hierarchy, 2) Build static version, 3) Identify States, 4) Identify State Owner, 5) Add Inverse Data Flow.'
    }, {
      demo_link: 'https://eastmanjian.cn/react_demo/lift_state_up',
      img_link: 'https://ejres-1253687085.picgz.myqcloud.com/img/react/lift-state-up.png',
      code_link: 'https://github.com/EastmanJian/react_demo/blob/master/react-demo-app/src/liftStateUp.js',
      title: 'Lifting State Up',
      core_tech: 'ReactJS',
      description: 'React Design Rule - Lift the State Up: when you want to aggregate data from multiple children or to have two child components communicate with each other, move the state upwards so that it lives in their closest common ancestor component.'
    }, {
      demo_link: 'https://eastmanjian.cn/jersey_demo/webapi/jaxbjson',
      img_link: 'https://ejres-1253687085.picgz.myqcloud.com/img/rest/jaxb-moxy.png',
      code_link: 'https://github.com/EastmanJian/jersey_demo/blob/master/src/main/java/jersey/demo/moxy/jaxb/JaxbResource.java',
      title: 'JSON binding support via MOXy',
      core_tech: 'JAX-RS Jersey RESTful JSON MOXy',
      description: 'JSON binding support via MOXy is a default and preferred way of supporting JSON binding in Jersey applications since Jersey 2.0. When JSON MOXy module is on the class-path, Jersey will automatically discover the module. The demo shows binding a POJO bean to a JSON response.'
    }, {
      demo_link: 'https://eastmanjian.cn/spring_4x_mvc_demo/hellospring.do',
      img_link: 'https://ejres-1253687085.picgz.myqcloud.com/img/spring/spring-mvc.png',
      code_link: 'https://github.com/EastmanJian/spring_4x_mvc_demo',
      title: 'Spring MVC Framework',
      core_tech: 'Spring MVC',
      description: 'Spring Web MVC framework provides Model-View-Controller (MVC) architecture. This example demostrates the usage of Spring DispatcherServlet, @Controller, @RequestMapping, ModelMap, InternalResourceViewResolver and BeanNameViewResolver.'
    }
  ];

  contentInit(demoContent) //内容初始化
  waitImgsLoad() //等待图片加载，并执行布局初始化
}());

/**
 * 内容初始化
 * @return {[type]} [description]
 */
function contentInit(content) {
  var htmlStr = '';
  for (var i = 0; i < content.length; i++) {
    htmlStr   += '<div class="grid-item">' 
              +  '   <a class="a-img" href="' + content[i].demo_link + '" target="_blank">' 
              +  '       <img src="' + content[i].img_link + '">' 
              +  '   </a>'
              +  '   <h3 class="demo-title">' 
              +  '       <a href="' + content[i].demo_link + '" title>' + content[i].title + '</a>'
              +  '   </h3>'
              +  '   <p><img class="badge" src="https://img.shields.io/badge/-Tech.-orange.svg" alt="Tech.:"/> ' + content[i].core_tech + '</p>'
              +  '   <p><i class="fa fa-edit fa-lg" aria-hidden="true"></i> ' + content[i].description;
    if ( content[i].detail_link ) 
      htmlStr += '       <a href="' + content[i].detail_link + '" title><img class="badge" src="https://img.shields.io/badge/-More%20Detail-green.svg" alt="More Detail"/></a> ';
    htmlStr   += '       <a href="' + content[i].code_link + '" target="_blank"><img class="badge" src="https://img.shields.io/badge/-Source%20Code-lightgrey.svg" alt="Source Code"/></a>'
              + '   </p>'
              + '</div>';
    
  }
  var grid = document.querySelector('.grid');
  grid.insertAdjacentHTML('afterbegin', htmlStr);
}

/**
 * 等待图片加载
 * @return {[type]} [description]
 */
function waitImgsLoad() {
  var imgs = document.querySelectorAll('.grid img')
  var totalImgs = imgs.length
  var count = 0
  //console.log(imgs)
  for (var i = 0; i < totalImgs; i++) {
    if (imgs[i].complete) {
      //console.log('complete');
      count++
    } else {
      imgs[i].onload = function() {
        // alert('onload')
        count++
        //console.log('onload' + count)
        if (count == totalImgs) {
          //console.log('onload---bbbbbbbb')
          initGrid()
        }
      }
    }
  }
  if (count == totalImgs) {
    //console.log('---bbbbbbbb')
    initGrid()
  }
}

/**
 * 初始化栅格布局
 * @return {[type]} [description]
 */
function initGrid() {
  var msnry = new Masonry('.grid', {
    // options
    itemSelector: '.grid-item',
    columnWidth: 250,
    isFitWidth: true,
    gutter: 20
  })
}
