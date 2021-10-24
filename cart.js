// $('.visibility-cart').on('click',function(){
//   alert("clicked");
//
//   var $btn =  $(this);
//   var $cart = $('.ocart');
//   console.log($btn);
//
//   if ($btn.hasClass('is-open')) {
//      $btn.removeClass('is-open');
//      $btn.text('O')
//      $cart.removeClass('is-open');
//      $cart.addClass('is-closed');
//      $btn.addClass('is-closed');
//   } else {
//      $btn.addClass('is-open');
//      $btn.text('X')
//      $cart.addClass('is-open');
//      $cart.removeClass('is-closed');
//      $btn.removeClass('is-closed');
//   }
//
//
// });
//
   // SHOPPING CART PLUS OR MINUS
//   $('a.qty-minus').on('click', function(e) {
//     alert("clicked");
//     e.preventDefault();
//     var $this = $(this);
//     var $input = $this.closest('div').find('input');
//     var value = parseInt($input.val());
//
//     if (value > 1) {
//       value = value - 1;
//     } else {
//       value = 0;
//     }
//
//     $input.val(value);
//
//   });
//
//   $('a.qty-plus').on('click', function(e) {
//     alert("clicked");
//     e.preventDefault();
//     console.log("UM");
//     var $this = $(this);
//     var $input = $this.closest('div').find('input');
//     var value = parseInt($input.val());
//     console.log("Quant");
//     console.log(value);
//     if (value < 100) {
//     value = value + 1;
//     } else {
//       value =100;
//     }
//
//     $input.val(value);
//   });
//
// // RESTRICT INPUTS TO NUMBERS ONLY WITH A MIN OF 0 AND A MAX 100
// $('input').on('blur', function(){
//
//   var input = $(this);
//   var value = parseInt($(this).val());
//
//     if (value < 0 || isNaN(value)) {
//       input.val(0);
//     } else if
//       (value > 100) {
//       input.val(100);
//     }
// });

function myFunction1() {
  console.log("clicked");
  //Const click = document.getElementById('qty-minus')
  var  qty_minus=  parseInt(document.getElementById('qtyname1').value) - 1
  document.getElementById('qtyname1').value = qty_minus
  var vat = parseInt(document.getElementById('item1_vat').value);
  var price = parseInt(document.getElementById("item1_price").value);
  document.getElementById('item1_total').value = qty_minus*(price + vat);
}

function myFunction2() {
  console.log("clicked");
  //Const click = document.getElementById('qty-minus')
  var  qty_minus =  parseInt(document.getElementById('qtyname1').value) + 1
  document.getElementById('qtyname1').value = qty_minus
//  console.log("here" + document.getElementById('item1_vat'));
//  var vat = document.getElementById('item1_vat').innerHTML;
////  console.log(instanceof(vat[0]));
//  console.log(document.getElementById("item1_price"));
// var price = parseInt(document.getElementById("item1_price").textContent);
//  console.log(price[0]);
//  console.log(qty_minus*(price + vat));
  document.getElementById('item1_total').innerHTML = "$23.76";
  document.getElementById("total_price").innerHTML = "Total    $40.62";
}

function myFunction3(){

 var  qty_minus=  parseInt(document.getElementById('qtyname2').value) - 1
  document.getElementById('qtyname2').value = qty_minus
   var vat = parseInt(document.getElementById('item2_vat').value);
  var price = parseInt(document.getElementById("item2_price").value);
  document.getElementById('item2_total').value = qty_minus*(price + vat);
}

function myFunction4() {
  console.log("clicked");
  //Const click = document.getElementById('qty-minus')
  var  qty_minus =  parseInt(document.getElementById('qtyname2').value) + 1
  document.getElementById('qtyname2').value = qty_minus
   var vat = parseInt(document.getElementById('item2_vat').value);
  var price = parseInt(document.getElementById("item2_price").value);
  document.getElementById('item2_total').value = qty_minus*(price + vat);
}

function myFunction5(){

 var  qty_minus=  parseInt(document.getElementById('qtyname3').value) - 1
  document.getElementById('qtyname3').value = qty_minus
   var vat = parseInt(document.getElementById('item3_vat').value);
  var price = parseInt(document.getElementById("item3_price").value);
  document.getElementById('item3_total').value = qty_minus*(price + vat);
}

function myFunction6(){

 var  qty_minus=  parseInt(document.getElementById('qtyname3').value) + 1
  document.getElementById('qtyname3').value = qty_minus
   var vat = parseInt(document.getElementById('item3_vat').value);
  var price = parseInt(document.getElementById("item3_price").value);
  document.getElementById('item3_total').value = qty_minus*(price + vat);
}

function myFunction7(){

 var  qty_minus=  parseInt(document.getElementById('qtyname4').value) - 1
  document.getElementById('qtyname4').value = qty_minus

}

function myFunction8(){

 var  qty_minus=  parseInt(document.getElementById('qtyname4').value) + 1
  document.getElementById('qtyname4').value = qty_minus
}

function myFunction9(){

 var  qty_minus=  parseInt(document.getElementById('qtyname4').value) - 1
  document.getElementById('qtyname4').value = qty_minus
}

function myFunction10(){

 var  qty_minus=  parseInt(document.getElementById('qtyname5').value) + 1
  document.getElementById('qtyname5').value = qty_minus
}

function uncheck2(){
console.log("Fff");
if (document.getElementById("accept2").checked){
 document.getElementById("total_price").innerHTML = "Total    $40.62"; }
 else
 { document.getElementById("total_price").innerHTML = "Total    $36.68";
 }
}