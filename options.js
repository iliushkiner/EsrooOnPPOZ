// JavaScript Document
$(document).ready(function(){

  $('#plg_title_ipsum').val((typeof(window.localStorage.plg_title_ipsum) != "undefined" && window.localStorage.plg_title_ipsum != null && window.localStorage.plg_title_ipsum !="") ? window.localStorage.plg_title_ipsum : 'Обращение зависло на @requests.status@');
  
  $('body').on('change past kayup select', '#plg_title_ipsum', function(){  
    let plg_title_ipsum = $('#plg_title_ipsum').val();  
    window.localStorage.plg_title_ipsum = plg_title_ipsum;
    chrome.storage.local.set({plg_title_ipsum: plg_title_ipsum}, function(){
            console.log(plg_title_ipsum);
    }); 
  });
  
  let desc_ipsum = (typeof(window.localStorage.plg_desc_ipsum) != "undefined" && window.localStorage.plg_desc_ipsum != null && window.localStorage.plg_desc_ipsum != "") ? window.localStorage.plg_desc_ipsum : '<p>1. Промышленный контур (РТК)</p>\n'+
    '<p>2. Ссылка http://pkurp-app-balancer-01.prod.egrn/12/requests/@requests.appealNumber@/validations_views/statements</p>\n'+
    '<p>3. Обращение&nbsp;@requests.appealNumber@&nbsp;в статусе "@requests.status@", в логах незавершенное на процессе "@logs.processName@" событие&nbsp;"@logs.activityName@" от @logs.startDate@.</p>\n'+
    '<p>Прошу оказать помощь.</p>';
  $('#plg_desc_ipsum').val(desc_ipsum);

  $('body').on('change past kayup select', '#plg_desc_ipsum', function(){  
    let plg_desc_ipsum = $('#plg_desc_ipsum').val();  
    window.localStorage.plg_desc_ipsum = plg_desc_ipsum;
    chrome.storage.local.set({plg_desc_ipsum: plg_desc_ipsum}, function(){
            console.log(plg_desc_ipsum);
    }); 
  });

});