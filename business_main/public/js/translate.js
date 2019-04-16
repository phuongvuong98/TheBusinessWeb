(function ($) {
    "use strict";

    // chuyen tat ca vao sumTrans
    var sumTrans = {};
      $(".translate").each(function() {
        // sumTrans[$(this).attr("name")] = $(this).val();
        sumTrans[$(this).attr("name")] = $(this).text();
      });
      alert(sumTrans.trans);
    

    // tra ve tieng viet doi voi cac text
    $(".translate").text("HUHU");

})(jQuery);
  