jQuery(document).ready(function() {

  // Execute on button click
  jQuery('button').click(function(e) {
  
    // Check which button has been clicked - match each case
    var idClicked = e.target.id;
    
    switch (idClicked) {
    
    	case "createSpintax":	// Generate Spintax from input on textarea
  
  		// Check if textarea is empty, if so print warning, else generate spintax
  		if (!jQuery('#spintax-textarea').val()) {    
      	jQuery('#spintax-textarea').attr("placeholder", "Hello! You need to add a list of words or phrases you would like to generate into spintax.")      
        } else {

        var data = jQuery('#spintax-textarea').val().split(/\r?\n/);
        var cleaned = data.filter(n => n);
        var result = cleaned.join('|');

        // Prepare result and print to textarea
        result = "\{" + result + "\}";    
        jQuery('#spintax-textarea').val(result);

      	}
      	break;
        
      case "clearText":	// Clear URL Textarea
        e.preventDefault();
        jQuery('#spintax-textarea').val('');
        break;
    
      case "genericKeywords":	// Load list of generic keywords from server source - Needs to be on same domain as script
        jQuery.ajax({
          url: "https://serpseed.com/wp-content/themes/serpseed/seo-tools/files/generic-keywords.txt",
          dataType: "text",
          success: function(data) {
            jQuery('#spintax-textarea').val(data);
          }
        });
        break;
        
      case "loadText":	// Load words from file - Requires HTML input type="file"
        jQuery('#loadTextFile').trigger('click');
        break;
        
      case "saveFile":	// Save contents of results textarea to .TXT file
        var textToSave = jQuery('#spintax-textarea').val();
        var textToSaveAsBlob = new Blob([textToSave], {
          type: "text/plain"
        });
        var textToSaveAsURL = window.URL.createObjectURL(textToSaveAsBlob);
        var fileNameToSaveAs = jQuery('#saveFilename').val() + ".txt"

        var downloadLink = document.createElement("a");
        downloadLink.download = fileNameToSaveAs;
        downloadLink.innerHTML = "Download File";
        downloadLink.href = textToSaveAsURL;
        downloadLink.onclick = destroyClickedElement;
        downloadLink.style.display = "none";
        document.body.appendChild(downloadLink);

        downloadLink.click();
        break;
        
    }	// End Switch Statement
    
  });
  
  // Handler for loading Text Files
  jQuery('#loadTextFile').click(function() {
    var fileInput = jQuery('#loadTextFile');
    var fileDisplayArea = jQuery('#spintax-textarea');

    jQuery(fileInput).change(function() {
      var file = jQuery(fileInput).prop('files')[0];
      var textType = /text.*/;

      if (file.type.match(textType)) {
        var reader = new FileReader();
        reader.onload = function() {

          jQuery(fileDisplayArea).val(reader.result);

        }
        reader.readAsText(file);
      } else {
        jQuery(fileDisplayArea).val("File not supported!");
      }
    });
  });
  
  // Function used by save file
  function destroyClickedElement(event) {
    document.body.removeChild(event.target);
  }
  
});
