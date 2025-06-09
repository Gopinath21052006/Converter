  const dropZone = document.getElementById('dropZone');
  const fileInfo = document.getElementById('fileInfo');
  const fileInput = document.getElementById('fileInput');
  const uploadForm = document.getElementById('uploadForm');


 ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    dropZone.addEventListener(eventName, (e) => e.preventDefault());
  });

  function preventDefault(e){
    e.preventDefault();
    e.stopPropagation();
  }

  ['dragenter','dragover'].forEach( eventName => {
    dropZone.addEventListener(eventName , () =>{
      dropZone.classList.add('hover');
    } ,false)
  });

  ['dragleave','drop'].forEach(eventName =>{
    dropZone.addEventListener(eventName,()=>{
      dropZone.classList.remove('hover');

    },false)
  });

  //handledrop dropped file 
 
  dropZone.addEventListener('drop',handleDrop,false);

  function handleDrop(e){
    const dt =e.dataTransfer;
    const files = dt.files;
    if(files.length >0){
      //validate pdf file 
      if(files[0].type === 'application/pdf'){
        fileInput.files= files;
        updateFileInfo(files[0])
      } else{
        fileInfo.textContent = "please drop a valid pdf file ";
      }
    }

  }

  // Handle click to select files
dropZone.addEventListener('click',() => {
  fileInput.click();
});

  fileInput.addEventListener('change', () => {
    if (fileInput.files.length > 0) {
      updateFileInfo(fileInput.files[0]);
      fake(fileInput.files[0]);
    }
  });
  

function updateFileInfo(file){
  if (file.type === "application/pdf") {
        fileInfo.textContent = `Selected PDF: ${file.name} (${(file.size / 1024).toFixed(2)} KB)`;
    } else {
        fileInfo.textContent = "Please select a valid PDF file.";
        fileInput.value = ''; // Clear invalid selection
    }

}
// Form submission handling (uncommented and fixed)
uploadForm.addEventListener('submit', function(e) {
    if (!fileInput.files || fileInput.files.length === 0) {
        e.preventDefault();
        fileInfo.textContent = "Please select a PDF file first.";
    }
});

