// Column border radius
$(document).ready(function(){
  var transparentElement = $('[class*=radius-]');

  transparentElement.each(function(){

    var borderradiusclass = $(this).attr('class');

    var classPosition = parseInt(borderradiusclass.search("radius-"), 10);

    var radius = borderradiusclass.substr(classPosition ,9).slice(-2);
    console.log(radius)
    $(this).css('border-radius', radius+'px');

  });
});
