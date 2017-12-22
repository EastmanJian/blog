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
      description: 'The usage of ondragover and ondrop events. Also the usage of event.preventDefault() method, event.dataTransfer object. [<a href="https://eastmanjian.cn/blog/2016/11/22/drag-and-drop-html5-vs-jquery/" title>More detail</a>]'
    }, {
      demo_link: 'https://eastmanjian.cn/js_demo/tiy.jsp?sample=https%3A%2F%2Feastmanjian.github.io%2FHTML_CSS_Demo%2Fcss_opacity_image.html',
      img_link: 'https://ejres-1253687085.picgz.myqcloud.com/img/html5/img-opacity-demo.png',
      code_link: 'https://eastmanjian.cn/js_demo/tiy.jsp?sample=https%3A%2F%2Feastmanjian.github.io%2FHTML_CSS_Demo%2Fcss_opacity_image.html',
      detail_link: 'https://eastmanjian.cn/blog/2015/10/14/css3-opacity/',
      title: 'CSS3 Opacity',
      core_tech: 'CSS3',
      description: 'The CSS opacity property is a part of the W3C CSS3 recommendation. CSS3的透明效果。'
    }, {
      demo_link: 'http://gaohaoyang.github.io/ife/task/task0002/work/Gaohaoyang/task0002_4.html',
      img_link: 'http://ww2.sinaimg.cn/large/7011d6cfjw1f3ba2krzs0j207005y0sv.jpg',
      code_link: 'https://github.com/Gaohaoyang/ife/tree/master/task/task0002/work/Gaohaoyang',
      title: '输入框即时提示',
      core_tech: 'JavaScript',
      description: '对input监听，使用正在表达式高亮匹配，实现输入联想效果。'
    }, {
      demo_link: 'http://gaohaoyang.github.io/ife/task/task0002/work/Gaohaoyang/task0002_3.html',
      img_link: 'http://ww2.sinaimg.cn/large/7011d6cfjw1f3ba04okoqj20eq093wh1.jpg',
      code_link: 'https://github.com/Gaohaoyang/ife/tree/master/task/task0002/work/Gaohaoyang',
      title: '轮播图',
      core_tech: 'JavaScript',
      description: '变速运动，运动终止条件的应用。'
    }, {
      demo_link: 'http://gaohaoyang.github.io/ife/task/task0002/work/Gaohaoyang/task0002_2.html',
      img_link: 'http://ww4.sinaimg.cn/large/7011d6cfjw1f3b9w6xpz5j20ae02pgm3.jpg',
      code_link: 'https://github.com/Gaohaoyang/ife/tree/master/task/task0002/work/Gaohaoyang',
      title: '倒计时',
      core_tech: 'JavaScript',
      description: 'setInterval()，Date 对象的学习和使用。'
    }, {
      demo_link: 'http://gaohaoyang.github.io/ife/task/task0002/work/Gaohaoyang/task0002_1.html',
      img_link: 'http://ww3.sinaimg.cn/large/7011d6cfjw1f3b9tmyuh2j20au0aaaar.jpg',
      code_link: 'https://github.com/Gaohaoyang/ife/tree/master/task/task0002/work/Gaohaoyang',
      title: '处理兴趣爱好列表',
      core_tech: 'JavaScript',
      description: '对JavaScript正则表达式和字符串的练习。'
    }, {
      demo_link: 'http://gaohaoyang.github.io/ife/task/task0002/work/Gaohaoyang/index.html',
      img_link: 'http://7q5cdt.com1.z0.glb.clouddn.com/demo-demo-index.png',
      code_link: 'https://github.com/Gaohaoyang/ife/tree/master/task/task0002/work/Gaohaoyang',
      title: '百度前端学院 task0002 展示主页',
      core_tech: 'HTML CSS',
      description: '任务二的展示主页，里面包含五个小 demo。还有一篇相关的<a href="http://gaohaoyang.github.io/2015/04/22/baidu-ife-2-javascript/" target="_blank">日志。</a>'
    }, {
      demo_link: 'http://gaohaoyang.github.io/ife/task/task0001/work/Gaohaoyang/index.html',
      img_link: 'http://7q5cdt.com1.z0.glb.clouddn.com/Demo-blog-ife.jpg',
      code_link: 'https://github.com/Gaohaoyang/ife/tree/master/task/task0001/work/Gaohaoyang',
      title: '百度前端学院 task0001 个人博客',
      core_tech: 'HTML CSS',
      description: '完成百度前端学院的任务。深刻的理解了BFC、浮动、inline-block间距，多列布局等技术。还有一篇相关的<a href="http://gaohaoyang.github.io/2015/04/15/baidu-ife-1/" target="_blank">日志。</a>'
    }, {
      demo_link: 'http://gaohaoyang.github.io/ghost-button-css3/',
      img_link: 'http://7q5cdt.com1.z0.glb.clouddn.com/DemoGhost-Button.png',
      code_link: 'https://github.com/Gaohaoyang/ghost-button-css3',
      title: 'Ghost Button 幽灵按钮',
      core_tech: 'CSS3',
      description: '使用 CSS3 中的旋转、缩放、过渡、动画等效果，制作出很酷的按钮效果。'
    }, {
      demo_link: 'http://gaohaoyang.github.io/shadow-demo-css3',
      img_link: 'http://7q5cdt.com1.z0.glb.clouddn.com/Demoshadow.png',
      code_link: 'https://github.com/Gaohaoyang/shadow-demo-css3',
      title: 'CSS3 阴影特效',
      core_tech: 'CSS3',
      description: 'CSS3 中的阴影、旋转等效果，制作出曲边阴影和翘边阴影。'
    }, {
      demo_link: 'http://gaohaoyang.github.io/learning-AngularJS/2-3-bookstore-add-sth-by-myself/',
      img_link: 'http://7q5cdt.com1.z0.glb.clouddn.com/DemoAngularJS.png',
      code_link: 'https://github.com/Gaohaoyang/learning-AngularJS/tree/master/2-3-bookstore-add-sth-by-myself',
      title: 'AngularJS 结合动画效果',
      core_tech: 'AngularJS CSS3',
      description: '使用 AngularJS 中的 ngAnimate 加 CSS3里面的一些旋转效果，做出页面切换的效果。'
    }, {
      demo_link: 'http://gaohaoyang.github.io/learning-AngularJS/2-4-UiRouterPractice',
      img_link: 'http://ww2.sinaimg.cn/large/7011d6cfjw1f3b8zumfqij20q40nh76x.jpg',
      code_link: 'https://github.com/Gaohaoyang/learning-AngularJS/tree/master/2-4-UiRouterPractice',
      title: 'AngularJS UI-router 练习',
      core_tech: 'AngularJS UI-router',
      description: 'UI-router 作为 AngularJS 中路由的扩充，实现了多级路由的效果。使得前端界面跳转更加方便。'
    }, {
      demo_link: 'http://gaohaoyang.github.io/test/bootstrap-zhihu/',
      img_link: 'http://7q5cdt.com1.z0.glb.clouddn.com/teach-girlfriend-html-CopyZhihu.jpg',
      code_link: 'https://github.com/Gaohaoyang/test/tree/master/bootstrap-zhihu',
      title: '仿知乎页面',
      core_tech: 'HTML BootStrap',
      description: '使用BootStrap仿照知乎做了一个静态页面。'
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
