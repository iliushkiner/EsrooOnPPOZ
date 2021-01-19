//$(document).ready(function(){
  /** Обработчик событий на наведение мыши по элементу с классом node-product-display **/
  //http://ppoz-service-bal-01.prod.egrn:9001/#/administration/details/PKPVDMFC-2020-12-12-229467/data
  console.log($('.selected-item'));         
  $('.administration-tabs ul li:last').after("<button id='esrooinc' type='button' class='btn btn-secondary' aria-label='Создать инц. на ЕСРОО'>Создать инц. на ЕСРОО</button>");

  $('body').on('click', '#esrooinc', function(){
    console.log('событие нажатия на кнопку "Создать инц. на ЕСРОО"');
    let num = $('.selected-item').html();
    let regnum = num.match(/<!-- react-text: 44 -->(.*)<!-- \/react-text -->/);
    
    function getAjaxData(url/*, json*/){
      var result = "";
      $.ajax({
        url: url,
        dataType: "json",
        //data: JSON.stringify(json),
        method: "GET",
        contentType: "application/json;charset=UTF-8",
        async: false,
        success: function(data) {
          //console.log(data);
          result = data;
        } 
      });
      return result
    } 

    let url = "http://ppoz-service-bal-01.prod.egrn:9001/manager/requests/logs/byId?id=".concat(regnum[1]);
    let logs = getAjaxData(url/*, json*/);
    console.log(logs);
    
    url = "http://ppoz-service-bal-01.prod.egrn:9001/manager/requests/byId?id=".concat(regnum[1]);
    let req = getAjaxData(url/*, json*/);
    console.log(req);

    chrome.runtime.sendMessage({logs: logs.activityInstances,requests: req});
      
  });
               
//});
