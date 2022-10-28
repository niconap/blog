(this["webpackJsonpblog-author-interface"]=this["webpackJsonpblog-author-interface"]||[]).push([[0],{58:function(t,e,n){},61:function(t,e,n){"use strict";n.r(e);var c=n(0),o=n.n(c),a=n(23),r=n.n(a),i=n(3),s=n(18),j=n(6),u=n(25),l=n.n(u),b=n(1);function h(t){var e=Object(c.useState)(""),n=Object(i.a)(e,2),o=n[0],a=n[1],r=Object(c.useState)(""),s=Object(i.a)(r,2),j=s[0],u=s[1],h=Object(c.useState)(!1),d=Object(i.a)(h,2),O=d[0],m=d[1],f=Object(c.useState)(""),g=Object(i.a)(f,2),x=g[0],p=g[1],S=Object(c.useState)(""),v=Object(i.a)(S,2),y=v[0],C=v[1];return O?y?Object(b.jsxs)("p",{children:["Oops an error occured! ",y]}):Object(b.jsx)("p",{children:"Log in successful!"}):Object(b.jsxs)("div",{id:"loginform",children:[Object(b.jsx)("h3",{children:"Welcome back! Log in"}),Object(b.jsxs)("form",{onSubmit:function(e){e.preventDefault(),fetch("/auth/login",{mode:"cors",method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:o,password:j})}).then((function(t){return t.json()})).then((function(e){e.user?e.user&&(localStorage.setItem("token","Bearer ".concat(e.token)),m(!0),t.signal(!0)):p(e.info.message)})).catch((function(t){return C(t)}))},children:[Object(b.jsx)("input",{type:"text",name:"username",placeholder:"Username...",value:o,onChange:function(t){a(t.target.value)}}),Object(b.jsx)("input",{type:"password",name:"password",placeholder:"Password...",value:j,onChange:function(t){u(t.target.value)}}),Object(b.jsx)("div",{id:"loginbuttons",children:Object(b.jsx)("button",{id:"login",children:Object(b.jsx)(l.a,{})})}),Object(b.jsx)("p",{id:"message",children:x})]}),Object(b.jsxs)("p",{children:["Don't have an account? Sign up"," ",Object(b.jsx)("a",{href:"/author-frontend/signup",children:"here"}),"!"]})]})}var d=n(12),O=n(19),m=n(20),f=n.n(m),g=n(27),x=n.n(g),p=n(36),S=n.n(p),v=n(37),y=n.n(v);function C(t){var e=t.data,n=Object(c.useState)(!1),o=Object(i.a)(n,2),a=o[0],r=o[1],j=Object(c.useState)(!1),u=Object(i.a)(j,2),l=u[0],h=u[1],d=Object(c.useState)(e.public),m=Object(i.a)(d,2),g=m[0],p=m[1];return l?"":Object(b.jsxs)("li",{className:"article",children:[Object(b.jsx)(s.b,{to:"/author-frontend/article/"+e._id,children:Object(b.jsx)("h4",{children:e.title})}),Object(b.jsx)("p",{children:O.DateTime.fromISO(e.timestamp).toLocaleString({day:"numeric",month:"long",hour:"numeric",hour12:!1,minute:"numeric"})}),Object(b.jsxs)("div",{className:"articlebuttons",children:[e.public||g?"":Object(b.jsx)("button",{onClick:function(){fetch("/blog/posts/".concat(e._id),{mode:"cors",method:"PUT",headers:{Authorization:localStorage.getItem("token"),"Content-Type":"application/json"},body:JSON.stringify({title:e.title,content:e.content,public:!0})}).then((function(t){return t.json()})).then((function(t){e.public=!0,p(!0)})).catch((function(t){return console.log(t)}))},children:Object(b.jsx)(S.a,{})}),e.public&&g?Object(b.jsx)("button",{onClick:function(){fetch("/blog/posts/".concat(e._id),{mode:"cors",method:"PUT",headers:{Authorization:localStorage.getItem("token"),"Content-Type":"application/json"},body:JSON.stringify({title:e.title,content:e.content,public:!1})}).then((function(t){return t.json()})).then((function(t){e.public=!1,p(!1)})).catch((function(t){return console.log(t)}))},children:Object(b.jsx)(y.a,{})}):"",Object(b.jsx)("button",{onClick:function(){r(!a)},children:a?Object(b.jsx)(x.a,{}):Object(b.jsx)(f.a,{})}),a?Object(b.jsx)("button",{onClick:function(){fetch("/blog/posts/".concat(e._id),{mode:"cors",method:"DELETE",headers:{Authorization:localStorage.getItem("token")}}).then((function(t){return t.json()})).then((function(t){t.message&&h(!0)})).catch((function(t){return console.log(t)}))},children:"Confirm"}):""]})]},e._id)}var k=n(28),T=n.n(k);function I(t){var e=Object(c.useState)(t.title?t.title:""),n=Object(i.a)(e,2),o=n[0],a=n[1],r=Object(c.useState)(t.content?t.content:""),s=Object(i.a)(r,2),j=s[0],u=s[1],l=Object(c.useState)(!1),h=Object(i.a)(l,2),d=h[0],O=h[1],m=Object(c.useState)([]),f=Object(i.a)(m,2),g=f[0],x=f[1],p=Object(c.useState)(""),S=Object(i.a)(p,2),v=S[0],y=S[1];return Object(b.jsxs)("form",{id:"articleform",onSubmit:function(e){e.preventDefault(),t.edit?fetch("/blog/posts/".concat(t.id),{mode:"cors",method:"PUT",headers:{Authorization:localStorage.getItem("token"),"Content-Type":"application/json"},body:JSON.stringify({title:o,content:j,public:!d})}).then((function(t){return t.json()})).then((function(e){e.errors?x(e.errors):(y(e.message),t.setTitle(o),t.setContent(j),a(""),u(""),O(!1),t.setEdit(!1))})).catch((function(t){return console.log(t)})):fetch("/blog/posts",{mode:"cors",method:"POST",headers:{Authorization:localStorage.getItem("token"),"Content-Type":"application/json"},body:JSON.stringify({title:o,content:j,public:!d})}).then((function(t){return t.json()})).then((function(e){e.errors?x(e.errors):(y(e.message),t.push(e.post),a(""),u(""),O(!1))})).catch((function(t){return console.log(t)}))},children:[Object(b.jsx)("h2",{children:t.edit?"Editor":"Create a new post"}),Object(b.jsx)("input",{type:"text",name:"title",placeholder:"Title...",onChange:function(t){a(t.target.value)},value:o}),Object(b.jsx)("textarea",{name:"content",placeholder:"Content...",onChange:function(t){u(t.target.value)},value:j}),Object(b.jsx)("label",{htmlFor:"public",children:"Is this post private?"}),Object(b.jsx)("input",{type:"checkbox",name:"public",value:d,onChange:function(t){O(t.target.checked)}}),Object(b.jsx)("button",{children:"Post"}),Object(b.jsx)("ul",{children:g.map((function(t){return Object(b.jsx)("li",{children:t.msg},T()())}))}),v]})}var w=n(40),E=n.n(w),L=n(39),A=n.n(L),D=n(38),N=n.n(D);function P(t){var e=Object(c.useState)({}),n=Object(i.a)(e,2),o=n[0],a=n[1],r=Object(c.useState)(""),s=Object(i.a)(r,2),j=s[0],u=s[1],l=Object(c.useState)(!1),h=Object(i.a)(l,2),O=h[0],m=h[1],g=Object(c.useState)([]),x=Object(i.a)(g,2),p=x[0],S=x[1],v=Object(c.useState)(!1),y=Object(i.a)(v,2),k=y[0],T=y[1],w=Object(c.useState)(!1),L=Object(i.a)(w,2),D=L[0],P=L[1],_=Object(c.useState)(""),z=Object(i.a)(_,2),J=z[0],U=z[1];function B(){localStorage.removeItem("token"),window.location.href="/author-frontend"}return Object(c.useEffect)((function(){var t=new AbortController,e=t.signal;fetch("/blog/currentuser",{mode:"cors",headers:{Authorization:localStorage.getItem("token")},signal:e}).then((function(t){return t.json()})).then((function(e){a(e),t.abort()})).catch((function(e){u(e),m(!0),t.abort()})),fetch("/blog/posts/private",{mode:"cors",headers:{Authorization:localStorage.getItem("token")}}).then((function(t){return t.json()})).then((function(t){S(t),m(!0)})).catch((function(t){u(t),m(!0)}))}),[]),O?j?Object(b.jsxs)("div",{children:[Object(b.jsx)("h2",{children:"Oops! An error occured!"}),Object(b.jsx)("p",{children:j})]}):Object(b.jsxs)("div",{children:[Object(b.jsxs)("h2",{children:["Welcome ",o.authData.firstname,"!"]}),Object(b.jsxs)("button",{id:"logout",onClick:B,children:[Object(b.jsx)(N.a,{})," Log out"]}),Object(b.jsxs)("button",{id:"deleteaccount",onClick:function(){D&&fetch("/blog/authors/".concat(o.authData._id),{mode:"cors",method:"DELETE",headers:{Authorization:localStorage.getItem("token")}}).then((function(t){return t.json()})).then((function(t){console.log(t),t.error?u(j):t.author?B():U(t.message)})).catch((function(t){u(t),m(!0)})),setTimeout((function(){return P(!1)}),3e3),P(!0)},children:[Object(b.jsx)(f.a,{}),D?"Confirm":"Delete account"]}),Object(b.jsx)("p",{children:J}),Object(b.jsx)("h3",{children:"Currently these are all of your articles:"}),Object(b.jsx)("button",{onClick:function(){T(!k)},name:"new",id:"new",children:k?Object(b.jsx)(A.a,{}):Object(b.jsx)(E.a,{})}),k?Object(b.jsx)(I,{push:function(t){S([].concat(Object(d.a)(p),[t]))}}):"",Object(b.jsx)("ul",{id:"articles",children:p.map((function(t){return Object(b.jsx)(C,{data:t},t._id)}))})]}):Object(b.jsx)("h2",{children:"Loading..."})}function _(t){var e=Object(c.useState)(!1),n=Object(i.a)(e,2),o=n[0],a=n[1],r=Object(c.useState)(""),s=Object(i.a)(r,2),j=s[0],u=s[1],l=t.data;return""===j?Object(b.jsxs)("div",{className:"comment",children:[Object(b.jsx)("h4",{children:l.name}),Object(b.jsx)("p",{children:l.content}),Object(b.jsx)("p",{id:"commenttimestamp",children:O.DateTime.fromISO(l.timestamp).toLocaleString({day:"numeric",month:"long",hour:"numeric",hour12:!1,minute:"numeric"})}),Object(b.jsxs)("div",{className:"commentbuttons",children:[Object(b.jsx)("button",{onClick:function(){a(!o)},children:o?Object(b.jsx)(x.a,{}):Object(b.jsx)(f.a,{})}),o?Object(b.jsx)("button",{onClick:function(){fetch("/blog/posts/".concat(t.articleId,"/comments/").concat(l._id),{mode:"cors",method:"DELETE",headers:{Authorization:localStorage.getItem("token")}}).then((function(t){return t.json()})).then((function(t){t.message&&u(t.message)})).catch((function(t){return console.log(t)}))},children:"Confirm"}):""]})]},l._id):Object(b.jsx)("h4",{children:j})}var z=n(33),J=n.n(z);var U=function(){var t=Object(c.useState)(""),e=Object(i.a)(t,2),n=e[0],o=e[1],a=Object(c.useState)(""),r=Object(i.a)(a,2),s=r[0],u=r[1],l=Object(c.useState)(""),h=Object(i.a)(l,2),d=h[0],m=h[1],f=Object(c.useState)(""),g=Object(i.a)(f,2),x=g[0],p=g[1],S=Object(c.useState)([]),v=Object(i.a)(S,2),y=v[0],C=v[1],k=Object(c.useState)(null),T=Object(i.a)(k,2),w=T[0],E=T[1],L=Object(c.useState)(!1),A=Object(i.a)(L,2),D=A[0],N=A[1],P=Object(c.useState)(!1),z=Object(i.a)(P,2),U=z[0],B=z[1],F=Object(j.g)().id;return Object(c.useEffect)((function(){fetch("/blog/posts/".concat(F),{mode:"cors",method:"GET"}).then((function(t){return t.json()})).then((function(t){var e=t.post;o(e.title),u("".concat(e.author.firstname," ").concat(e.author.lastname)),m(O.DateTime.fromISO(e.timestamp).toLocaleString({day:"numeric",month:"long",hour:"numeric",hour12:!1,minute:"numeric"})),p(e.content),N(!0)})).catch((function(t){E(t),console.log(t),N(!0)})),fetch("/blog/posts/".concat(F,"/comments"),{mode:"cors",method:"GET"}).then((function(t){return t.json()})).then((function(t){t.error||C(t)})).catch((function(t){E(t),console.log(t)}))}),[F]),w?Object(b.jsxs)("div",{id:"error",children:[Object(b.jsx)("h1",{children:"An error occured!"}),Object(b.jsx)("p",{children:"Try reloading the page."})]}):D?U?Object(b.jsx)("div",{id:"container",children:Object(b.jsxs)("div",{id:"content",children:[Object(b.jsxs)("h1",{children:["You're currently editing \"",n,'"']}),Object(b.jsxs)("button",{onClick:function(){return B(!U)},id:"editbutton",children:[Object(b.jsx)(J.a,{})," Cancel edit"]}),Object(b.jsx)(I,{title:n,setEdit:B,setTitle:o,setContent:p,edit:!0,id:F,content:x})]})}):Object(b.jsxs)("div",{id:"container",children:[Object(b.jsxs)("div",{id:"content",children:[Object(b.jsx)("h1",{children:n}),Object(b.jsxs)("button",{onClick:function(){return B(!U)},id:"editbutton",children:[Object(b.jsx)(J.a,{})," Edit"]}),Object(b.jsx)("h2",{children:s}),Object(b.jsxs)("h4",{children:["Posted on ",d]}),Object(b.jsx)("p",{id:"articletext",children:x})]}),Object(b.jsxs)("div",{id:"comments",children:[Object(b.jsx)("h2",{children:"Comments"}),y.length>0?y.map((function(t){return Object(b.jsx)(_,{articleId:F,data:t},t._id)})):"Currently there are no comments"]})]}):Object(b.jsx)("div",{id:"loading",children:Object(b.jsx)("h1",{children:"Loading content..."})})};function B(t){var e=Object(c.useState)(""),n=Object(i.a)(e,2),o=n[0],a=n[1],r=Object(c.useState)(""),s=Object(i.a)(r,2),j=s[0],u=s[1],h=Object(c.useState)(""),d=Object(i.a)(h,2),O=d[0],m=d[1],f=Object(c.useState)([]),g=Object(i.a)(f,2),x=g[0],p=g[1],S=Object(c.useState)(!1),v=Object(i.a)(S,2),y=v[0],C=v[1],k=Object(c.useState)(""),I=Object(i.a)(k,2),w=I[0],E=I[1],L=Object(c.useState)(""),A=Object(i.a)(L,2),D=A[0],N=A[1];return y?w?Object(b.jsxs)("p",{children:["Something went wrong! ",w]}):Object(b.jsx)("p",{children:"Signup complete!"}):Object(b.jsxs)("div",{id:"loginform",children:[Object(b.jsx)("h2",{children:"Let's sign you up!"}),Object(b.jsxs)("form",{onSubmit:function(e){e.preventDefault(),fetch("/blog/authors/",{mode:"cors",method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({firstname:j,lastname:O,username:o,password:D})}).then((function(t){return t.json()})).then((function(e){e.author?e.author&&fetch("/auth/login",{mode:"cors",method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:o,password:D})}).then((function(t){return t.json()})).then((function(e){console.log(e),e.user&&e.user&&(localStorage.setItem("token","Bearer ".concat(e.token)),C(!0),t.signal(!0))})).catch((function(t){return E(t)})):p(e.errors)})).catch((function(t){return E(t)}))},children:[Object(b.jsx)("input",{type:"text",name:"firstname",placeholder:"First name...",value:j,onChange:function(t){u(t.target.value)}}),Object(b.jsx)("input",{type:"text",name:"lastname",placeholder:"Last name...",value:O,onChange:function(t){m(t.target.value)}}),Object(b.jsx)("input",{type:"text",name:"username",placeholder:"Username...",value:o,onChange:function(t){a(t.target.value)}}),Object(b.jsx)("input",{type:"password",name:"password",placeholder:"Password...",value:D,onChange:function(t){N(t.target.value)}}),Object(b.jsx)("div",{id:"loginbuttons",children:Object(b.jsx)("button",{id:"login",children:Object(b.jsx)(l.a,{})})}),Object(b.jsx)("ul",{children:x?x.map((function(t){return Object(b.jsx)("li",{children:t.msg},T.a)})):""}),Object(b.jsxs)("p",{children:["Already have an account? Log in ",Object(b.jsx)("a",{href:"/author-frontend/",children:"here"}),"!"]})]})]})}function F(){var t=Object(c.useState)(!1),e=Object(i.a)(t,2),n=e[0],o=e[1];return Object(b.jsxs)(s.a,{children:[Object(b.jsx)("nav",{children:Object(b.jsx)(s.b,{to:"/author-frontend/dashboard",children:Object(b.jsx)("h1",{className:"pagetitle",children:"Nico's Blog (author)"})})}),Object(b.jsxs)(j.d,{children:[Object(b.jsx)(j.b,{path:"/author-frontend",exact:!0,children:n||localStorage.getItem("token")?Object(b.jsx)(j.a,{to:"/author-frontend/dashboard"}):Object(b.jsx)(h,{signal:o})}),Object(b.jsx)(j.b,{path:"/author-frontend/signup",exact:!0,children:n||localStorage.getItem("token")?Object(b.jsx)(j.a,{to:"/author-frontend/dashboard"}):Object(b.jsx)(B,{signal:o})}),Object(b.jsx)(j.b,{path:"/author-frontend/dashboard",exact:!0,children:n||localStorage.getItem("token")?Object(b.jsx)(P,{}):Object(b.jsx)(h,{signal:o})}),Object(b.jsx)(j.b,{path:"/author-frontend/article/:id",children:n||localStorage.getItem("token")?Object(b.jsx)(U,{}):Object(b.jsx)(h,{signal:o})})]})]})}n(58);r.a.render(Object(b.jsx)(o.a.StrictMode,{children:Object(b.jsx)(F,{})}),document.getElementById("root"))}},[[61,1,2]]]);
//# sourceMappingURL=main.d79a3f69.chunk.js.map