chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse){
    console.log(request);
    console.log(sender);
    console.log(sendResponse);
    /*var element = document.getElementsByClassName("cke_editable");
    console.log(element);
    var p = document.createElement('p');
    element.innerHTML = "";
    p.innerHTML = "TEST";
    //element.appendChild(p);
    element.innerHTML = "TEST";*/
    (async() => {
    async function getLocalStorageValue(name){
      return new Promise(resolve => {
        chrome.storage.local.get(name, data=> {
          resolve(data);
        });
      });
    }
    
    $('input[placeholder="Сервис"]').val("ЕГРН.");

    let plg_title_ipsum = await getLocalStorageValue('plg_title_ipsum');
    let title_ipsum = Object.values(plg_title_ipsum);

    //requests.status     
    
    let str_title_ipsum = (title_ipsum.length>0 && title_ipsum[0] !=="") ? title_ipsum[0] : 'Обращение зависло на @requests.status@';
    
    let title_match = str_title_ipsum.match(/@(.+?)@/g);
    console.log(title_match);
    //title_match = Array.from(title_match);
    $.each(title_match, function(index,value){
      value = value.replace(/@/g,'');
      let key = value.split('.');
      console.log(index);
      console.log(value);
      str_title_ipsum = str_title_ipsum.replace('@'+value+'@',request[key[0]][key[1]]);
    });    

    let title_elem = $('input[placeholder="Тема"]');
    console.log(title_elem);
    title_elem.val(str_title_ipsum);
    
    let plg_desc_ipsum = await getLocalStorageValue('plg_desc_ipsum');
    let desc_ipsum = Object.values(plg_desc_ipsum);
    
    let str_desc_ipsum = (desc_ipsum.length>0 && desc_ipsum[0] !== "") ? desc_ipsum[0] : '<p>1. Промышленный контур (РТК)</p>\n'+
    '<p>2. Ссылка http://pkurp-app-balancer-01.prod.egrn/12/requests/@requests.appealNumber@/validations_views/statements</p>\n'+
    '<p>3. Обращение&nbsp;@requests.appealNumber@&nbsp;в статусе "@requests.status@", в логах незавершенное на процессе "@logs.processName@" событие&nbsp;"@logs.activityName@" от @logs.startDate@.</p>\n'+
    '<p>Прошу оказать помощь.</p>';
    
    let desc_match = str_desc_ipsum.match(/@(.+?)@/g);
    console.log(desc_match);
    //logs.activityInstances[47].endDate
    $.each(desc_match, function(index,value){
      value = value.replace(/@/g,'');
      let key = value.split('.');
      //console.log(index);
      //console.log(value);
      if (key[0] === 'requests'){
        str_desc_ipsum = str_desc_ipsum.replace('@'+value+'@',request[key[0]][key[1]]);
      } else if (key[0] === 'logs'){
        for(let i = request[key[0]].length - 1; i>0; i--){
          if (request['logs'][i]['endDate'] == null){
            let replval = request[key[0]][i][key[1]];
            replval = (key[1].search(/Date/)>=0) ? new Date(replval).getDate()+'.'+((new Date(replval).getMonth()+1)<10 ? '0' : '') + (new Date(replval).getMonth()+1)+'.'+new Date(replval).getFullYear()+' '+new Date(replval).getHours()+':'+new Date(replval).getMinutes()+':'+new Date(replval).getSeconds() : replval;
            str_desc_ipsum = str_desc_ipsum.replace('@'+key[0]+'.'+key[1]+'@', replval);
            break;
          }
        }
      }
    });    
    
    var edit_elem = $('.cke_wysiwyg_frame').contents().find("body");
    console.log(edit_elem);
    edit_elem.html(str_desc_ipsum);
    })();
});