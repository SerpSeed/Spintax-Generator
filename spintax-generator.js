var loadText = document.getElementById("load-text");
var loadFileText = document.getElementById("load-file");
var genericKeywords = document.getElementById("generic-keywords");
var clearText = document.getElementById("clear-text");
var createSpintax = document.getElementById("create-spintax");
var saveFile = document.getElementById("save-file");
var textArea = document.getElementById("spintax-textarea");

loadText.addEventListener("click", function () {
    loadFileText.click();
});

// Handler For Loading Text Files
loadFileText.addEventListener("change", function () {
    var file = loadFileText.files[0];

    if (file.type.match(/text.*/)) {
        var reader = new FileReader();
        reader.readAsText(file);
        
        reader.onload = function () {
            textArea.innerHTML = reader.result;
        }
        
    } else {
        textArea.innerHTML = "File Not Support! Please use a TXT file.";
    }
});

// Load List of Generic Keywords
genericKeywords.addEventListener("click", function () {
    var xhr = new XMLHttpRequest();

    xhr.open("GET", "/tools/files/generic-keywords.txt");
    xhr.onload = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            textArea.innerHTML = xhr.responseText;
        } else {
            textArea.innerHTML = "Loading Generic Keywords Failed!";
        }
    };
    xhr.send();
});

// Clear TextArea
clearText.addEventListener("click", function () {
    textArea.innerHTML = "";
});

// Generate Spintax
createSpintax.addEventListener("click", function () {
    if (textArea.value) {
        var data = textArea.innerHTML.split(/\r?\n/);
        var cleaned = data.filter(n => n);
        var result = cleaned.join("|");
        result = "\{" + result + "\}";
        textArea.innerHTML = result;
    } else {
        textArea.setAttribute("placeholder", "Hello! You need to add a list of words or phrases you would like to generate into spintax.");
    }
});

// Save Results
saveFile.addEventListener("click", function () {
    var textToSaveAsBlob = new Blob([textArea.innerHTML], { type: "text/plain" });
    var textToSaveAsURL = window.URL.createObjectURL(textToSaveAsBlob);
    var fileNameToSaveAs = document.getElementById("save-filename").value + ".txt";
    var downloadLink = document.createElement("a");
    
    downloadLink.download = fileNameToSaveAs;
    downloadLink.href = textToSaveAsURL;
    downloadLink.style.display = "none";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
});
