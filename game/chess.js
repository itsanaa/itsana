 pimg=new Array();
 i=new Array (
  "b",
  "bb1","bb2","bb3","bb4","bb5","bb6",
  "bw1","bw2","bw3","bw4","bw5","bw6",
  "l","r",
  "sbb1","sbb2","sbb3","sbb4","sbb5","sbb6",
  "sbw1","sbw2","sbw3","sbw4","sbw5","sbw6",
  "swb1","swb2","swb3","swb4","swb5","swb6",
  "sww1","sww2","sww3","sww4","sww5","sww6",
  "t","u","w",
  "wb1","wb2","wb3","wb4","wb5","wb6",
  "ww1","ww2","ww3","ww4","ww5","ww6"
 );
 for (j=0;j<i.length;++j) {
  pimg[j]=new Image();
  pimg[j].src=""+i[j]+".png";
 }

 N=1;
 K="";
 F=px=py=0;

 function sm(i) {
  if (N>120) return;
  var j="abcdefgh";
  if (N&1) { 
   if (N<19) K+=" ";
   K+=(1+N>>1)+". ";
  }
  else K+="   ";
  if (i.f==3) K+="o-o  ";
  else if(i.f==5) K+="o-o-o";
  else K+=j.charAt(i.x)+(8-i.y)+" "+j.charAt(i.X)+(8-i.Y);
  if (++N&1) K+="\n";
  document.getElementById("m"+Math.floor((N-2)/20)).innerHTML="<pre>"+K+"</pre>";
  if (!((N-1)%20)) K="";
 }

 function un(u,b) {
  for (var i=u.x.length-1;i>=0;--i) Z(b,u.x[i],u.y[i],u.p[i]);
 }

 function au(u,b,x,y) { 
  u.x.push(x); u.y.push(y); u.p.push(b[x+y*8]);
 }

 function st(x) {
  document.getElementById("i").innerHTML=x;
 }
 
 function P(x,y,X,Y,f) {
  this.x=x; this.y=y; this.X=X; this.Y=Y; this.f=f;
 }

 function U() { 
  this.x=[]; this.y=[]; this.p=[];
 }

 function em(b,x,y) {
  return !b[x+y*8];
 }

 function ge(b,x,y) {
  return b[x+y*8]&7;
 }

 function co(b,x,y) {
  return b[x+y*8]&192;
 }

 function sa(b,x,y,c) {
  var i=b[x+y*8]; return i&&(i&c);
 }

 function op(b,x,y,c){
  var i=b[x+y*8]; return i&&!(i&c);
 }

 function mo(b,x,y) {
  var i=b[x+y*8]; return i&&(i&32);
 }
 
 function la(b,x,y){
  var i=b[x+y*8]; return i&&(i&16);
 }

 function ra(x,y) {
  return x>=0&&x<8&&y>=0&&y<8;
 }

 function di(c) {
  return c==64?-1:1;
 }

 function Z(b,x,y,p) {
  b[x+y*8]=p; return b;
 }
 
 function t(b,x,y,i,j,c,l) {
  var X=x; var Y=y;
  while (ra(X+=i,Y+=j)&&em(b,X,Y)) l.push(new P(x,y,X,Y,0));
  if (ra(X,Y)&&op(b,X,Y,c)) l.push (new P(x,y,X,Y,0));
  return l;
 }

 function ro(b,x,y,c,l) {
  t(b,x,y,1,0,c,t(b,x,y,-1,0,c,t(b,x,y,0,1,c,t(b,x,y,0,-1,c,l))));
 }

 function bi(b,x,y,c,l) {
  t(b,x,y,1,1,c,t(b,x,y,-1,-1,c,t(b,x,y,1,-1,c,t(b,x,y,-1,1,c,l))));
 }

 function ki(b,x,y,c,l) {
  for(var i=-1;i<2;++i) 
  for(var j=-1;j<2;++j) {
   var X=x+i; var Y=y+j;
   if ((X||Y)&&ra(X,Y)&&!sa(b,X,Y,c)) l.push (new P(x,y,X,Y,0));
  }
  if (!mo(b,x,y)) if (em(b,5,y)&&em(b,6,y)&&!em(b,7,y)&&!mo(b,7,y)) {
   var u=new U();
   au(u,b,x,y);
   Z(b,x,y,0);
   var i=fi(b,c^192);
   var j=0; var X=-1;
   while (!j&&++X!=i.length) j=i[X].Y==y&&i[X].X==5;
   if(!j)l.push(new P(x,y,6,y,3));
   un(u,b);
  }
  else if(em(b,3,y)&&em(b,2,y)&&em(b,1,y)&&!em(b,0,y)&&!mo(b,0,y)) {
   var u=new U(); au(u,b,x,y); Z(b,x,y,0);
   var i=fi(b,c^192);
   var j=0; var X=-1;
   while (!j&&++X!=i.length) j=i[X].Y==y&&i[X].X==3;
   if (!j) l.push (new P(x,y,2,y,5));
   un(u,b);
  }
 }
 
 function kn(b,x,y,c,l) {
  for (var i=-2;i<3;++i)
  for (var j=-2;j<3;++j)
  if (Math.abs(i)+Math.abs(j)==3) {
   var X=x+i; var Y=y+j;
   if (ra(X,Y)&&!sa(b,X,Y,c)) l.push(new P(x,y,X,Y,0));
  }
 }

 function pa(b,x,y,c,l) {
  var Y=y+di(c); var Z=y+di(c)*2;
  if (!mo(b,x,y)&&em(b,x,Y)&&em(b,x,Z)) l.push(new P(x,y,x,Z,2));
  if (em(b,x,Y)) {
   if (!Y||Y==7) l.push(new P(x,y,x,Y,4));
   else l.push (new P(x,y,x,Y,0));
  }
  for (var i=-1;i<2;i+=2) {
   var X=x+i;if(ra(X,Y)) {
    if(op(b,X,Y,c)) {
     if (!Y||Y==7) l.push (new P(x,y,X,Y,4));
     else l.push (new P(x,y,X,Y,0));
    }
    else if (em(b,X,Y)&&la(b,X,Y-di(c))) l.push(new P(x,y,X,Y,1));
   }
  }
 }

 function d(b) {
  for (var y=0;y<8;++y)
  for(var x=0;x<8;++x) {
   var i="<img src=\"";
   if (F==1&&x==px&&y==py) i+="s"; i+=(x+y&1)?"b":"w";
   if (!em(b,x,y)) i+=(sa(b,x,y,64)?"w":"b")+(ge(b,x,y)&7);
   document.getElementById(""+x+y).innerHTML=i+".png\">";
  }
 }

 function ma(b,m) {
  u=new U();
  for (var x=0;x<8;++x)
  for (var y=0;y<8;++y)
  if (la(b,x,y)) {
   au(u,b,x,y); Z(b,x,y,ge(b,x,y)|co(b,x,y)|mo(b,x,y));
  }
  au(u,b,m.X,m.Y);
  if (m.f==4) Z(b,m.X,m.Y,37|co(b,m.x,m.y));
  else Z(b,m.X,m.Y,ge(b,m.x,m.y)|co(b,m.x,m.y)|32|(m.f==2?16:0));
  au(u,b,m.x,m.y);
  Z(b,m.x,m.y,0);
  if (m.f==1) { 
   au (u,b,m.X,m.Y-di(c));
   Z (b,m.X,m.Y-di(c),0);
  }
  else if(m.f==3) {
   au(u,b,5,m.y); au(u,b,7,m.y); Z(Z(b,5,m.y,ge(b,7,m.y)|co(b,7,m.y)|32),7,m.y,0);
  }
  else if(m.f==5) {
   au(u,b,3,m.y);au(u,b,0,m.y);Z(Z(b,3,m.y,ge(b,0,m.y)|co(b,0,m.y)|32),0,m.y,0);
  }
  return u;
 }

 function fi(b,c) { 
  var l=[];
  for (var x=0;x<8;++x)
  for (var y=0;y<8;++y)
  if (sa(b,x,y,c)) {
   var i=ge(b,x,y);
   if (i==1) pa(b,x,y,c,l);
   else if(i==2) kn(b,x,y,c,l);
   else if(i==3) bi(b,x,y,c,l);
   else if(i==4) ro(b,x,y,c,l);
   else if(i==5) {
    bi(b,x,y,c,l); ro(b,x,y,c,l)
   }
   else if(i==6) ki(b,x,y,c,l);
  }
  for (var i=0;i<l.length/3;++i) {
   var j=Math.floor(Math.random()*l.length);
   var k=Math.floor(Math.random()*l.length);
   var x=l[j];l[j]=l[k];l[k]=x;
  }
  return l;
 }

 var Sp=[0,60,370,370,450,1000,5000];
 var Sb=[
  [0,0,0,0,0,0,0,0,2,3,4,0,0,4,3,2,4,6,12,12,12,4,6,4,4,7,18,25,25,16,7,4,6,11,
  18,27,27,16,11,6,10,15,24,32,32,24,15,10,10,15,24,32,32,24,15,10,0,0,0,0,0,0,0,0],
  [-7,-3,1,3,3,1,-3,-7,2,6,14,20,20,14,6,2,6,14,22,26,26,22,14,6,8,18,26,30,30,26,18,
  8,8,18,30,32,32,30,18,8,6,14,28,32,32,28,14,6,2,6,14,20,20,14,6,2,-7,-3,1,3,3,1,-3,-7],
  [16,16,16,16,16,16,16,16,26,29,31,31,31,31,29,26,26,28,32,32,32,32,28,26,16,26,32,32,32,
  32,26,16,16,26,32,32,32,32,26,16,16,28,32,32,32,32,28,16,16,29,31,31,31,31,29,16,16,16,16,16,16,16,16,16],
  [0,0,0,3,3,0,0,0,-2,0,0,0,0,0,0,-2,-2,0,0,0,0,0,0,-2,-2,0,0,0,0,0,0,-2,-2,0,0,0,0,0,0,-2,
  -2,0,0,0,0,0,0,-2,10,10,10,10,10,10,10,10,0,0,0,0,0,0,0,0],
  [-2,-2,-2,0,0,-2,-2,-2,0,0,1,1,1,0,0,0,0,1,1,1,1,0,0,0,0,0,0,
  2,2,0,0,0,0,0,0,2,2,0,0,0,-2,-2,0,0,0,0,0,0,-2,-2,0,0,0,0,0,0,-2,-2,0,0,0,0,0,0],
  [3,3,8,-12,-8,-12,10,5,0,0,-5,-5,-12,-12,-12,-12,-5,-5,-7,-15,-15,-15,-15,-15,-15,
  -7,-20,-20,-20,-20,-20,-20,-20,-20,-20,-20,-20,-20,-20,-20,-20,-20,-20,-20,-20,-20,
  -20,-20,-20,-20,-20,-20,-20,-20,-20,-20,-20,-20,-20,-20,-20,-20,-20,-20,-20,-20],[]];
 for (var x=0;x<8;++x)
 for(var y=0;y<8;++y) Sb[6][x+y*8]=Sb[5][(7-x)+y*8];

 function sc(b,c) {
  var s=0;
  for (var x=0;x<8;++x)
  for(var y=0;y<8;++y) {
   var i=ge(b,x,y);
   if (i) if (sa(b,x,y,128)) s+=Sb[i==6?6:i-1][(7-x)+y*8]+Sp[i];
   else s-=Sb[i-1][x+(7-y)*8]+Sp[i];
  }
  return c==128?s:-s;
 }

 function cpu() {
  if(F!=2) return;
  var now = new Date();
  var m=fi(b,c); var bs=-99999; var ws=bs; var bm=0; var C=c^192; var kx=0; var ky=0;
  for (var i=0;i<m.length;++i) {
   var u=ma(b,m[i]);
   if (ge(b,kx,ky)!=6||sa(b,kx,ky,C)) {
    kx=ky=0;
    while (ge(b,kx,ky)!=6||sa(b,kx,ky,C)) if (++kx==8) { kx=0; ++ky; }
   }
   var om=fi(b,C); var obs=-99999; var ows=99999;
   for (var j=0;j<om.length;++j) {
    if (kx==om[j].X&&ky==om[j].Y) {
     obs=-99999; break;
    }
    var U=ma(b,om[j]); var r=sc(b,c);
    un(U,b); obs=Math.max(obs,r); ows=Math.min(ows,r);
    if (r<ws) break;
   }
   un(u,b);
   if (obs>bs&&ows>ws) {
    bs=obs; ws=ows; bm=m[i];
   }
  }
  ma(b,bm); sm(bm); nx(); st("����� �� ��� "+(new Date()-now)/1000+" ���.");
 }

 cpw=0; cpb=1;

 function pw(e) {
  cpw=e.checked;
  if (F<2&&cpw&&c==64) {
   F=2; setTimeout("cpu()",100);
  }
 }

 function pb(e) {
  cpb=e.checked;
  if (F<2&&cpb&&c==128) {
   F=2; setTimeout("cpu()",100);
  }
 }

 function l() { 
  b=[];
  for (i=0;i<8;++i) Z(Z(b,i,6,65),i,1,129);
  d(Z(Z(Z(Z(Z(Z(Z(Z(Z(Z(Z(Z(Z(Z(Z(Z(b,0,0,132),1,0,130),2,0,131),3,0,133),4,0,134),
   5,0,131),6,0,130),7,0,132),0,7,68),1,7,66),2,7,67),3,7,69),4,7,70),5,7,67),6,7,66),7,7,68));
  c=64;
 }

 function hu(x,y) { 
  if (F==0) {
   if (sa(b,x,y,c)) {
    px=x; py=y; F=1; d(b);
   }
  }
  else if(F==1) {
   if (x==px&&y==py) {
    F=0; d(b); return;
   }
   var m=fi(b,c);
   for (var i=0;i<m.length;++i) { 
    if (m[i].x==px&&m[i].y==py&&m[i].X==x&&m[i].Y==y&&ge(b,x,y)!=6) {
     var u=ma(b,m[i]); var o=fi(b,c^192);
     for (var j=0;j<o.length;++j) if (ge(b,o[j].X,o[j].Y)==6&&sa(b,o[j].X,o[j].Y,c)) {
      un(u,b); st("�������� ���!"); return;
     }
     sm(m[i]); nx(); return;
    }
   }
   st("�������� ���!");
  }
 }

 function nx() {
  c^=192; F=0; d(b);
  for (var x=0;x<8;++x)
  for (var y=0;y<8;++y)
  if (ge(b,x,y)==6 && sa(b,x,y,c)) {
   var kx=x; var ky=y;
  }
  var m=fi(b,c^192); var ic=0;
  for (var i=0;i<m.length;++i) if(m[i].X==kx&&m[i].Y==ky) ic=1;
  var m=fi(b,c); var cm=1;
  for (var i=0;i<m.length;++i) {
   var u=ma(b,m[i]);
   for (var x=0;x<8;++x) 
   for(var y=0;y<8;++y) 
   if (ge(b,x,y)==6&&sa(b,x,y,c)) {
    var kx=x; var ky=y;
   }
   var om=fi(b,c^192); un(u,b); var hm=0;
   for (var j=0;j<om.length;++j) if (om[j].X==kx&&om[j].Y==ky) hm=1; cm&=hm;
  }
  if (cm) {
   alert(ic?"���!":"���!"); F=3; return;
  }
  if ((cpw&&c==64)||(cpb&&c==128)) {
   F=2; setTimeout("cpu()",500);
  }
 }
