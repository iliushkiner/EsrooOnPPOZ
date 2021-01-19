/*chrome.browserAction.onClicked.addListener(function(tab){
  chrome.tabs.executeScript(tab.id, {
    code: "(" + refreshPopaup.toString() + ")();"
  });  
});

var refreshPopaup = function(){
  let podrazc = 'пусто';
  podrazc = chrome.storage.local.get(['podrazdelenie'], function(result){
    console.log(result.podrazdelenie);
  });

  $("#statistic").html("Подразделение: ".concat(podrazc));
}*/

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse){
    console.log(request);
    console.log(sender);
    console.log(sendResponse);
    
    chrome.tabs.query({url: "http://10.128.21.4/app/incidents/new"}, function(tabs){
      console.log(tabs);
      if (tabs.length>0){
        chrome.tabs.sendMessage(tabs[0].id, request/*, function(response){      
          console.log(response);
        }*/);
      }
    });
});
