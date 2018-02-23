function recordDailyActivtyxx(recoverDate){
  var db = ScriptDb.getMyDb();
  
  var date1 = new Date(recoverDate);
  var date2 = new Date(recoverDate);
  
  var day1 = 0;
  var day2 = 1;
  var today = Utilities.formatDate(new Date(date1.setDate(date1.getDate() + day1)), "America/New_York", "yyyy-MM-dd") // +0
  var tomorrow = Utilities.formatDate(new Date(date2.setDate(date2.getDate() + day2)), "America/New_York", "yyyy-MM-dd"); //+1 
  var searchTerm = 'is:sent from:(AUSA.MicrostrategySupport.group@ahold.com) after:' + today +' before:' + tomorrow;
  Logger.log(searchTerm)
 
  var search = GmailApp.search(searchTerm);
  
  var date = new Date(recoverDate);

  var stats = {
    date:  {
      timestamp: date.getTime(), // To recreate the Date object later.
      day: date.getDay(),        // 0 is Sunday, 1 is Monday, etc.
      date: date.getDate(),      // Day of the month.
      month: date.getMonth(),    // 0 is January, 1 is February, etc.
      year: date.getFullYear(),  // Full 4-digit year.
    },
    messageCount: search.length,
    avgThreadCount: getAveCount(search)
  }
  
  db.save(stats);

}


function recover(){
  var startdate = new Date(2014,03,10);
  Logger.log(startdate)
  
  recordDailyActivtyxx(startdate);

}

function search(){
  var db = ScriptDb.getMyDb();

  var date1 = new Date();
  var date2 = new Date();
  var tomorrow = Utilities.formatDate(new Date(date1.setDate(date1.getDate() +1)), "America/New_York", "yyyy-MM-dd") // +1
  var yesterday = Utilities.formatDate(new Date(date2.setDate(date2.getDate() -1)), "America/New_York", "yyyy-MM-dd"); //-1 
  var searchTerm = 'is:sent from:(AUSA.MicrostrategySupport.group@ahold.com) after:' + yesterday +' before:' + tomorrow;
  Logger.log(searchTerm)
  
}

