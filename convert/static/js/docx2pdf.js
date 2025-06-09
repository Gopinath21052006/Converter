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
      if(files[0].type === '.docx'){
        fileInput.files= files;
        updateFileInfo(files)
      } else{
        fileInfo.textContent = "please drop a valid docx file ";
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
    }
  });
  

function updateFileInfo(file){
  if (file.name.endsWith(".docx")) {
        fileInfo.textContent = `Selected DOCX: ${file.name} (${(file.size / 1024).toFixed(2)} KB)`;
    } else {
        fileInfo.textContent = "Please select a valid DOCX file.";
        fileInput.value = ''; // Clear invalid selection
    }

}
// Form submission handling (uncommented and fixed)
uploadForm.addEventListener('submit', function(e) {
    if (!fileInput.files || fileInput.files.length === 0) {
        e.preventDefault();
        fileInfo.textContent = "Please select a DOCX file first.";
    }
});

