!function(){let e=document.querySelector("#itemList"),t=document.forms.myform,n=document.querySelector("#btn"),l=document.querySelector("#searchbtn"),i=document.querySelector("#addbtn"),c=document.querySelector("#searchInput"),o=document.querySelector("#sortbyname"),r=document.querySelector("#sortbyprice"),a=[{name:"Товар 1",count:2,price:200},{name:"Товар 2",count:4,price:700},{name:"Товар 3",count:5,price:400}];function s(e,t,n){this.name=e,this.count=t,this.price=n}function u(e){return`<tr>\n    <td>${e.name}</td>\n    <td>${e.count}</td>\n    <td>${"$"+Intl.NumberFormat("en").format(e.price)}</td>\n    <td>\n      <div class="text-center">\n        <a href="#" class="itemEdit btn btn-danger">Edit</a> \n        <a href="#" class="deleteEdit btn btn-danger">Delete</a></td>\n      </div>\n  </tr>`}function d(t){if(e.innerHTML="",void 0!==t){let n=t.map(e=>u(e));e.innerHTML+=n.join("")}else{let t=a.map(e=>u(e));e.innerHTML+=t.join("")}console.log(a),console.log(t)}function p(e){if(e.preventDefault(),n.classList.contains("btnUpdate"))console.log("kekw"),console.log(ite),a.map(function(e){e===ite?(e.name=t.name.value,e.count=t.count.value,e.price=t.price.value):console.log("2")}),n.classList.remove("btnUpdate"),n.innerHTML="add",d(),t.reset();else if(t.name.value.trim()&&t.count.value.trim()&&""!==t.price.value.trim()&&t.name.value.length<=15){let e=new s(t.name.value,t.count.value,t.price.value);a.push(e),d(),t.reset()}else!1===t.checkValidity()&&(e.preventDefault(),e.stopPropagation()),t.classList.add("was-validated")}function m(l){l.preventDefault(),console.log(l.target.getAttribute("class"));let i=null!==l.target.getAttribute("class")?l.target.getAttribute("class").split(" ")[0]:console.log("kaw");if("deleteEdit"===i){let t=Object.values(e.querySelectorAll(".deleteEdit"));console.log(t.indexOf(l.target)),confirm("delete?")&&(a.splice(t.indexOf(l.target),1),d())}else if("itemEdit"===i){n.innerHTML="Update",n.classList.add("btnUpdate");let i=Object.values(e.querySelectorAll(".itemEdit"));console.log(i.indexOf(l.target)),ite=a[i.indexOf(l.target)],console.log(ite),t.name.value=ite.name,t.count.value=ite.count,t.price.value=ite.price}}function f(e){e.preventDefault();let t=c.value;if(console.log(t),0==t.length||t.length>2){let e=new RegExp(t);d(a.filter(t=>e.test(t.name)))}}function v(e){if(e.preventDefault(),console.log("sortbyname"),o.classList.toggle("up"),o.classList.contains("up")){d(a.sort(function(e,t){return e.name<t.name?1:-1})),console.log(">")}else{d(a.sort(function(e,t){return e.name>t.name?1:-1})),console.log("<")}}function g(e){if(e.preventDefault(),r.classList.toggle("up"),r.classList.contains("up")){d(a.sort(function(e,t){return e.price<t.price?1:-1}))}else{d(a.sort(function(e,t){return e.price>t.price?1:-1}))}}function b(e){e.preventDefault(),t.price.value=t.price.value.replace(/(\d+|\d+\.\d+|\.\d+)([eE][-+]?\d+)/g),console.log(t.price.value.replace(/(\d+|\d+\.\d+|\.\d+)([eE][-+]?\d+)/i))}e.addEventListener("click",m),t.addEventListener("submit",p),i.addEventListener("click",p),l.addEventListener("click",f),o.addEventListener("click",v),r.addEventListener("click",g),t.price.addEventListener("blur",b),d()}();