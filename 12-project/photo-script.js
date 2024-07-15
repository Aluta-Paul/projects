const dropArea = document.getElementById("drop-area");
const inputFile = document.getElementById("input-file");
const imageView = document.getElementById("image-view");

//aif there is any change in the image in our page it will be updated --- usinging the uploadImage function//
inputFile.addEventListener("change", uploadImage)

function uploadImage() {
  //it will get the image from the input element//

  //inputFile.files[0];---->//but this is in object format//

  //to convert to image link format//
  let imgLink = URL.createObjectURL(inputFile.files[0]);

  //now to display the image to the page//
  //we will upload it as image background//
  imageView.style.backgroundImage =`url(${imgLink})`;

  //to remove the previous image aka the icon//
  imageView.textContent = "";
  imageView.style.border = 0;
}

//now we creat the DRAG and DROP feature//
dropArea.addEventListener("dragover",function(e){
  e.preventDefault();//prevent default feature when we drop//
});

dropArea.addEventListener("drop",function(e){
  e.preventDefault();
  inputFile.files = e.dataTransfer.files;
  uploadImage();
});
