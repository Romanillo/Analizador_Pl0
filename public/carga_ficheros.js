var editor = CodeMirror.fromTextArea(document.getElementById("input"), {
  lineNumbers: true,
  viewportMargin: Infinity,
  mode: "text/x-pascal"
});
	  
function dump(fileName) {
  $.get(fileName, function (data) {
    $("#input").val(data);
    editor.setValue(data);
  });
};
      
document.getElementById('files').addEventListener('change', CopyMe, false);

function CopyMe(evt) {
  var file = evt.target.files[0];
  if (file) {
    var reader = new FileReader();
    reader.onload = function(e) { 
      editor.setValue(e.target.result);
    }
    var c = reader.readAsText(file);
  }
  else { alert("Failed to load file"); }
}