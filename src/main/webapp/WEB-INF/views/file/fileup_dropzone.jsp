<%@ page language="java" contentType="text/html; charset=UTF-8"
pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@taglib uri="http://www.springframework.org/tags/form" prefix="form"%>
<%@ page session="false"%>
<html>
<head>
    <meta charset="utf-8">
    <title>jQuery File Upload Example</title>
    <script src="http://code.jquery.com/jquery-2.1.1.js"></script>
    <script src="../js/dropzone.js"></script>
    <link rel="stylesheet" href="../css/dropzone.css">
</head>
<body>

<form id="my-dropzone" action="/" class="dropzone"></form>

<button id="clear-dropzone">Clear Dropzone</button>

<script language="javascript">

  // myDropzone is the configuration for the element that has an id attribute
  // with the value my-dropzone or myDropzone
  Dropzone.options.myDropzone = {
    init: function() {
      this.on("sending", function(file) {
        
      });

      // Using a closure.
      var _this = this;

      // Setup the observer for the button.
      document.querySelector("[data-dz-remove]").addEventListener("click", function() {
        // Using "_this" here, because "this" doesn't point to the dropzone anymore
        _this.removeAllFiles(true);
        // If you want to cancel uploads as well, you
        // could also call _this.removeAllFiles(true);
      });
    }
  };

</script>

</body>
</html>