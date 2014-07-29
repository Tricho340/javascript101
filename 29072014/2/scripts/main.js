require.config({
  paths: {
    "Q": "../bower_components/q/q",
    "jquery": "../bower_components/jquery/dist/jquery.min"
  }
});

require(["Q", "jquery"], function(Q, $) {
  $(function() {
    var FILE_UPLOAD_SERVICE_URL = 'http://localhost:3000/fileUpload',
        dragAndDropContainer = $("#dragAndDropFileContainer").get(0),
        progressBar = $("#uploadProgressBar").get(0),
        draggedOver = false;

    dragAndDropContainer.ondrop = function(e) {
      this.className = '';
      e.preventDefault();
      uploadFiles(e.dataTransfer.files);
    };

    dragAndDropContainer.ondragover = function() {
      console.log("Drag over detected");
      if (!draggedOver) {
        draggedOver = true;
        this.className = 'fileContainerHovered';
      }
      return false;
    };

    dragAndDropContainer.ondragend = function() {
      this.className = '';
      draggedOver = false;
      return false;
    };

    function getFormDataByFiles(files) {
      var formData = new FormData();
      for (var i = (files.length - 1); i--;) {
        formData.append('file', files[i]);
      }

      return formData;
    }

    function uploadImages(files) {
      var deferred = Q.defer();

      var xhr = new XMLHttpRequest();
      xhr.open('POST', FILE_UPLOAD_SERVICE_URL);
      xhr.onload = function() {
        progressBar.value = progressBar.innerHTML = 100;
        deferred.resolve();
      };

      xhr.upload.onprogress = function(event) {
        if (event.lengthComputable) {
          var percentComplete = (event.loaded / event.total * 100 | 0);
          progressBar.value = progressBar.innerHTML = percentComplete;
        }
      };

      xhrForUpload.send(formData);

      return deferred.promise;
    }

    function imageUploadedHandler() {
      console.log("Image uploaded successfully.");
    }

    function imageUploadErrorHandler() {
      console.log("Image upload error handler.");
    }

    function uploadFiles(files) {
      var formData = getFormDataByFiles(files);
      Q.fcall(uploadImages, files).then(imageUploadedHandler).catch(imageUploadErrorHandler);
    }
  });
});
