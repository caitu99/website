void function() {
  function format(template, json) {
    return template.replace(/#\{(.*?)\}/g, function(all, key) {
      return json && (key in json) ? json[key] : "";
    });
  }

  headerHtml = format(
    String(function(){/*!
<script src="../js/jquery-2.0.3.min.js"></script>
<link href="../css/bootstrap-theme.min.css" rel="stylesheet">
<link href="../css/bootstrap.min.css" rel="stylesheet">
<script src="../js/bootstrap.min.js"></script>
<script type="text/javascript" src="../js/url.js"></script>
<script type="text/javascript" src="../js/login.js"></script>
*/}).replace(/^[^\{]*\{\s*\/\*!?|\*\/[;|\s]*\}$/g, ''),
    {
      title: "�������ģ��",
      date: "2014-05-16"
    }
  );
}();
document.write(headerHtml);