var base64Img = null;
function genPDF() {
  //alert("test");
  //analytics.logEvent('download_report');
  var doc = new jsPDF();
  doc.text(20, 20, 'TestPDF');
  // doc.addImage(content2, 'PNG', 10, 20, 100, 50);
  // doc.addImage(content, 'PNG', 120, 20, 65, 55);
  doc.fromHTML(document.getElementById('classNameLi'), 15, 15, {width: 1000}
  );
  doc.addPage();

  doc.save('test.pdf'); 
}

