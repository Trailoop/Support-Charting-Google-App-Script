
function getAveCount (threads){
  var messages = [];
  if ( threads.length > 0) {
    threads.forEach(function(thread){
      messages.push(thread.getMessageCount());
      Logger.log(thread.getMessageCount());
    });
  return Math.round((messages.reduce(function(a,b){return a + b}) / threads.length) * 100 ) / 100;
  }
  else {
  return 0;
  }
}

function filterThreads(threads){
  var coorspondents = []

  for (var i in threads) {
   var messages = threads[i].getMessages();
   for (var j in messages) {
     if (messages[j].getFrom()=== 'Data Warehouse Support <ausa.microstrategysupport.group@ahold.com>'){
       //Logger.log(messages[j].getFrom());
       coorspondents.push(messages[j]);
     }
    }
   }
   return coorspondents;
}


function getCoorspondents (threads) {
 var coorspondents = [];
 for (var thread in threads) {
   var messages =  threads[thread].getMessages();
   var last = _._first(messages);
     coorspondents.push(last.getTo());
 }
 return coorspondents;
}




function processSearch(search) {
  var search = GmailApp.search(search,0,10);
  //var threadCount = search.getMessageCount();
  var ave = getAveCount(search);
  Logger.log(ave);
  var coorspondents = filterThreads(search);
  //var subject = search.getFirstMessageSubject();
  //var avg = getAveCount(search);
  //Logger.log(avg);
  
  for (var coorspondent in coorspondents) {
  Logger.log(coorspondents[coorspondent].getTo())
  }
  
  //Logger.log(subject +": " +threadCount);
}




