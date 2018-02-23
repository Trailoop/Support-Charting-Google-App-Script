function doGet() {
  var date = new Date();
  var currentMonth = date.getMonth()-1;
  var currentYear = date.getYear();
  var monthName = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  var currentMonthName = monthName[currentMonth];
  var db = ScriptDb.getMyDb();
  var results = db.query({date: {month: db.anyOf([currentMonth])}}).sortBy('date.date', db.ASCENDING, db.NUMERIC);
  var dataSource = [];
  var dataRow = [];
  while(results.hasNext()) {
    var result = results.next();
    Logger.log(result)
    dataRow[0] = Utilities.formatDate(new Date(result.date.year,result.date.month,result.date.date),"America/New_York", "MM-dd-yyyy");
    dataRow[1] = result.messageCount;
    dataRow[2] = result.avgThreadCount;
    dataSource.push(dataRow.slice());
  }
  //Logger.log(dataSource[0][0]);
  
   var dataRange = Charts.newDataTable()
  .addColumn(Charts.ColumnType.STRING, "Date")
  .addColumn(Charts.ColumnType.NUMBER, "Support Request")
  .addColumn(Charts.ColumnType.NUMBER, "Average Correspondences");
  
  for (var i=0;i<dataSource.length;i++){
    dataRange.addRow([dataSource[i][0],dataSource[i][1],dataSource[i][2]]);
  }
  
  dataRange.build()
  
  var app = UiApp.createApplication();
  
  var chart = Charts.newLineChart()
  .setDataTable(dataRange)
  .setCurveStyle(Charts.CurveStyle.SMOOTH)
  .setLegendPosition(Charts.Position.TOP)
  .setPointStyle(Charts.PointStyle.TINY)
  .setYAxisTitle("email")
  //.setDataViewDefinition(Charts.newDataViewDefinition().setColumns([0,2]))
  .setDimensions(500, 250)
  .setRange(0,20)
  .setTitle("Support Activities, " + currentMonthName + " " + currentYear)
  .setXAxisTitle("date")
  .build();
  
  
  var folder = DocsList.getFolder("SupportActivityCharts");//DriveApp.getFoldersByName("Support Activity Charts");
  var file = DocsList.createFile(chart);
  file.rename("Support Activities, " + currentMonthName + " " + currentYear);
  file.setDescription("Support Activities");
  file.addToFolder(folder);///.makeCopy("Support Activities, " + currentMonthName + " " + currentYear, folder);
  //file.setTrashed(true);
  
  
  app.add(chart);
  
  return app;
 

}
